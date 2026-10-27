/**
 * Временный smoke-тест: рендерит App в строку через SSR,
 * чтобы поймать runtime-ошибки и проверить наличие ключевого контента.
 */
import { createServer } from 'vite'

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  await server.ssrLoadModule('/scripts/smoke.tsx')
} finally {
  await server.close()
}
