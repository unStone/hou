import { FORMAT, FORMAT_VERSION } from './types.ts';
import type { Asset, Block, DocumentMeta, DraftChapter, HouDocument, Inline } from './types.ts';

/** 把转换器产出的草稿组装成文档，并按出现顺序分配章节编号 c1… 与块编号 b1…（全文唯一） */
export function buildDocument(meta: DocumentMeta, chapters: DraftChapter[], assets: Asset[] = []): HouDocument {
  let n = 0;
  return {
    format: FORMAT,
    version: FORMAT_VERSION,
    meta,
    chapters: chapters.map((chapter, i) => ({
      id: `c${i + 1}`,
      title: chapter.title,
      blocks: chapter.blocks.map(block => ({ ...block, id: `b${++n}` }) as Block),
    })),
    assets,
  };
}

export function inlineText(content: Inline[]): string {
  return content.map(part => (part.type === 'text' ? part.text : part.tex)).join('');
}

/**
 * 块的纯文本，原文定位的字符位置以它为准。
 * 列表项之间、表格行之间用换行分隔，表格单元格之间用制表符分隔。
 */
export function blockText(block: Block): string {
  switch (block.type) {
    case 'heading':
    case 'paragraph':
    case 'quote':
      return inlineText(block.content);
    case 'list':
      return block.items.map(inlineText).join('\n');
    case 'code':
      return block.text;
    case 'image':
      return block.caption ? inlineText(block.caption) : block.alt;
    case 'table':
      return block.rows.map(row => row.map(inlineText).join('\t')).join('\n');
    case 'math':
      return block.tex;
    case 'divider':
      return '';
  }
}

export function findBlock(doc: HouDocument, blockId: string): { chapter: HouDocument['chapters'][number]; block: Block } | undefined {
  for (const chapter of doc.chapters) {
    const block = chapter.blocks.find(b => b.id === blockId);
    if (block) return { chapter, block };
  }
  return undefined;
}
