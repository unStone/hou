// 《厚》统一阅读格式。规范说明见 ../SPEC.md

export const FORMAT = 'hou-doc';
export const FORMAT_VERSION = 1;

export type Kind = 'book' | 'article';
export type SourceType = 'epub' | 'pdf' | 'web' | 'wechat' | 'x' | 'text' | 'markdown' | 'builtin';

export interface HouDocument {
  format: typeof FORMAT;
  version: typeof FORMAT_VERSION;
  meta: DocumentMeta;
  chapters: Chapter[];
  assets: Asset[];
}

export interface DocumentMeta {
  title: string;
  author?: string;
  kind: Kind;
  language?: string;
  source: { type: SourceType; url?: string; file?: string };
  /** ISO 8601 */
  importedAt: string;
  /** 产出这份文档的转换器，用于排查转换问题 */
  converter: { name: string; version: string };
}

export interface Chapter {
  id: string;
  title: string;
  blocks: Block[];
}

/** 本地资源，目前只有图片。path 相对于文档所在目录 */
export interface Asset {
  id: string;
  path: string;
  mediaType: string;
  sourceUrl?: string;
}

export type Mark = 'bold' | 'italic' | 'code';

export type Inline =
  | { type: 'text'; text: string; marks?: Mark[]; href?: string }
  | { type: 'math'; tex: string };

export type Block =
  | { id: string; type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; content: Inline[] }
  | { id: string; type: 'paragraph'; content: Inline[] }
  | { id: string; type: 'quote'; content: Inline[] }
  | { id: string; type: 'list'; ordered: boolean; items: Inline[][] }
  | { id: string; type: 'code'; language?: string; text: string }
  | { id: string; type: 'image'; asset: string; alt: string; caption?: Inline[] }
  | { id: string; type: 'table'; header: boolean; rows: Inline[][][] }
  | { id: string; type: 'math'; tex: string }
  | { id: string; type: 'divider' };

export type BlockType = Block['type'];

/** 转换器产出的块还没有编号，由 buildDocument 统一分配 */
export type DraftBlock = Block extends infer B ? (B extends Block ? Omit<B, 'id'> : never) : never;

export interface DraftChapter {
  title: string;
  blocks: DraftBlock[];
}

/** 原文位置：块编号 + 块文本中的字符范围。quote 保存当时的原文，用于在新版本中重新定位 */
export interface Anchor {
  blockId: string;
  start: number;
  end: number;
  quote: string;
}
