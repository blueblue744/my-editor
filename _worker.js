export default {
  async fetch(request, env) {
    // まず、通常のファイル（index.htmlなど）を取得
    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);

    // WebContainersに必要なヘッダー
    newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

    // Content Security Policy (CSP) を設定
    // これで、信頼できるCDNからのスクリプト読み込みを許可します
    const csp = [
      "default-src 'self'",
      // 必要なCDNドメインをここに追加
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com",
      // WebContainersが内部で通信するドメインを許可
      "frame-src 'self' https://*.stackblitz.io",
      "connect-src 'self' https://*.stackblitz.io wss://*.stackblitz.io",
      "object-src 'none'",
      "base-uri 'self'",
      "img-src 'self' data:", // アイコン用のdata: URIを許可
    ].join('; ');
    newResponse.headers.set('Content-Security-Policy', csp);

    return newResponse;
  },
};
