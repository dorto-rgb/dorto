/**
 * Запускает поведенческие проверки (scripts/behavior.tsx) в jsdom.
 * DOM-глобали выставляются ДО загрузки React-модулей через Vite SSR.
 */
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'

const dom = new JSDOM('<!doctype html><html lang="ru"><body></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
})

const g = globalThis

g.window = dom.window
g.document = dom.window.document
g.navigator = dom.window.navigator
g.HTMLElement = dom.window.HTMLElement
g.HTMLInputElement = dom.window.HTMLInputElement
g.HTMLTextAreaElement = dom.window.HTMLTextAreaElement
g.Element = dom.window.Element
g.Node = dom.window.Node
g.Event = dom.window.Event
g.MouseEvent = dom.window.MouseEvent
g.KeyboardEvent = dom.window.KeyboardEvent
g.CustomEvent = dom.window.CustomEvent
g.getComputedStyle = dom.window.getComputedStyle
g.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window)
g.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window)

/* React 19 ожидает эти флаги для активации DOM-окружения */
g.IS_REACT_ACT_ENVIRONMENT = true

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let code = 0
try {
  await server.ssrLoadModule('/scripts/behavior.tsx')
} catch (error) {
  console.error('Behavior harness crashed:', error)
  code = 1
} finally {
  await server.close()
  dom.window.close()
}

process.exit(code)
