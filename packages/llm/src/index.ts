import { createAnthropic } from './anthropic.ts';
import { createOpenAICompatible } from './openai-compatible.ts';
import { LlmError } from './types.ts';
import type { AnthropicConfig } from './anthropic.ts';
import type { OpenAICompatibleConfig } from './openai-compatible.ts';
import type { CompleteRequest, CompleteResult, Provider } from './types.ts';

export * from './types.ts';
export { parseJson } from './json.ts';
export { createAnthropic, createOpenAICompatible };
export type { AnthropicConfig, OpenAICompatibleConfig };

/** 设置中保存的服务配置。密钥单独加密存储，调用时再传入 */
export type ProviderConfig =
  | ({ type: 'anthropic' } & Omit<AnthropicConfig, 'apiKey' | 'client'>)
  | ({ type: 'openai-compatible' } & Omit<OpenAICompatibleConfig, 'apiKey' | 'fetch'>);

export function createProvider(config: ProviderConfig, apiKey?: string): Provider {
  switch (config.type) {
    case 'anthropic': {
      if (!apiKey) throw new Error(`模型服务 ${config.id} 缺少密钥`);
      const { type: _type, ...rest } = config;
      return createAnthropic({ ...rest, apiKey });
    }
    case 'openai-compatible': {
      const { type: _type, ...rest } = config;
      return createOpenAICompatible({ ...rest, apiKey });
    }
  }
}

export interface RetryOptions {
  /** 重试次数，默认 1 */
  retries?: number;
  /** 毫秒，默认 1000，每次翻倍 */
  delay?: number;
  /** 对 JSON 结果做业务校验（例如考察题格式），返回问题列表；有问题时按 invalid_output 重试 */
  validate?: (json: unknown) => string[];
}

/**
 * 调用并在可重试的错误（限流、超时、网络、服务端错误、输出不合格）时重试。
 * 考察题"生成后校验，不通过重新生成一次"即用此函数。
 */
export async function completeWithRetry(provider: Provider, request: CompleteRequest, options: RetryOptions = {}): Promise<CompleteResult> {
  const retries = options.retries ?? 1;
  let wait = options.delay ?? 1000;
  for (let attempt = 0; ; attempt++) {
    try {
      const result = await provider.complete(request);
      if (options.validate && request.json) {
        const problems = options.validate(result.json);
        if (problems.length) throw new LlmError('invalid_output', `输出不符合要求：${problems.join('；')}`, provider.label);
      }
      return result;
    } catch (error) {
      if (!(error instanceof LlmError) || !error.retryable || attempt >= retries || request.signal?.aborted) throw error;
      await new Promise(resolve => setTimeout(resolve, wait));
      wait *= 2;
    }
  }
}
