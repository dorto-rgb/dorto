/**
 * Поведенческие проверки в jsdom: аккордеон FAQ, фильтры портфолио
 * и состояния формы (валидация → загрузка → успех).
 * Запускается через scripts/behavior.mjs (Vite SSR-загрузка TSX).
 */
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { Faq } from '../src/components/Faq'
import { Portfolio } from '../src/components/Portfolio'
import { Contact } from '../src/components/Contact'
import { defaultContacts } from '../src/site'

const results: { name: string; ok: boolean; detail: string }[] = []

function check(name: string, ok: boolean, detail = '') {
  results.push({ name, ok, detail })
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

let root: Root | null = null
let host: HTMLElement | null = null

async function mount(element: React.ReactElement) {
  host = document.createElement('div')
  document.body.appendChild(host)
  root = createRoot(host)
  await act(async () => {
    root!.render(element)
  })
  return host
}

async function unmount() {
  if (root) {
    const r = root
    await act(async () => {
      r.unmount()
    })
  }
  host?.remove()
  root = null
  host = null
}

async function click(el: Element | null | undefined) {
  if (!el) throw new Error('click target not found')
  await act(async () => {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
  })
}

function text(el: Element | null | undefined) {
  return (el?.textContent ?? '').replace(/\s+/g, ' ').trim()
}

/* ---------------- 1. FAQ accordion ---------------- */

async function testFaq() {
  const container = await mount(<Faq onDiscuss={() => {}} />)

  const triggers = Array.from(container.querySelectorAll<HTMLButtonElement>('button[aria-expanded]'))
  check('FAQ: 8 вопросов в аккордеоне', triggers.length === 8, `найдено ${triggers.length}`)

  const panelState = (btn: HTMLButtonElement) => {
    const id = btn.getAttribute('aria-controls')
    return id ? container.querySelector(`#${id}`)?.getAttribute('data-open') : null
  }

  /* Первый вопрос раскрыт по умолчанию, остальные закрыты */
  const first = triggers[0]
  check(
    'FAQ: первый вопрос раскрыт по умолчанию',
    first.getAttribute('aria-expanded') === 'true' && panelState(first) === 'true',
    `aria-expanded=${first.getAttribute('aria-expanded')}, data-open=${panelState(first)}`,
  )
  check(
    'FAQ: остальные вопросы закрыты по умолчанию',
    triggers.slice(1).every((t) => t.getAttribute('aria-expanded') === 'false'),
  )

  /* Клик закрывает открытый вопрос и синхронно обновляет панель */
  await click(first)
  check(
    'FAQ: клик закрывает ответ',
    first.getAttribute('aria-expanded') === 'false' && panelState(first) === 'false',
  )

  /* Клик снова раскрывает */
  await click(first)
  check(
    'FAQ: повторный клик раскрывает ответ',
    first.getAttribute('aria-expanded') === 'true' && panelState(first) === 'true',
  )

  /* Одновременно открыт только один вопрос */
  await click(triggers[1])
  await click(triggers[2])
  const openCount = triggers.filter((t) => t.getAttribute('aria-expanded') === 'true').length
  check('FAQ: открыт ровно один ответ', openCount === 1, `открыто ${openCount}`)

  /* Кнопка «задать вопрос» вызывает onDiscuss */
  let asked = 0
  await unmount()

  host = document.createElement('div')
  document.body.appendChild(host)
  root = createRoot(host)
  await act(async () => {
    root!.render(<Faq onDiscuss={() => (asked += 1)} />)
  })
  const discuss = Array.from(host.querySelectorAll('button')).find((b) =>
    /задать|вопрос/i.test(text(b)),
  )
  await click(discuss)
  check('FAQ: кнопка вопроса вызывает onDiscuss', asked === 1, `вызовов ${asked}`)

  await unmount()
}

/* ---------------- 2. Portfolio filters ---------------- */

async function testPortfolio() {
  const container = await mount(<Portfolio onDiscuss={() => {}} />)

  const cards = () => container.querySelectorAll('article')
  const all = cards().length
  check('Портфолио: 6 карточек в состоянии «Все»', all === 6, `карточек ${all}`)

  const filters = Array.from(container.querySelectorAll<HTMLButtonElement>('button[aria-pressed]'))
  check('Портфолио: фильтры отрендерены', filters.length >= 2, `кнопок ${filters.length}`)

  /* Нажимаем каждый не-«all» фильтр и сверяем количество карточек */
  for (const filter of filters) {
    const label = text(filter)
    await click(filter)
    const shown = cards().length
    const pressed = filter.getAttribute('aria-pressed') === 'true'
    const highlighted = filter.className.includes('bg-') || filter.className.includes('text-white')
    check(
      `Портфолио: фильтр «${label}» → ${shown} проект(ов)`,
      shown >= 1 && shown <= 6 && pressed && highlighted,
      `показано ${shown}, aria-pressed=${pressed}`,
    )
  }

  /* Возврат к «Все» */
  const allFilter = filters.find((f) => /все/i.test(text(f)))
  await click(allFilter)
  check('Портфолио: возврат к «Все» показывает 6', cards().length === 6, `карточек ${cards().length}`)

  /* Открытие концепта в модальном окне */
  const openBtn = Array.from(container.querySelectorAll('button')).find((b) =>
    /посмотреть проект/i.test(text(b)),
  )
  await click(openBtn)
  const dialog = document.querySelector('[role="dialog"]')
  check('Портфолио: «Посмотреть проект» открывает детали', Boolean(dialog))

  const closeBtn = dialog?.querySelector<HTMLButtonElement>('button[aria-label*="Закрыть"]')
  if (closeBtn) {
    await click(closeBtn)
    check('Портфолио: детали закрываются', !document.querySelector('[role="dialog"]'))
  } else {
    check('Портфолио: у деталей есть кнопка закрытия', false, 'кнопка не найдена')
  }

  const conceptLabel = /концепт/i.test(text(container))
  check('Портфолио: концепты явно помечены', conceptLabel)

  await unmount()
}

/* ---------------- 3. Contact form ---------------- */

async function testContact() {
  const updates: unknown[] = []
  const container = await mount(
    <Contact
      contacts={defaultContacts}
      onUpdateContacts={(next) => updates.push(next)}
      onResetContacts={() => {}}
      prefill={null}
    />,
  )

  const form = container.querySelector('form')
  check('Форма: <form> присутствует', Boolean(form))

  const inputs = Array.from(container.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea'))
  check('Форма: поля имени, контакта и задачи', inputs.length >= 3, `полей ${inputs.length}`)

  /* Отправка пустой формы → ошибки, отправки нет */
  await act(async () => {
    form!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  })
  const alerts = container.querySelectorAll('[role="alert"]')
  check('Форма: пустая отправка даёт ошибки валидации', alerts.length >= 1, `ошибок ${alerts.length}`)
  check('Форма: успех не показан при ошибках', !/заявка сформирована/i.test(text(container)))

  /* Невалидный контакт */
  const setValue = async (el: HTMLInputElement | HTMLTextAreaElement, value: string) => {
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')!.set!
    await act(async () => {
      setter.call(el, value)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }

  const [nameInput, contactInput, projectInput] = inputs
  await setValue(nameInput, 'Иван')
  await setValue(contactInput, 'не-контакт')
  await setValue(projectInput, 'Нужен лендинг для студии')
  await act(async () => {
    form!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  })
  check(
    'Форма: неверный контакт отклоняется',
    /формат|проверьте/i.test(text(container)) && !/заявка сформирована/i.test(text(container)),
  )

  /* Валидные данные → загрузка → успех */
  await setValue(contactInput, '@ivan_dev')
  await act(async () => {
    form!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  })
  const loadingShown = /отправ/i.test(text(container)) && !/заявка сформирована/i.test(text(container))
  check('Форма: показано состояние загрузки', loadingShown, text(container).slice(0, 80))

  await act(async () => {
    await sleep(1400)
  })
  const success = /заявка сформирована/i.test(text(container))
  check('Форма: показано состояние успеха', success)

  const mailLink = Array.from(container.querySelectorAll<HTMLAnchorElement>('a'))
    .map((a) => a.getAttribute('href') ?? '')
    .find((href) => href.startsWith('mailto:') && href.includes('subject='))
  check('Форма: успех даёт mailto со сформированной заявкой', Boolean(mailLink), mailLink ?? 'нет')

  /* Редактирование контактов вызывает onUpdateContacts */
  const editBtn = Array.from(container.querySelectorAll('button')).find((b) =>
    /изменить/i.test(text(b)),
  )
  await ActClick(editBtn)
  const emailField = Array.from(container.querySelectorAll<HTMLInputElement>('input')).find(
    (i) => i.type === 'email' || /mail/i.test(i.name || i.id || i.getAttribute('placeholder') || ''),
  )
  if (emailField) {
    await setValue(emailField, 'new@studio.ru')
    const saveBtn = Array.from(container.querySelectorAll('button')).find((b) => /сохранить/i.test(text(b)))
    await ActClick(saveBtn)
    check('Контакты: изменение e-mail сохраняется', updates.length >= 1, JSON.stringify(updates.at(-1)))
  } else {
    check('Контакты: поле e-mail доступно для редактирования', false)
  }

  const telegramLink = Array.from(container.querySelectorAll<HTMLAnchorElement>('a')).find((a) =>
    (a.getAttribute('href') ?? '').includes('t.me/'),
  )
  check('Контакты: ссылка Telegram корректна', Boolean(telegramLink), telegramLink?.getAttribute('href') ?? 'нет')

  await unmount()
}

async function ActClick(el: Element | null | undefined) {
  await click(el)
}

/* ---------------- runner ---------------- */

try {
  await testFaq()
  await testPortfolio()
  await testContact()
} catch (error) {
  results.push({ name: 'Исключение во время проверок', ok: false, detail: String(error) })
}

let failed = 0
for (const r of results) {
  if (!r.ok) failed += 1
  console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.detail ? ` — ${r.detail}` : ''}`)
}
console.log(`\n${results.length - failed}/${results.length} поведенческих проверок пройдено`)
if (failed) process.exit(1)
