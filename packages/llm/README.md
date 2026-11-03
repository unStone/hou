# @hou/llm

《厚》的模型接入。业务代码只面对一个统一接口，不关心背后是哪家模型服务；以后要加新的接入方式，只需新增一个适配器。

## 接口

```ts
import { createProvider, completeWithRetry } from '@hou/llm';

const provider = createProvider({ type: 'anthropic', id: 'main', model: 'claude-opus-5-5', effort: 'medium' }, apiKey);

const result = await completeWithRetry(provider, {
  system: '……',
  messages: [{ role: 'user', content: [{ type: 'image', mediaType: 'image/png', data: base64 }, { type: 'text', text: '……' }] }],
  json: { name: 'questions', schema },
}, { retries: 1, validate: checkQuestions });

result.json;   // 解析后的 JSON
result.usage;  // 用量，写入运行记录
result.raw;    // 原始响应，写入运行记录
```

| 内容 | 说明 |
|---|---|
| `Provider.complete` | 输入：系统提示、消息（文字和 base64 图片）、可选 JSON Schema；输出：文字、JSON、实际模型、用量、原始响应 |
| `LlmError` | 统一的错误：`auth`、`rate_limit`、`bad_request`、`timeout`、`network`、`server`、`refused`、`truncated`、`invalid_output`、`aborted`，并标明是否可重试 |
| `completeWithRetry` | 可重试的错误自动重试；可传 `validate` 做业务校验（例如考察题格式），不通过按 `invalid_output` 重新生成 |
| `createProvider` | 按设置中保存的配置创建；密钥单独传入，不写在配置里 |

## 接入方式

| 类型 | 适用 | 实现 |
|---|---|---|
| `anthropic` | Claude | 官方 SDK `@anthropic-ai/sdk`。结构化输出用 `output_config.format`；可设置思考深度 `effort`。对 Claude Fable 5.1、Opus 5.5、Opus 5、Sonnet 5.5 默认开启服务端拒答回退（`fallbacks: "default"`），可用 `refusalFallback: false` 关闭 |
| `openai-compatible` | 大部分云端服务，以及本机运行的模型（vLLM、Ollama、LM Studio 等），包括 OCR 小模型 | `fetch` 调用 `{baseUrl}/chat/completions`。`jsonMode` 可选 `json_schema`（默认，严格结构化输出）、`json_object`、`prompt`（服务不支持结构化输出时，把 schema 写进系统提示） |

## 开发

```bash
pnpm test
```

```bash
pnpm typecheck
```

测试不发真实请求：OpenAI 兼容接口用假的 `fetch`；Anthropic 把假的 `fetch` 注入官方 SDK，测试的是 SDK 实际发出的请求。
