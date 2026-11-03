import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import { blockText, buildDocument, collectImages, createAnchor, htmlToBlocks, markdownToBlocks, markdownToDocument, resolveAnchor, splitChapters, textToDocument, toMarkdown, validate, CONVERTER } from '../src/index.ts';
import type { Asset, DocumentMeta, HouDocument } from '../src/index.ts';

const meta = (extra: Partial<DocumentMeta> = {}): DocumentMeta => ({ title: '测试', kind: 'article', source: { type: 'web', url: 'https://example.com' }, importedAt: '2026-11-02T00:00:00.000Z', converter: CONVERTER, ...extra });
const body = (html: string) => parseHTML(`<html><body>${html}</body></html>`).document.body as unknown as Element;

test('粘贴正文：按行分段，整篇一章，编号全文唯一', () => {
  const doc = textToDocument({ title: '留白', text: '留白不是空。\n\n先删掉，\n再决定留下什么。', importedAt: '2026-11-02T00:00:00.000Z' });
  assert.deepEqual(validate(doc), []);
  assert.equal(doc.chapters.length, 1);
  assert.deepEqual(doc.chapters[0].blocks.map(b => [b.id, blockText(b)]), [['b1', '留白不是空。'], ['b2', '先删掉，'], ['b3', '再决定留下什么。']]);
  assert.throws(() => textToDocument({ title: ' ', text: 'x' }), /缺少标题/);
  assert.throws(() => textToDocument({ title: 'x', text: '\n \n' }), /正文为空/);
});

test('HTML：段落、样式、链接、列表、引用、代码、表格、分隔线、公式', () => {
  const blocks = htmlToBlocks(body(`
    <h2>一屏只突出一件事</h2>
    <p>界面要像一张<strong>宣纸</strong>，<em>大面积</em>留白，见<a href="https://x.test">规范</a>。</p>
    <ul><li>墨色分层</li><li>没有<code>shadow</code></li></ul>
    <blockquote><p>先把书读厚，</p><p>再把书读薄。</p></blockquote>
    <pre><code class="language-css">.card { padding: 24px; }
</code></pre>
    <table><tr><th>名称</th><th>取值</th></tr><tr><td>paper</td><td>#F3EADB</td></tr></table>
    <hr>
    <math display="block"><semantics><mi>x</mi><annotation encoding="application/x-tex">x^2</annotation></semantics></math>
    <script>alert(1)</script>`));
  assert.deepEqual(blocks.map(b => b.type), ['heading', 'paragraph', 'list', 'quote', 'quote', 'code', 'table', 'divider', 'math']);
  const p = blocks[1];
  assert.equal(p.type, 'paragraph');
  if (p.type === 'paragraph') {
    assert.deepEqual(p.content.find(c => c.type === 'text' && c.text === '宣纸'), { type: 'text', text: '宣纸', marks: ['bold'] });
    assert.deepEqual(p.content.find(c => c.type === 'text' && c.href), { type: 'text', text: '规范', href: 'https://x.test' });
  }
  assert.deepEqual(blocks[5], { type: 'code', text: '.card { padding: 24px; }', language: 'css' });
  assert.deepEqual(blocks[8], { type: 'math', tex: 'x^2' });
  const table = blocks[6];
  assert.ok(table.type === 'table' && table.header && table.rows.length === 2);
});

test('HTML：中文之间因源码换行产生的空格被去掉，英文空格保留', () => {
  const [p] = htmlToBlocks(body('<p>读厚，\n   再读薄。 Read it thick.</p>'));
  assert.ok(p.type === 'paragraph');
  assert.equal(blockText({ ...p, id: 'x' }), '读厚，再读薄。 Read it thick.');
});

test('公众号：section/span 嵌套、data-src 图片、图片夹在段落中', () => {
  const root = body(`<div id="js_content">
    <section><span><p>第一段<img data-src="https://mmbiz.qpic.cn/a.png" src="data:image/gif;base64,R0lGOD" alt="示意图">第二段</p></span></section>
    <section><span style="color:red">裸露在容器里的文字</span><p>正常段落</p></section>
    <p><br></p>
  </div>`).querySelector('#js_content')!;
  assert.deepEqual(collectImages(root), ['https://mmbiz.qpic.cn/a.png']);
  const assets: Asset[] = [];
  const blocks = htmlToBlocks(root, {
    resolveImage: src => {
      const id = `img${assets.length + 1}`;
      assets.push({ id, path: `assets/${id}.png`, mediaType: 'image/png', sourceUrl: src });
      return id;
    },
  });
  assert.deepEqual(blocks.map(b => b.type), ['paragraph', 'image', 'paragraph', 'paragraph', 'paragraph']);
  assert.equal(assets[0].sourceUrl, 'https://mmbiz.qpic.cn/a.png');
  const doc = buildDocument(meta({ source: { type: 'wechat' } }), [{ title: '全文', blocks }], assets);
  assert.deepEqual(validate(doc), []);
  assert.match(toMarkdown(doc), /!\[示意图\]\(assets\/img1\.png\)/);
});

test('图片未登记为资源时丢弃，不产生无效引用', () => {
  const blocks = htmlToBlocks(body('<p>文字<img src="a.png"></p>'));
  assert.deepEqual(blocks.map(b => b.type), ['paragraph']);
});

test('按标题切分章节，标题成为章节名', () => {
  const blocks = htmlToBlocks(body('<p>序言</p><h1>第一章</h1><p>甲</p><h2>小节</h2><p>乙</p><h1>第二章</h1><p>丙</p>'));
  const chapters = splitChapters(blocks, '开始');
  assert.deepEqual(chapters.map(c => [c.title, c.blocks.length]), [['开始', 1], ['第一章', 3], ['第二章', 1]]);
});

test('原文定位：建立、核对，并在重新转换后的新版本中找回', () => {
  const v1 = textToDocument({ title: 't', text: '甲\n留白不是空，而是让重点被看见。' });
  const anchor = createAnchor(v1, 'b2', 6, 15);
  assert.equal(anchor.quote, '而是让重点被看见。');
  assert.equal(resolveAnchor(v1, anchor), anchor);
  const v2 = textToDocument({ title: 't', text: '新增的一段\n甲\n留白不是空，而是让重点被看见。' });
  assert.deepEqual(resolveAnchor(v2, anchor), { blockId: 'b3', start: 6, end: 15, quote: '而是让重点被看见。' });
  assert.equal(resolveAnchor(textToDocument({ title: 't', text: '完全不同' }), anchor), undefined);
  assert.throws(() => createAnchor(v1, 'b2', 5, 99), /原文范围无效/);
  assert.throws(() => createAnchor(v1, 'b9', 0, 1), /找不到块/);
});

test('校验能发现重复编号、无效资源引用和越界路径', () => {
  const doc: HouDocument = buildDocument(meta(), [{ title: '一', blocks: [{ type: 'image', asset: 'missing', alt: '' }] }], [{ id: 'a', path: '../x.png', mediaType: 'image/png' }]);
  doc.chapters[0].blocks.push({ ...doc.chapters[0].blocks[0] });
  const errors = validate(doc);
  assert.ok(errors.some(e => e.includes('编号重复：b1')));
  assert.ok(errors.some(e => e.includes('不存在的资源：missing')));
  assert.ok(errors.some(e => e.includes('相对路径')));
});

test('Markdown 导出：可带块编号，供模型回指原文', () => {
  const doc = textToDocument({ title: '留白', text: '一*二*' });
  assert.equal(toMarkdown(doc), '# 留白\n\n## 全文\n\n一\\*二\\*\n');
  assert.match(toMarkdown(doc, { ids: true }), /<!-- b1 -->\n一/);
});

test('Markdown：标题、段落、样式、列表（含嵌套）、引用、代码、表格、公式、分隔线', () => {
  const blocks = markdownToBlocks([
    '## 留白',
    '',
    '界面要像一张**宣纸**，*大面积*留白，见[规范](https://x.test)，',
    '用 `tokens.css` 的变量。',
    '',
    '- 墨色分层',
    '  1. 深',
    '  2. 浅',
    '- 没有投影',
    '',
    '> 先把书读厚，',
    '>',
    '> 再把书读薄。',
    '',
    '```css',
    '.card { padding: 24px; }',
    '```',
    '',
    '| 名称 | 取值 |',
    '|---|---|',
    '| paper | #F3EADB |',
    '',
    '$$',
    'E = mc^2',
    '$$',
    '',
    '面积是 $\\pi r^2$，价格 $5 和 $10。',
    '',
    '---',
  ].join('\n'));
  assert.deepEqual(blocks.map(b => b.type), ['heading', 'paragraph', 'list', 'quote', 'quote', 'code', 'table', 'math', 'paragraph', 'divider']);
  const p = blocks[1];
  assert.ok(p.type === 'paragraph');
  assert.equal(blockText({ ...p, id: 'x' }), '界面要像一张宣纸，大面积留白，见规范，用 tokens.css 的变量。', '中文之间的软换行被去掉');
  assert.deepEqual(p.content.find(c => c.type === 'text' && c.href), { type: 'text', text: '规范', href: 'https://x.test' });
  const list = blocks[2];
  assert.ok(list.type === 'list' && list.items.length === 4, '嵌套列表展平');
  assert.deepEqual(blocks[7], { type: 'math', tex: 'E = mc^2' });
  const prices = blocks[8];
  assert.ok(prices.type === 'paragraph');
  assert.deepEqual(prices.content.filter(c => c.type === 'math'), [{ type: 'math', tex: '\\pi r^2' }], '价格里的 $ 不当作公式');
  const table = blocks[6];
  assert.ok(table.type === 'table' && table.header && table.rows.length === 2);
});

test('Markdown：段落中的图片单独成块；HTML 块交给调用方转换', () => {
  const blocks = markdownToBlocks('前面 ![示意](a.png "图 1") 后面\n\n<table><tr><td>1</td></tr></table>', {
    resolveImage: () => 'img1',
    html: html => [{ type: 'paragraph', content: [{ type: 'text', text: `HTML:${html.length}` }] }],
  });
  assert.deepEqual(blocks.map(b => b.type), ['paragraph', 'image', 'paragraph', 'paragraph']);
  assert.deepEqual(blocks[1], { type: 'image', asset: 'img1', alt: '示意', caption: [{ type: 'text', text: '图 1' }] });
});

test('Markdown 文档：唯一的一级标题作为文档标题，二级标题切分章节', () => {
  const doc = markdownToDocument({
    markdown: '# 怎样用厚\n\n## 读厚，再读薄\n\n第一段。\n\n### 小节\n\n第二段。\n\n## 一本书，一篇文章\n\n第三段。',
    meta: { kind: 'article', source: { type: 'builtin' }, importedAt: '2026-11-03T00:00:00.000Z' },
  });
  assert.deepEqual(validate(doc), []);
  assert.equal(doc.meta.title, '怎样用厚');
  assert.deepEqual(doc.chapters.map(c => [c.title, c.blocks.length]), [['读厚，再读薄', 3], ['一本书，一篇文章', 1]]);
  const noTitle = () => markdownToDocument({ markdown: '只有正文', meta: { kind: 'article', source: { type: 'markdown' }, importedAt: '2026-11-03T00:00:00.000Z' } });
  assert.throws(noTitle, /缺少标题/);
});
