import Anthropic from '@anthropic-ai/sdk';
import { parseJson } from './json.ts';
import { LlmError } from './types.ts';
import type { CompleteRequest, CompleteResult, Message, Provider } from './types.ts';

export interface AnthropicConfig {
  id: string;
  apiKey: string;
  /** 例如 claude-opus-5-5 */
  model: string;
  /** 输出思考深度；Claude Opus 5.5 默认 medium */
  effort?: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  baseURL?: string;
  /** 毫秒 */
  timeout?: number;
  maxRetries?: number;
  /**
   * 模型因安全策略拒绝时，由服务端自动换模型重答（Claude API 的 fallbacks: "default"）。
   * 未设置时，对支持的模型且未自定义 baseURL 时默认开启
   */
  refusalFallback?: boolean;
  /** 测试时注入 */
  client?: Anthropic;
}

const FALLBACK_MODELS = ['claude-fable-5-1', 'claude-opus-5-5', 'claude-opus-5', 'claude-sonnet-5-5'];

function toAnthropicMessages(messages: Message[]): Anthropic.MessageParam[] {
  return messages.map(m => ({
    role: m.role,
    content:
      typeof m.content === 'string'
        ? m.content
        : m.content.map(part =>
            part.type === 'text'
              ? { type: 'text' as const, text: part.text }
              : { type: 'image' as const, source: { type: 'base64' as const, media_type: part.mediaType, data: part.data } },
          ),
  }));
}

function toLlmError(error: unknown, provider: string): LlmError {
  if (error instanceof LlmError) return error;
  if (error instanceof Anthropic.APIUserAbortError) return new LlmError('aborted', '请求已取消', provider, { cause: error });
  if (error instanceof Anthropic.APIConnectionTimeoutError) return new LlmError('timeout', '请求超时', provider, { cause: error });
  if (error instanceof Anthropic.APIConnectionError) return new LlmError('network', `无法连接模型服务：${error.message}`, provider, { cause: error });
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) return new LlmError('auth', '密钥无效或没有权限', provider, { status: error.status, cause: error });
  if (error instanceof Anthropic.RateLimitError) return new LlmError('rate_limit', '请求太频繁或额度已用完', provider, { status: error.status, cause: error });
  if (error instanceof Anthropic.InternalServerError) return new LlmError('server', `模型服务出错：${error.message}`, provider, { status: error.status, cause: error });
  if (error instanceof Anthropic.APIError) return new LlmError(error.status && error.status >= 500 ? 'server' : 'bad_request', `请求未被接受：${error.message}`, provider, { status: error.status, cause: error });
  return new LlmError('network', String(error), provider, { cause: error });
}

export function createAnthropic(config: AnthropicConfig): Provider {
  const client = config.client ?? new Anthropic({ apiKey: config.apiKey, baseURL: config.baseURL, timeout: config.timeout, maxRetries: config.maxRetries });
  const fallback = config.refusalFallback ?? (!config.baseURL && FALLBACK_MODELS.includes(config.model));
  const label = `anthropic:${config.model}`;

  return {
    id: config.id,
    label,
    async complete(request: CompleteRequest): Promise<CompleteResult> {
      const params = {
        model: config.model,
        max_tokens: request.maxTokens ?? 16000,
        ...(request.system ? { system: request.system } : {}),
        messages: toAnthropicMessages(request.messages),
        ...(request.json || config.effort
          ? { output_config: { ...(config.effort ? { effort: config.effort } : {}), ...(request.json ? { format: { type: 'json_schema' as const, schema: request.json.schema } } : {}) } }
          : {}),
      };
      let response: Anthropic.Message | Anthropic.Beta.BetaMessage;
      try {
        response = fallback
          ? await client.beta.messages.create({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' }, { signal: request.signal })
          : await client.messages.create(params, { signal: request.signal });
      } catch (error) {
        throw toLlmError(error, label);
      }
      if (response.stop_reason === 'refusal') {
        const details = response.stop_details;
        throw new LlmError('refused', `模型拒绝回答${details?.category ? `（${details.category}）` : ''}`, label);
      }
      const text = response.content.flatMap(block => (block.type === 'text' ? [block.text] : [])).join('');
      if (response.stop_reason === 'max_tokens' && request.json) throw new LlmError('truncated', '输出超过长度上限，JSON 不完整', label);
      return {
        text,
        ...(request.json ? { json: parseJson(text, label) } : {}),
        model: response.model,
        usage: { inputTokens: response.usage.input_tokens, outputTokens: response.usage.output_tokens },
        raw: response,
      };
    },
  };
}
