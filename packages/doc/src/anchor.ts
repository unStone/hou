import { blockText, findBlock } from './document.ts';
import type { Anchor, HouDocument } from './types.ts';

/** 在块文本的 [start, end) 范围上建立原文位置，同时保存原文片段 */
export function createAnchor(doc: HouDocument, blockId: string, start: number, end: number): Anchor {
  const found = findBlock(doc, blockId);
  if (!found) throw new Error(`找不到块：${blockId}`);
  const text = blockText(found.block);
  if (!(Number.isInteger(start) && Number.isInteger(end) && start >= 0 && start < end && end <= text.length)) {
    throw new Error(`原文范围无效：${blockId} [${start}, ${end})，块文本长度 ${text.length}`);
  }
  return { blockId, start, end, quote: text.slice(start, end) };
}

/**
 * 在文档中找回原文位置。
 * 先按块编号和范围核对原文；对不上时（例如重新转换后的新版本），按原文片段在全文中查找第一处完全一致的位置。
 * 找不到时返回 undefined，由调用方提示用户原文已变化。
 */
export function resolveAnchor(doc: HouDocument, anchor: Anchor): Anchor | undefined {
  const found = findBlock(doc, anchor.blockId);
  if (found && blockText(found.block).slice(anchor.start, anchor.end) === anchor.quote) return anchor;
  for (const chapter of doc.chapters) {
    for (const block of chapter.blocks) {
      const start = blockText(block).indexOf(anchor.quote);
      if (start >= 0) return { blockId: block.id, start, end: start + anchor.quote.length, quote: anchor.quote };
    }
  }
  return undefined;
}
