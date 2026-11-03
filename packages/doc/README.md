# @hou/doc

《厚》的统一阅读格式：格式定义、校验、原文定位，以及把各种来源转换为这种格式。格式规范见 [SPEC.md](SPEC.md)。

这个包不依赖《厚》应用本身，只用标准 DOM 接口和纯 TypeScript，可以在桌面应用、浏览器和服务器上运行，供未来多端共用。

## 现在有什么

| 模块 | 内容 |
|---|---|
| `types.ts` | 格式的类型定义 |
| `document.ts` | `buildDocument` 组装文档并分配编号；`blockText` 取块文本 |
| `anchor.ts` | `createAnchor`、`resolveAnchor`：建立原文位置，并在新版本中找回 |
| `validate.ts` | `validate`：检查文档是否符合规范 |
| `html.ts` | `htmlToBlocks`：把已提取的正文 HTML 转为内容块，兼容公众号的嵌套结构和 `data-src` 图片；`splitChapters` 按标题切分章节；`collectImages` 列出要下载的图片 |
| `text.ts` | `textToDocument`：粘贴正文导入 |
| `markdown.ts` | `toMarkdown`：导出 Markdown，可带块编号供模型回指原文 |

## 接下来

1. 一般网页：接入 defuddle（Readability 兜底）取正文，再交给 `htmlToBlocks`。
2. 微信公众号：取 `#js_content`，下载图片并登记资源，清理公众号样式。
3. EPUB：按目录拆章节，每章 HTML 交给 `htmlToBlocks`。
4. X：通过 FxTwitter 接口拼接推文、串推和长文章。
5. PDF：转换工具在技术方案阶段选定。

## 开发

需要 Node 22.18 及以上（直接运行 TypeScript，不需要编译）和 pnpm。在仓库根目录：

```bash
pnpm install
```

```bash
pnpm test
```

```bash
pnpm typecheck
```

源码只使用可以被直接擦除的 TypeScript 语法（不用 `enum`、构造函数参数属性等），导入路径写完整的 `.ts` 扩展名。
