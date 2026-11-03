import { LlmError } from './types.ts';

/**
 * 从模型输出中解析 JSON。支持结构化输出的服务直接返回 JSON；
 * 不支持的服务可能包一层 ```json 代码块，这里一并处理。
 */
export function parseJson(text: string, provider: string): unknown {
  const trimmed = text.trim();
  const fenced = /^```(?:json)?\s*\n([\s\S]*?)\n```$/.exec(trimmed);
  const body = fenced ? fenced[1] : trimmed;
  try {
    return JSON.parse(body);
  } catch (cause) {
    throw new LlmError('invalid_output', `模型返回的内容不是有效的 JSON：${body.slice(0, 120)}`, provider, { cause });
  }
}
