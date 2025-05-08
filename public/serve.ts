import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  // 代理
  if (url.pathname.startsWith("/api/kv")) {
    return proxy({
      target: "https://xuxin-kv.deno.dev",
      rewrite(pathname) {
        return pathname.replace(/^\/api\/kv/, "");
      },
    })(req);
  }
  // 静态文件
  const response = await serveDir(req, {
    fsRoot: "./",
  });
  // spa 回退文件
  if (response.status == 404) {
    return serveFile(req, "./index.html");
  }
  return response;
});

interface IProxyMiddlewareOption {
  target: string;
  rewrite: (pathname: string) => string;
}

/**
 *
 * @param param0
 * @returns
 */
function proxy({ target, rewrite }: IProxyMiddlewareOption) {
  // 代理函数
  async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const proxyUrl = target + rewrite(url.pathname) + url.search; // 合并路径和查询参数
    // console.log("??proxyUrl",proxyUrl)
    const proxyReq = await fetch(proxyUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? req.body : null,
    });

    const proxyRes = new Response(proxyReq.body, {
      status: proxyReq.status,
      statusText: proxyReq.statusText,
      headers: proxyReq.headers,
    });

    return proxyRes;
  }

  return handler;
}
