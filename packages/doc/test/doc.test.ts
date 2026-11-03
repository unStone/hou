import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import { blockText, buildDocument, collectImages, createAnchor, htmlToBlocks, resolveAnchor, splitChapters, textToDocument, toMarkdown, validate, CONVERTER } from '../src/index.ts';
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
