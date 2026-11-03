import type { Block, HouDocument, Inline } from './types.ts';

export interface MarkdownOptions {
  /** 在每个块前写入 <!-- b12 --> 形式的编号，交给模型提取知识点时用于回指原文 */
  ids?: boolean;
}

const escape = (text: string) => text.replace(/([\\`*_[\]])/g, '\\$1');

function inline(content: Inline[]): string {
  return content
    .map(part => {
      if (part.type === 'math') return `$${part.tex}$`;
      const marks = part.marks ?? [];
      let text = marks.includes('code') ? `\`${part.text}\`` : escape(part.text);
      if (marks.includes('italic')) text = `*${text}*`;
      if (marks.includes('bold')) text = `**${text}**`;
      return part.href ? `[${text}](${part.href})` : text;
    })
    .join('')
    .replace(/\n/g, '  \n');
}

function block(b: Block, assets: Map<string, string>): string {
  switch (b.type) {
    case 'heading':
      return `${'#'.repeat(Math.min(b.level + 1, 6))} ${inline(b.content)}`;
    case 'paragraph':
      return inline(b.content);
    case 'quote':
      return inline(b.content).split('\n').map(line => `> ${line}`).join('\n');
    case 'list':
      return b.items.map((item, i) => `${b.ordered ? `${i + 1}.` : '-'} ${inline(item)}`).join('\n');
    case 'code': {
      const fence = b.text.includes('```') ? '````' : '```';
      return `${fence}${b.language ?? ''}\n${b.text}\n${fence}`;
    }
    case 'image':
      return `![${escape(b.alt)}](${assets.get(b.asset) ?? b.asset})${b.caption ? `\n*${inline(b.caption)}*` : ''}`;
    case 'table': {
      const rows = b.rows.map(row => `| ${row.map(cell => inline(cell).replace(/\|/g, '\\|').replace(/ {2}\n/g, ' ')).join(' | ')} |`);
      const width = Math.max(...b.rows.map(row => row.length));
      const rule = `| ${Array(width).fill('---').join(' | ')} |`;
      return b.header ? [rows[0], rule, ...rows.slice(1)].join('\n') : [`| ${Array(width).fill(' ').join(' | ')} |`, rule, ...rows].join('\n');
    }
    case 'math':
      return `$$\n${b.tex}\n$$`;
    case 'divider':
      return '---';
  }
}

/** 导出为 Markdown：用于导出、交给模型处理，以及人工检查转换结果 */
export function toMarkdown(doc: HouDocument, options: MarkdownOptions = {}): string {
  const assets = new Map(doc.assets.map(a => [a.id, a.path]));
  const parts = [`# ${doc.meta.title}`];
  for (const chapter of doc.chapters) {
    parts.push(`${options.ids ? `<!-- ${chapter.id} -->\n` : ''}## ${chapter.title}`);
    for (const b of chapter.blocks) parts.push(`${options.ids ? `<!-- ${b.id} -->\n` : ''}${block(b, assets)}`);
  }
  return parts.join('\n\n') + '\n';
}
