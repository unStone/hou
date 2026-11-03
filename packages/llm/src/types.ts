// 与具体模型服务无关的调用接口。各适配器把它翻译成自己的请求格式

export type ImageMediaType = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif';

export type Part =
  | { type: 'text'; text: string }
  /** data 为 base64，不带 data: 前缀 */
  | { type: 'image'; mediaType: ImageMediaType; data: string };

export interface Message {
  role: 'user' | 'assistant';
  content: string | Part[];
}

export interface JsonOutput {
  /** 只能包含字母、数字、下划线和连字符，部分服务要求 */
  name: string;
  /** JSON Schema。为兼容各家结构化输出，对象应写明 required 与 additionalProperties: false */
  schema: Record<string, unknown>;
}

export interface CompleteRequest {
  system?: string;
  messages: Message[];
  maxTokens?: number;
  /** 要求返回符合 schema 的 JSON；结果在 CompleteResult.json */
  json?: JsonOutput;
  signal?: AbortSignal;
}

export interface Usage {
  inputTokens?: number;
  outputTokens?: number;
}

export interface CompleteResult {
  text: string;
  /** 请求了 json 时为解析后的对象 */
  json?: unknown;
  /** 实际回答的模型（服务端可能回退到其他模型） */
  model: string;
  usage: Usage;
  /** 服务返回的原始响应，写入运行记录用于排查 */
  raw: unknown;
}

export interface Provider {
  /** 配置中的服务编号 */
  id: string;
  /** 用于运行记录，例如 "anthropic:claude-opus-5-5" */
  label: string;
  complete(request: CompleteRequest): Promise<CompleteResult>;
}

export type ErrorKind =
  | 'auth' // 密钥无效或没有权限
  | 'rate_limit' // 请求太频繁或额度用完
  | 'bad_request' // 请求不被接受（模型名错误、参数不支持等）
  | 'timeout'
  | 'network'
  | 'server' // 服务端错误
  | 'refused' // 模型拒绝回答
  | 'truncated' // 输出被长度上限截断
  | 'invalid_output' // 要求 JSON 但返回的内容无法解析或不符合要求
  | 'aborted';

const RETRYABLE: ErrorKind[] = ['rate_limit', 'timeout', 'network', 'server', 'invalid_output'];

export class LlmError extends Error {
  kind: ErrorKind;
  status?: number;
  provider: string;
  retryable: boolean;
  constructor(kind: ErrorKind, message: string, provider: string, options: { status?: number; cause?: unknown } = {}) {
    super(message, { cause: options.cause });
    this.name = 'LlmError';
    this.kind = kind;
    this.provider = provider;
    this.status = options.status;
    this.retryable = RETRYABLE.includes(kind);
  }
}

export function kindFromStatus(status: number): ErrorKind {
  if (status === 401 || status === 403) return 'auth';
  if (status === 408) return 'timeout';
  if (status === 429) return 'rate_limit';
  if (status >= 500) return 'server';
  return 'bad_request';
}
