import { Lexer } from 'marked';
import type { Token, Tokens } from 'marked';
import { buildDocument } from './document.ts';
import { splitChapters } from './html.ts';
import { CONVERTER } from './version.ts';
import type { DocumentMeta, DraftBlock, HouDocument, Inline, Mark } from './types.ts';

// Markdown 转内容块。首次使用引导、OCR 模型输出的 PDF 页面都走这里。

export interface MarkdownOptions {
  /** 图片地址 → 资源编号；返回 undefined 时丢弃。与 htmlToBlocks 相同 */
  resolveImage?: (src: string, alt: string) => string | undefined;
  /** Markdown 中夹带的 HTML 块（OCR 模型常用 HTML 写表格）。不提供时去掉标签按段落处理 */
  html?: (html: string) => DraftBlock[];
}

const CJK_GAP = /([⺀-鿿＀-￯])\s*\n\s*(?=[⺀-鿿＀-￯])/g;
// 行内公式 $x^2$：两侧不能紧挨空格，避免把 "$5 和 $10" 当成公式
const INLINE_MATH = /\$(?!\s)([^$\n]+?)(?<!\s)\$/g;
const stripTags = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function text(value: string, marks: Mark[], href: string | undefined): Inline[] {
  const out: Inline[] = [];
  const push = (t: string) => { if (t) out.push({ type: 'text', text: t, ...(marks.length ? { marks } : {}), ...(href ? { href } : {}) }); };
  let at = 0;
  if (!marks.includes('code')) {
    for (const m of value.matchAll(INLINE_MATH)) {
      push(value.slice(at, m.index));
      out.push({ type: 'math', tex: m[1] });
      at = m.index! + m[0].length;
    }
  }
  push(value.slice(at));
  return out;
}

function inline(tokens: Token[] | undefined, marks: Mark[] = [], href?: string): Inline[] {
  const out: Inline[] = [];
  for (const token of tokens ?? []) {
    const add = (mark: Mark) => out.push(...inline((token as Tokens.Strong).tokens, marks.includes(mark) ? marks : [...marks, mark], href));
    switch (token.type) {
      case 'strong': add('bold'); break;
      case 'em': add('italic'); break;
      case 'codespan': out.push(...text((token as Tokens.Codespan).text, [...marks, 'code'], href)); break;
      case 'link': out.push(...inline((token as Tokens.Link).tokens, marks, (token as Tokens.Link).href)); break;
      case 'br': out.push({ type: 'text', text: '\n' }); break;
      case 'image': break; // 图片在块级处理
      case 'html': out.push(...text(stripTags((token as Tokens.HTML).text), marks, href)); break;
      case 'text':
      case 'escape':
      case 'del':
        if ('tokens' in token && token.tokens?.length && token.type !== 'escape') out.push(...inline(token.tokens, marks, href));
        else out.push(...text(decode((token as Tokens.Text).text), marks, href));
        break;
      default:
        if ('text' in token) out.push(...text(String(token.text), marks, href));
    }
  }
  return out;
}

const decode = (s: string) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** 合并相邻同样式文字，软换行在中文之间去掉、其余变空格，去掉首尾空白 */
function tidy(parts: Inline[]): Inline[] {
  const merged: Inline[] = [];
  for (const part of parts) {
    const last = merged.at(-1);
    if (part.type === 'text' && last?.type === 'text' && last.href === part.href && (last.marks ?? []).join() === (part.marks ?? []).join()) last.text += part.text;
    else merged.push({ ...part });
  }
  for (const part of merged) if (part.type === 'text' && !part.marks?.includes('code')) part.text = part.text.replace(CJK_GAP, '$1');
  const first = merged[0], last = merged.at(-1);
  if (first?.type === 'text') first.text = first.text.trimStart();
  if (last?.type === 'text') last.text = last.text.trimEnd();
  return merged.filter(p => p.type !== 'text' || p.text !== '');
}
const hasText = (parts: Inline[]) => parts.some(p => (p.type === 'text' ? p.text.trim() : p.tex));

function blocks(tokens: Token[], options: MarkdownOptions, quote = false): DraftBlock[] {
  const out: DraftBlock[] = [];
  const para = (content: Inline[]) => { const c = tidy(content); if (hasText(c)) out.push({ type: quote ? 'quote' : 'paragraph', content: c }); };
  for (const token of tokens) {
    switch (token.type) {
      case 'space':
        break;
      case 'heading': {
        const content = tidy(inline((token as Tokens.Heading).tokens));
        if (!hasText(content)) break;
        out.push(quote ? { type: 'quote', content } : { type: 'heading', level: (token as Tokens.Heading).depth as 1 | 2 | 3 | 4 | 5 | 6, content });
        break;
      }
      case 'paragraph': {
        const t = token as Tokens.Paragraph;
        const display = /^\$\$([\s\S]+)\$\$$/.exec(t.text.trim());
        if (display) { out.push({ type: 'math', tex: display[1].trim() }); break; }
        // 段落中夹着图片时，在图片处断开
        let buffer: Token[] = [];
        for (const child of t.tokens) {
          if (child.type === 'image') {
            para(inline(buffer));
            buffer = [];
            const img = child as Tokens.Image;
            const asset = options.resolveImage?.(img.href, img.text);
            if (asset) out.push({ type: 'image', asset, alt: img.text, ...(img.title ? { caption: [{ type: 'text', text: img.title }] } : {}) });
          } else buffer.push(child);
        }
        para(inline(buffer));
        break;
      }
      case 'blockquote':
        out.push(...blocks((token as Tokens.Blockquote).tokens, options, true));
        break;
      case 'list': {
        const items: Inline[][] = [];
        const walk = (list: Tokens.List) => {
          for (const item of list.items) {
            const own = item.tokens.filter(t => t.type !== 'list');
            const content = tidy(own.flatMap(t => ('tokens' in t && t.tokens ? inline(t.tokens) : 'text' in t ? text(String(t.text), [], undefined) : [])));
            if (hasText(content)) items.push(content);
            for (const nested of item.tokens) if (nested.type === 'list') walk(nested as Tokens.List);
          }
        };
        walk(token as Tokens.List);
        if (items.length) out.push({ type: 'list', ordered: (token as Tokens.List).ordered, items });
        break;
      }
      case 'code': {
        const c = token as Tokens.Code;
        if (c.lang === 'math' || c.lang === 'latex') out.push({ type: 'math', tex: c.text });
        else out.push({ type: 'code', text: c.text, ...(c.lang ? { language: c.lang } : {}) });
        break;
      }
      case 'table': {
        const t = token as Tokens.Table;
        out.push({ type: 'table', header: true, rows: [t.header.map(cell => tidy(inline(cell.tokens))), ...t.rows.map(row => row.map(cell => tidy(inline(cell.tokens))))] });
        break;
      }
      case 'hr':
        out.push({ type: 'divider' });
        break;
      case 'html':
        if (options.html) out.push(...options.html((token as Tokens.HTML).text));
        else para(text(stripTags((token as Tokens.HTML).text), [], undefined));
        break;
      default:
        if ('text' in token) para(text(String(token.text), [], undefined));
    }
  }
  return out;
}

export function markdownToBlocks(markdown: string, options: MarkdownOptions = {}): DraftBlock[] {
  return blocks(new Lexer({ gfm: true }).lex(markdown), options);
}

export interface MarkdownInput extends MarkdownOptions {
  markdown: string;
  meta: Omit<DocumentMeta, 'title' | 'converter'> & { title?: string };
  assets?: HouDocument['assets'];
}

/**
 * Markdown 转为文档。标题与章节的约定：
 * 文档以唯一一个最高级标题开头时，它作为文档标题，下一级标题切分章节；否则按最高级标题切分章节。
 */
export function markdownToDocument(input: MarkdownInput): HouDocument {
  let list = markdownToBlocks(input.markdown, input);
  const levels = list.flatMap(b => (b.type === 'heading' ? [b.level] : []));
  const top = levels.length ? Math.min(...levels) : 1;
  let title = input.meta.title;
  let chapterLevel = top;
  const first = list[0];
  if (first?.type === 'heading' && first.level === top && levels.filter(l => l === top).length === 1) {
    title ??= first.content.map(p => (p.type === 'text' ? p.text : p.tex)).join('');
    list = list.slice(1);
    chapterLevel = top + 1;
  }
  if (!title?.trim()) throw new Error('缺少标题：请在 meta.title 中提供，或以一个一级标题开头');
  const chapters = splitChapters(list, '正文', chapterLevel);
  return buildDocument({ ...input.meta, title, converter: CONVERTER }, chapters, input.assets ?? []);
}
