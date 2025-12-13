export default {
  async fetch(request, env) {
    // まず、通常のファイル（index.htmlなど）を取得
    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);

    // WebContainersに必要なヘッダー
    newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

    // CDNからのライブラリ読み込みを特別に許可するヘッダー
    // 注意: この設定はセキュリティを少し緩めますが、この構成では必須です。
    const csp = [
      "default-src 'self'",
      // 必要なCDNドメインをここに追加
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com",
      // WebContainersが内部で通信するドメインを許可
      "frame-src 'self' https://*.stackblitz.io",
      "connect-src 'self' https://*.stackblitz.io wss://*.stackblitz.io",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; ');
    newResponse.headers.set('Content-Security-Policy', csp);

    return newResponse;
  },
};
