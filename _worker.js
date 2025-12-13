export default {
  async fetch(request, env) {
    // 最初に、通常の静的ファイルを取得する
    const response = await env.ASSETS.fetch(request);

    // ヘッダーを書き換えるために、レスポンスのコピーを作成する
    const newResponse = new Response(response.body, response);

    // 新しいレスポンスに、必須のヘッダーを2つ追加する
    newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

    // ヘッダーを追加した新しいレスポンスを返す
    return newResponse;
  },
};
