import { buildDocument } from './document.ts';
import { CONVERTER } from './version.ts';
import type { HouDocument, Kind } from './types.ts';

export interface TextInput {
  title: string;
  text: string;
  kind?: Kind;
  importedAt?: string;
}

/** 粘贴正文：按换行分段，整篇作为一个章节 */
export function textToDocument(input: TextInput): HouDocument {
  const title = input.title.trim();
  if (!title) throw new Error('缺少标题');
  const paragraphs = input.text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (!paragraphs.length) throw new Error('正文为空');
  return buildDocument(
    { title, kind: input.kind ?? 'article', source: { type: 'text' }, importedAt: input.importedAt ?? new Date().toISOString(), converter: CONVERTER },
    [{ title: '全文', blocks: paragraphs.map(text => ({ type: 'paragraph', content: [{ type: 'text', text }] })) }],
  );
}
