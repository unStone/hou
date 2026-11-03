import { FORMAT, FORMAT_VERSION } from './types.ts';
import type { Block, HouDocument, Inline } from './types.ts';

const KINDS = ['book', 'article'];
const SOURCES = ['epub', 'pdf', 'web', 'wechat', 'x', 'text'];
const MARKS = ['bold', 'italic', 'code'];

/** 检查文档是否符合规范，返回全部问题；空数组表示通过 */
export function validate(doc: HouDocument): string[] {
  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  if (doc.format !== FORMAT) fail(`format 应为 ${FORMAT}`);
  if (doc.version !== FORMAT_VERSION) fail(`不支持的版本：${doc.version}`);
  const meta = doc.meta;
  if (!meta?.title?.trim()) fail('缺少标题');
  if (!KINDS.includes(meta?.kind)) fail(`kind 无效：${meta?.kind}`);
  if (!SOURCES.includes(meta?.source?.type)) fail(`来源类型无效：${meta?.source?.type}`);
  if (Number.isNaN(Date.parse(meta?.importedAt))) fail('importedAt 不是有效时间');
  if (!meta?.converter?.name || !meta?.converter?.version) fail('缺少转换器信息');
  if (!doc.chapters?.length) fail('至少需要一个章节');

  const assetIds = new Set<string>();
  for (const asset of doc.assets ?? []) {
    if (assetIds.has(asset.id)) fail(`资源编号重复：${asset.id}`);
    assetIds.add(asset.id);
    if (!asset.path || asset.path.startsWith('/') || asset.path.split('/').includes('..')) fail(`资源 ${asset.id} 的路径必须是文档目录内的相对路径`);
  }

  const ids = new Set<string>();
  const checkId = (id: string, where: string) => {
    if (!id) fail(`${where} 缺少编号`);
    else if (ids.has(id)) fail(`编号重复：${id}`);
    ids.add(id);
  };
  const checkInline = (content: Inline[] | undefined, where: string) => {
    if (!Array.isArray(content)) { fail(`${where} 缺少内容`); return; }
    for (const part of content) {
      if (part.type === 'text') {
        if (typeof part.text !== 'string') fail(`${where} 文本无效`);
        for (const mark of part.marks ?? []) if (!MARKS.includes(mark)) fail(`${where} 样式无效：${mark}`);
      } else if (part.type === 'math') {
        if (!part.tex) fail(`${where} 公式为空`);
      } else fail(`${where} 行内类型无效：${(part as { type: string }).type}`);
    }
  };
  const checkBlock = (block: Block, where: string) => {
    switch (block.type) {
      case 'heading':
        if (![1, 2, 3, 4, 5, 6].includes(block.level)) fail(`${where} 标题级别无效`);
        checkInline(block.content, where);
        break;
      case 'paragraph':
      case 'quote':
        checkInline(block.content, where);
        break;
      case 'list':
        if (!block.items?.length) fail(`${where} 列表为空`);
        block.items?.forEach((item, i) => checkInline(item, `${where} 第 ${i + 1} 项`));
        break;
      case 'code':
        if (typeof block.text !== 'string') fail(`${where} 代码无效`);
        break;
      case 'image':
        if (!assetIds.has(block.asset)) fail(`${where} 引用了不存在的资源：${block.asset}`);
        if (block.caption) checkInline(block.caption, where);
        break;
      case 'table':
        if (!block.rows?.length) fail(`${where} 表格为空`);
        block.rows?.forEach((row, r) => row.forEach((cell, c) => checkInline(cell, `${where} 第 ${r + 1} 行第 ${c + 1} 列`)));
        break;
      case 'math':
        if (!block.tex) fail(`${where} 公式为空`);
        break;
      case 'divider':
        break;
      default:
        fail(`${where} 块类型无效：${(block as { type: string }).type}`);
    }
  };

  for (const chapter of doc.chapters ?? []) {
    checkId(chapter.id, '章节');
    if (!chapter.title?.trim()) fail(`章节 ${chapter.id} 缺少标题`);
    for (const block of chapter.blocks ?? []) {
      checkId(block.id, `章节 ${chapter.id} 中的块`);
      checkBlock(block, `块 ${block.id}`);
    }
  }
  return errors;
}
