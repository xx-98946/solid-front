import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const url = new URL(req.url);

    if (url.pathname.startsWith("/api/kv")) {
        return proxyRequest(req);
    }
    const response = await serveDir(req, {
        fsRoot: "./",
    });
    if (response.status == 404) {
        return serveFile(req, "./index.html")
    }
    return response;
});


// 代理函数
async function proxyRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  
  // 配置代理目标地址
  const target = 'https://xuxin-kv.deno.dev'; // 后端 API 地址
  
  const proxyUrl = target + url.pathname.replace(/^\/api\/kv/, "") + url.search; // 合并路径和查询参数
  // console.log("??proxyUrl",proxyUrl)
  const proxyReq = await fetch(proxyUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' ? req.body : null,
  });

  const proxyRes = new Response(proxyReq.body, {
    status: proxyReq.status,
    statusText: proxyReq.statusText,
    headers: proxyReq.headers,
  });

  return proxyRes;
}
