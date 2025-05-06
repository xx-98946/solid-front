import { fileURLToPath } from 'node:url'
import { createServer } from 'npm:vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const server = await createServer({
  // any valid user config options, plus `mode` and `configFile`
  configFile: false,
  root: __dirname,
  server: {
    port: 1337,
    proxy: {
      "/api/kv": {
        target: "https://xuxin-kv.deno.dev/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kv/, ""),
      },
      // "/api": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      // },
    },
  },
})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })