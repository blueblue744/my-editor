export default {
  async fetch(request, env) {
    // リクエストされたURLを解析
    const url = new URL(request.url);

    try {
      // まず、リクエストがプロジェクト内のファイル（アセット）に対するものか試す
      const response = await env.ASSETS.fetch(request);

      // 成功した場合（＝自分のファイルだった場合）、ヘッダーを追加して返す
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      return newResponse;

    } catch (e) {
      // env.ASSETS.fetchがエラーになった場合、それはプロジェクト内にないファイル、
      // つまり外部へのリクエスト（CDNなど）を意味する。
      // その場合は、Cloudflareを介さず、インターネットへ直接取得しに行く。
      console.log(`Fetching external resource: ${url.href}`);
      return fetch(request);
    }
  }
};
