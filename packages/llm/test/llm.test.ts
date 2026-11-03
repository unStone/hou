import { test } from 'node:test';
import assert from 'node:assert/strict';
import Anthropic from '@anthropic-ai/sdk';
import { completeWithRetry, createAnthropic, createOpenAICompatible, createProvider, LlmError, parseJson } from '../src/index.ts';
import type { Provider } from '../src/index.ts';

type Call = { url: string; headers: Record<string, string>; body: any };

/** 记录请求、按顺序返回预设响应的假 fetch */
function fakeFetch(responses: (Response | Error)[]) {
  const calls: Call[] = [];
  const fn = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    calls.push({ url: request.url, headers: Object.fromEntries(request.headers), body: JSON.parse(await request.text()) });
    const next = responses.shift();
    if (!next) throw new Error('没有预设响应');
    if (next instanceof Error) throw next;
    return next;
  }) as typeof fetch;
  return { fn, calls };
}
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const image = { type: 'image' as const, mediaType: 'image/png' as const, data: 'iVBORw0KGgo=' };
const schema = { type: 'object', properties: { title: { type: 'string' } }, required: ['title'], additionalProperties: false };

test('OpenAI 兼容：请求格式、图片、系统提示、结构化输出', async () => {
  const { fn, calls } = fakeFetch([json(200, { model: 'glm-ocr', choices: [{ message: { content: '{"title":"第一章"}' }, finish_reason: 'stop' }], usage: { prompt_tokens: 10, completion_tokens: 5 } })]);
  const provider = createOpenAICompatible({ id: 'local', baseUrl: 'http://localhost:11434/v1/', model: 'glm-ocr', fetch: fn });
  const result = await provider.complete({ system: '你是 OCR', messages: [{ role: 'user', content: [image, { type: 'text', text: '转成 Markdown' }] }], json: { name: 'page', schema } });
  assert.equal(calls[0].url, 'http://localhost:11434/v1/chat/completions');
  assert.equal(calls[0].headers.authorization, undefined, '本机服务没有密钥时不发送 authorization');
  assert.deepEqual(calls[0].body.messages[0], { role: 'system', content: '你是 OCR' });
  assert.deepEqual(calls[0].body.messages[1].content[0], { type: 'image_url', image_url: { url: 'data:image/png;base64,iVBORw0KGgo=' } });
  assert.deepEqual(calls[0].body.response_format, { type: 'json_schema', json_schema: { name: 'page', schema, strict: true } });
  assert.deepEqual(result.json, { title: '第一章' });
  assert.deepEqual(result.usage, { inputTokens: 10, outputTokens: 5 });
  assert.equal(provider.label, 'openai-compatible:glm-ocr');
});

test('OpenAI 兼容：不支持结构化输出时，把 schema 写进系统提示，并能解析代码块包裹的 JSON', async () => {
  const { fn, calls } = fakeFetch([json(200, { choices: [{ message: { content: '```json\n{"title":"x"}\n```' } }] })]);
  const provider = createOpenAICompatible({ id: 'p', baseUrl: 'https://api.example.com/v1', model: 'm', apiKey: 'k', jsonMode: 'prompt', fetch: fn });
  const result = await provider.complete({ system: '出题', messages: [{ role: 'user', content: 'hi' }], json: { name: 'q', schema } });
  assert.equal(calls[0].headers.authorization, 'Bearer k');
  assert.equal(calls[0].body.response_format, undefined);
  assert.match(calls[0].body.messages[0].content, /^出题\n\n只输出一个符合以下 JSON Schema/);
  assert.deepEqual(result.json, { title: 'x' });
});

test('OpenAI 兼容：错误分类', async () => {
  const cases: [Response | Error, string, boolean][] = [
    [json(401, { error: { message: 'bad key' } }), 'auth', false],
    [json(429, { error: { message: 'slow down' } }), 'rate_limit', true],
    [json(404, { error: { message: 'no such model' } }), 'bad_request', false],
    [json(503, {}), 'server', true],
    [new TypeError('fetch failed'), 'network', true],
    [json(200, { choices: [{ message: { content: null, refusal: '不能回答' } }] }), 'refused', false],
    [json(200, { choices: [{ message: { content: '{"title":' }, finish_reason: 'length' }] }), 'truncated', false],
    [json(200, { choices: [{ message: { content: '不是 JSON' } }] }), 'invalid_output', true],
  ];
  for (const [response, kind, retryable] of cases) {
    const { fn } = fakeFetch([response]);
    const provider = createOpenAICompatible({ id: 'p', baseUrl: 'http://x', model: 'm', fetch: fn });
    await assert.rejects(provider.complete({ messages: [{ role: 'user', content: 'hi' }], json: { name: 'q', schema } }), (error: unknown) => {
      assert.ok(error instanceof LlmError);
      assert.equal(error.kind, kind);
      assert.equal(error.retryable, retryable);
      return true;
    });
  }
});

test('OpenAI 兼容：超时', async () => {
  // 像真实请求一样挂起，直到被取消；挂起期间保持事件循环，否则 AbortSignal.timeout 的计时器不会触发
  const hang = (async (_: RequestInfo | URL, init?: RequestInit) =>
    new Promise<Response>((_, reject) => {
      const alive = setTimeout(() => reject(new Error('超时没有触发')), 5000);
      init?.signal?.addEventListener('abort', () => { clearTimeout(alive); reject(init.signal!.reason); });
    })) as typeof fetch;
  const provider = createOpenAICompatible({ id: 'p', baseUrl: 'http://x', model: 'm', timeout: 20, fetch: hang });
  await assert.rejects(provider.complete({ messages: [{ role: 'user', content: 'hi' }] }), { kind: 'timeout' });
});

const anthropicReply = (content: unknown[], extra: Record<string, unknown> = {}) =>
  json(200, { id: 'msg_1', type: 'message', role: 'assistant', model: 'claude-opus-5-5', content, stop_reason: 'end_turn', stop_details: null, usage: { input_tokens: 12, output_tokens: 3 }, ...extra });
const sdk = (fn: typeof fetch) => new Anthropic({ apiKey: 'test-key', fetch: fn, maxRetries: 0 });

test('Anthropic：经官方 SDK 发出请求；结构化输出、图片、思考深度、默认开启拒答回退', async () => {
  const { fn, calls } = fakeFetch([anthropicReply([{ type: 'text', text: '{"title":"序"}' }])]);
  const provider = createAnthropic({ id: 'claude', apiKey: 'test-key', model: 'claude-opus-5-5', effort: 'high', client: sdk(fn) });
  const result = await provider.complete({ system: '出题', messages: [{ role: 'user', content: [image, { type: 'text', text: '看图' }] }], json: { name: 'q', schema } });
  const { url, headers, body } = calls[0];
  assert.match(url, /\/v1\/messages$/);
  assert.equal(headers.authorization, 'Bearer test-key');
  assert.match(headers['anthropic-beta'], /server-side-fallback-2026-07-01/);
  assert.equal(body.fallbacks, 'default');
  assert.equal(body.system, '出题');
  assert.deepEqual(body.output_config, { effort: 'high', format: { type: 'json_schema', schema } });
  assert.deepEqual(body.messages[0].content[0], { type: 'image', source: { type: 'base64', media_type: 'image/png', data: 'iVBORw0KGgo=' } });
  assert.deepEqual(result.json, { title: '序' });
  assert.equal(provider.label, 'anthropic:claude-opus-5-5');
});

test('Anthropic：自定义 baseURL 或不支持的模型不开启回退', async () => {
  const { fn, calls } = fakeFetch([anthropicReply([{ type: 'text', text: 'ok' }], { model: 'claude-haiku-5-5' })]);
  const provider = createAnthropic({ id: 'c', apiKey: 'k', model: 'claude-haiku-5-5', client: sdk(fn) });
  await provider.complete({ messages: [{ role: 'user', content: 'hi' }] });
  assert.doesNotMatch(calls[0].headers['anthropic-beta'] ?? '', /server-side-fallback/);
  assert.equal(calls[0].body.fallbacks, undefined);
  assert.equal(calls[0].body.output_config, undefined);
});

test('Anthropic：拒答、截断与 HTTP 错误', async () => {
  const refused = fakeFetch([anthropicReply([], { stop_reason: 'refusal', stop_details: { type: 'refusal', category: 'cyber', explanation: null } })]);
  await assert.rejects(createAnthropic({ id: 'c', apiKey: 'k', model: 'claude-opus-5-5', client: sdk(refused.fn) }).complete({ messages: [{ role: 'user', content: 'x' }] }), { kind: 'refused', message: '模型拒绝回答（cyber）' });
  const cut = fakeFetch([anthropicReply([{ type: 'text', text: '{"ti' }], { stop_reason: 'max_tokens' })]);
  await assert.rejects(createAnthropic({ id: 'c', apiKey: 'k', model: 'claude-opus-5-5', client: sdk(cut.fn) }).complete({ messages: [{ role: 'user', content: 'x' }], json: { name: 'q', schema } }), { kind: 'truncated' });
  for (const [status, kind] of [[401, 'auth'], [429, 'rate_limit'], [400, 'bad_request'], [500, 'server']] as const) {
    const failing = fakeFetch([json(status, { type: 'error', error: { type: 'x', message: 'nope' } })]);
    await assert.rejects(createAnthropic({ id: 'c', apiKey: 'k', model: 'claude-opus-5-5', client: sdk(failing.fn) }).complete({ messages: [{ role: 'user', content: 'x' }] }), { kind, status });
  }
});

test('completeWithRetry：可重试的错误和不合格的输出会重试，不可重试的立即抛出', async () => {
  let calls = 0;
  const flaky: Provider = { id: 'f', label: 'f', complete: async () => { calls++; if (calls === 1) throw new LlmError('rate_limit', '慢点', 'f'); return { text: '{}', json: { title: calls === 2 ? '' : 'ok' }, model: 'm', usage: {}, raw: null }; } };
  const result = await completeWithRetry(flaky, { messages: [{ role: 'user', content: 'x' }], json: { name: 'q', schema } }, { retries: 2, delay: 1, validate: j => ((j as { title: string }).title ? [] : ['标题为空']) });
  assert.equal(calls, 3);
  assert.deepEqual(result.json, { title: 'ok' });

  let authCalls = 0;
  const denied: Provider = { id: 'd', label: 'd', complete: async () => { authCalls++; throw new LlmError('auth', '密钥无效', 'd'); } };
  await assert.rejects(completeWithRetry(denied, { messages: [] }, { retries: 3, delay: 1 }), { kind: 'auth' });
  assert.equal(authCalls, 1);
});

test('createProvider：按配置创建；Anthropic 缺少密钥时报错', () => {
  assert.equal(createProvider({ type: 'openai-compatible', id: 'o', baseUrl: 'http://x', model: 'm' }).label, 'openai-compatible:m');
  assert.equal(createProvider({ type: 'anthropic', id: 'a', model: 'claude-opus-5-5' }, 'k').label, 'anthropic:claude-opus-5-5');
  assert.throws(() => createProvider({ type: 'anthropic', id: 'a', model: 'claude-opus-5-5' }), /缺少密钥/);
  assert.throws(() => parseJson('{', 'p'), { kind: 'invalid_output' });
});
