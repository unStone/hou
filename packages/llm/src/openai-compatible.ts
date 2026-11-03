import { parseJson } from './json.ts';
import { kindFromStatus, LlmError } from './types.ts';
import type { CompleteRequest, CompleteResult, Message, Provider } from './types.ts';

// "OpenAI 兼容接口"是许多服务共用的协议（POST {baseUrl}/chat/completions），
// 云端服务和本机运行的模型（vLLM、Ollama、LM Studio 等）大多支持。OCR 小模型也通过它调用。

export interface OpenAICompatibleConfig {
  id: string;
  /** 例如 http://localhost:11434/v1，不含 /chat/completions */
  baseUrl: string;
  model: string;
  /** 本机服务通常不需要 */
  apiKey?: string;
  /**
   * 要求 JSON 时的方式：
   * json_schema 为严格结构化输出；json_object 只保证是 JSON；prompt 只在提示里要求（服务不支持结构化输出时使用）
   */
  jsonMode?: 'json_schema' | 'json_object' | 'prompt';
  /** 毫秒，默认 120000 */
  timeout?: number;
  headers?: Record<string, string>;
  /** 测试时注入 */
  fetch?: typeof fetch;
}

interface ChatResponse {
  model?: string;
  choices?: { message?: { content?: string | null; refusal?: string | null }; finish_reason?: string }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
  error?: { message?: string };
}

function toOpenAIMessages(system: string | undefined, messages: Message[]) {
  return [
    ...(system ? [{ role: 'system', content: system }] : []),
    ...messages.map(m => ({
      role: m.role,
      content:
        typeof m.content === 'string'
          ? m.content
          : m.content.map(part =>
              part.type === 'text'
                ? { type: 'text', text: part.text }
                : { type: 'image_url', image_url: { url: `data:${part.mediaType};base64,${part.data}` } },
            ),
    })),
  ];
}

export function createOpenAICompatible(config: OpenAICompatibleConfig): Provider {
  const label = `openai-compatible:${config.model}`;
  const doFetch = config.fetch ?? fetch;
  const mode = config.jsonMode ?? 'json_schema';
  const url = `${config.baseUrl.replace(/\/+$/, '')}/chat/completions`;

  return {
    id: config.id,
    label,
    async complete(request: CompleteRequest): Promise<CompleteResult> {
      const system = request.json && mode !== 'json_schema'
        ? `${request.system ? `${request.system}\n\n` : ''}只输出一个符合以下 JSON Schema 的 JSON 对象，不要输出其他文字：\n${JSON.stringify(request.json.schema)}`
        : request.system;
      const body = {
        model: config.model,
        max_tokens: request.maxTokens ?? 16000,
        messages: toOpenAIMessages(system, request.messages),
        ...(request.json && mode === 'json_schema' ? { response_format: { type: 'json_schema', json_schema: { name: request.json.name, schema: request.json.schema, strict: true } } } : {}),
        ...(request.json && mode === 'json_object' ? { response_format: { type: 'json_object' } } : {}),
      };
      const timeout = AbortSignal.timeout(config.timeout ?? 120_000);
      const signal = request.signal ? AbortSignal.any([request.signal, timeout]) : timeout;
      let response: Response;
      try {
        response = await doFetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...(config.apiKey ? { authorization: `Bearer ${config.apiKey}` } : {}), ...config.headers },
          body: JSON.stringify(body),
          signal,
        });
      } catch (cause) {
        if (request.signal?.aborted) throw new LlmError('aborted', '请求已取消', label, { cause });
        if (timeout.aborted) throw new LlmError('timeout', '请求超时', label, { cause });
        throw new LlmError('network', `无法连接模型服务：${url}`, label, { cause });
      }
      let data: ChatResponse;
      try {
        data = (await response.json()) as ChatResponse;
      } catch (cause) {
        throw new LlmError(response.ok ? 'invalid_output' : kindFromStatus(response.status), `模型服务返回了无法解析的响应（HTTP ${response.status}）`, label, { status: response.status, cause });
      }
      if (!response.ok) throw new LlmError(kindFromStatus(response.status), data.error?.message ?? `模型服务返回 HTTP ${response.status}`, label, { status: response.status });
      const choice = data.choices?.[0];
      if (choice?.message?.refusal) throw new LlmError('refused', `模型拒绝回答：${choice.message.refusal}`, label);
      const text = choice?.message?.content ?? '';
      if (choice?.finish_reason === 'length' && request.json) throw new LlmError('truncated', '输出超过长度上限，JSON 不完整', label);
      return {
        text,
        ...(request.json ? { json: parseJson(text, label) } : {}),
        model: data.model ?? config.model,
        usage: { inputTokens: data.usage?.prompt_tokens, outputTokens: data.usage?.completion_tokens },
        raw: data,
      };
    },
  };
}
