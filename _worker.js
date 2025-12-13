export default {
  async fetch(request, env) {
    // 通常の静的ファイルを取得
    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);

    // ★★★ 修正点：ここに一行追加 ★★★
    // 外部CDNからのリソース読み込みを許可する設定
    newResponse.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
    // 必須のヘッダーを2つ設定
    newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

    return newResponse;
  },
};
