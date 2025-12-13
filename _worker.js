export default {
  async fetch(request, env, ctx) {
    // まず、通常通りページを取得する
    const response = await ctx.next(request);

    // レスポンスのヘッダーを書き換える準備
    const newHeaders = new Headers(response.headers);

    // 必須のヘッダーを2つ設定する
    newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
    newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');

    // 新しいヘッダーを適用したレスポンスを返す
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
