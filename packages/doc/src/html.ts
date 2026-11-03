import type { DraftBlock, DraftChapter, Inline, Mark } from './types.ts';

// 把已经提取好的正文 HTML（defuddle、Readability、EPUB 章节、公众号正文区域等）转换为内容块。
// 只依赖标准 DOM 接口：浏览器、linkedom、jsdom 都可以传入。

export interface HtmlOptions {
  /** 图片地址 → 资源编号。返回 undefined 时丢弃这张图片。图片需要调用方先下载到本地并登记为资源 */
  resolveImage?: (src: string, alt: string) => string | undefined;
}

const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'BUTTON', 'NAV', 'FORM', 'INPUT', 'SELECT', 'TEXTAREA', 'IFRAME', 'HEAD']);
const BLOCK = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'UL', 'OL', 'PRE', 'TABLE', 'HR', 'FIGURE', 'IMG', 'DIV', 'SECTION', 'ARTICLE', 'MAIN', 'HEADER', 'FOOTER', 'ASIDE', 'DL', 'DT', 'DD', 'LI', 'BODY', 'HTML']);
const MARK_TAGS: Record<string, Mark> = { STRONG: 'bold', B: 'bold', EM: 'italic', I: 'italic', CODE: 'code', KBD: 'code', SAMP: 'code' };
const CJK = '[\\u2e80-\\u9fff\\u3000-\\u303f\\uff00-\\uffef]';
const CJK_GAP = new RegExp(`(${CJK})\\s+(?=${CJK})`, 'g');

/** 图片地址：公众号等延迟加载的页面把真实地址放在 data-src */
export function imageSource(img: Element): string {
  return img.getAttribute('data-src') || img.getAttribute('data-original') || img.getAttribute('src') || '';
}

/** 列出正文中所有需要下载的图片地址，供调用方在转换前下载并登记资源 */
export function collectImages(root: Element): string[] {
  return [...new Set([...root.querySelectorAll('img')].map(imageSource).filter(Boolean))];
}

const tag = (node: Node) => (node as Element).tagName?.toUpperCase() ?? '';
const isElement = (node: Node): node is Element => node.nodeType === 1;
const isBlock = (el: Element) => BLOCK.has(tag(el)) || tag(el) === 'MATH' && el.getAttribute('display') === 'block';
const hasBlockInside = (el: Element) => [...el.querySelectorAll('*')].some(child => isBlock(child) && !SKIP.has(tag(child)));

function mathTex(el: Element): string {
  const annotation = [...el.querySelectorAll('annotation')].find(a => /tex/i.test(a.getAttribute('encoding') ?? ''));
  return (annotation?.textContent ?? el.getAttribute('alttext') ?? el.textContent ?? '').trim();
}

/** 合并相邻同样式的文字，去掉中文之间因 HTML 换行产生的空格，去掉首尾空白 */
function tidy(parts: Inline[]): Inline[] {
  const merged: Inline[] = [];
  for (const part of parts) {
    const last = merged.at(-1);
    if (part.type === 'text' && last?.type === 'text' && last.href === part.href && (last.marks ?? []).join() === (part.marks ?? []).join()) last.text += part.text;
    else merged.push({ ...part });
  }
  for (const part of merged) if (part.type === 'text' && !part.marks?.includes('code')) part.text = part.text.replace(CJK_GAP, '$1').replace(/ *\n */g, '\n');
  const first = merged[0], last = merged.at(-1);
  if (first?.type === 'text') first.text = first.text.trimStart();
  if (last?.type === 'text') last.text = last.text.trimEnd();
  return merged.filter(part => part.type !== 'text' || part.text !== '');
}

const hasText = (parts: Inline[]) => parts.some(p => (p.type === 'text' ? p.text.trim() : p.tex));

function cells(row: Element, options: HtmlOptions): Inline[][] {
  return [...row.children].filter(c => ['TD', 'TH'].includes(tag(c))).map(c => tidy(inlineOf(c, [], undefined, options)));
}

/** 只取行内内容（用于列表项、表格单元格、图片说明），遇到图片等块级内容时忽略 */
function inlineOf(node: Node, marks: Mark[], href: string | undefined, options: HtmlOptions): Inline[] {
  const out: Inline[] = [];
  for (const child of node.childNodes) {
    if (child.nodeType === 3) out.push({ type: 'text', text: (child.textContent ?? '').replace(/\s+/g, ' '), ...(marks.length ? { marks } : {}), ...(href ? { href } : {}) });
    else if (isElement(child) && !SKIP.has(tag(child))) {
      const t = tag(child);
      if (t === 'BR') out.push({ type: 'text', text: '\n' });
      else if (t === 'MATH') out.push({ type: 'math', tex: mathTex(child) });
      else if (t === 'IMG' || t === 'UL' || t === 'OL') continue;
      else {
        const mark = MARK_TAGS[t];
        const nextMarks = mark && !marks.includes(mark) ? [...marks, mark] : marks;
        out.push(...inlineOf(child, nextMarks, t === 'A' ? child.getAttribute('href') || href : href, options));
      }
    }
  }
  return out;
}

class Flow {
  blocks: DraftBlock[] = [];
  private buffer: Inline[] = [];
  private options: HtmlOptions;
  private quote: boolean;
  constructor(options: HtmlOptions, quote = false) {
    this.options = options;
    this.quote = quote;
  }

  flush() {
    const content = tidy(this.buffer);
    this.buffer = [];
    if (hasText(content)) this.blocks.push({ type: this.quote ? 'quote' : 'paragraph', content });
  }

  push(block: DraftBlock) {
    this.flush();
    this.blocks.push(block);
  }

  image(img: Element, caption?: Inline[]) {
    const alt = (img.getAttribute('alt') ?? '').trim();
    const asset = this.options.resolveImage?.(imageSource(img), alt);
    if (asset) this.push({ type: 'image', asset, alt, ...(caption && hasText(caption) ? { caption } : {}) });
  }

  /** 处理一个节点的所有子节点：行内内容先积累，遇到块级元素时结成段落 */
  children(node: Node, marks: Mark[] = [], href?: string) {
    for (const child of node.childNodes) this.node(child, marks, href);
  }

  node(node: Node, marks: Mark[], href: string | undefined) {
    if (node.nodeType === 3) {
      this.buffer.push({ type: 'text', text: (node.textContent ?? '').replace(/\s+/g, ' '), ...(marks.length ? { marks } : {}), ...(href ? { href } : {}) });
      return;
    }
    if (!isElement(node) || SKIP.has(tag(node))) return;
    const el = node, t = tag(el);
    if (/^H[1-6]$/.test(t)) {
      const content = tidy(inlineOf(el, [], undefined, this.options));
      if (!hasText(content)) return;
      if (this.quote) this.push({ type: 'quote', content });
      else this.push({ type: 'heading', level: Number(t[1]) as 1 | 2 | 3 | 4 | 5 | 6, content });
      for (const img of el.querySelectorAll('img')) this.image(img);
      return;
    }
    switch (t) {
      case 'BR':
        this.buffer.push({ type: 'text', text: '\n' });
        return;
      case 'HR':
        this.push({ type: 'divider' });
        return;
      case 'IMG':
        this.image(el);
        return;
      case 'MATH':
        if (el.getAttribute('display') === 'block') this.push({ type: 'math', tex: mathTex(el) });
        else this.buffer.push({ type: 'math', tex: mathTex(el) });
        return;
      case 'PRE': {
        const code = el.querySelector('code');
        const cls = `${el.getAttribute('class') ?? ''} ${code?.getAttribute('class') ?? ''}`;
        const language = /(?:language|lang)-([\w+#-]+)/.exec(cls)?.[1];
        this.push({ type: 'code', text: (el.textContent ?? '').replace(/\n$/, ''), ...(language ? { language } : {}) });
        return;
      }
      case 'UL':
      case 'OL': {
        const items = [...el.querySelectorAll('li')].map(li => tidy(inlineOf(li, [], undefined, this.options))).filter(hasText);
        if (items.length) this.push({ type: 'list', ordered: t === 'OL', items });
        for (const img of el.querySelectorAll('img')) this.image(img);
        return;
      }
      case 'TABLE': {
        const rows = [...el.querySelectorAll('tr')].map(row => cells(row, this.options)).filter(row => row.length);
        if (rows.length) this.push({ type: 'table', header: !!el.querySelector('tr')?.querySelector('th'), rows });
        return;
      }
      case 'FIGURE': {
        const caption = el.querySelector('figcaption');
        const captionContent = caption ? tidy(inlineOf(caption, [], undefined, this.options)) : undefined;
        const imgs = [...el.querySelectorAll('img')];
        if (!imgs.length) { this.flush(); this.children(el); this.flush(); return; }
        imgs.forEach((img, i) => this.image(img, i === imgs.length - 1 ? captionContent : undefined));
        return;
      }
      case 'BLOCKQUOTE': {
        this.flush();
        const inner = new Flow(this.options, true);
        inner.children(el);
        inner.flush();
        this.blocks.push(...inner.blocks);
        return;
      }
      case 'P':
        this.flush();
        this.children(el);
        this.flush();
        return;
    }
    const mark = MARK_TAGS[t];
    // 行内元素里如果包着段落等块级内容（公众号常见），按容器处理
    if (!isBlock(el) && !hasBlockInside(el)) {
      this.children(el, mark && !marks.includes(mark) ? [...marks, mark] : marks, t === 'A' ? el.getAttribute('href') || href : href);
      return;
    }
    this.flush();
    this.children(el);
    this.flush();
  }
}

export function htmlToBlocks(root: Element, options: HtmlOptions = {}): DraftBlock[] {
  const flow = new Flow(options);
  flow.children(root);
  flow.flush();
  return flow.blocks;
}

/**
 * 按标题切分章节：级别不高于 level 的标题开始新章节，标题本身成为章节名。
 * 第一个标题之前的内容归入以 fallbackTitle 命名的章节。没有标题时整篇为一章。
 */
export function splitChapters(blocks: DraftBlock[], fallbackTitle: string, level = 1): DraftChapter[] {
  const chapters: DraftChapter[] = [];
  let current: DraftChapter = { title: fallbackTitle, blocks: [] };
  for (const block of blocks) {
    if (block.type === 'heading' && block.level <= level) {
      if (current.blocks.length || chapters.length) chapters.push(current);
      current = { title: block.content.map(p => (p.type === 'text' ? p.text : p.tex)).join(''), blocks: [] };
    } else current.blocks.push(block);
  }
  chapters.push(current);
  return chapters.filter((chapter, i) => chapter.blocks.length || i === chapters.length - 1);
}
