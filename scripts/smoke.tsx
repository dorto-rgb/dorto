import { renderToString } from 'react-dom/server'
import App from '../src/App'

const html = renderToString(<App />)

/** Текст без тегов, чтобы проверять контент, разбитый React на несколько узлов. */
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'")
  .replace(/\s+/g, ' ')
  .trim()

const requiredText = [
  'Создаю сайты, которые превращают посетителей в клиентов',
  'Разрабатываю современные сайты и веб-приложения для бизнеса',
  'Посмотреть проекты',
  'Обсудить мой проект',
  'Веб-разработка • UI/UX • Современные технологии',
  'Почему выбирают меня',
  'Что я могу разработать для вашего бизнеса',
  'Проекты, которые говорят сами за себя',
  'От идеи до готового сайта — 4 простых этапа',
  'Технологии, которые помогают создавать качественные проекты',
  'Выберите формат вашего проекта',
  'Стоимость зависит от сложности проекта, количества страниц и необходимого функционала',
  'Рассчитать стоимость',
  'Часто задаваемые вопросы',
  'Есть идея? Давайте превратим её в работающий продукт',
  'Расскажите о своей задаче — вместе найдём лучшее решение для вашего проекта',
  'Индивидуальный подход',
  'Фокус на результате',
  'Лендинг',
  'Корпоративный сайт',
  'Интернет-магазин',
  'Веб-приложение',
  'Telegram-бот',
  'Редизайн сайта',
  'NOVA',
  'LUMIÈRE',
  'MONOLITH',
  'VELOCITY',
  'FINORA',
  'AURORA',
  'HTML',
  'TypeScript',
  'Next.js',
  'Supabase',
  'GitHub',
  'Старт',
  'Бизнес',
  'Индивидуальный проект',
  'Сколько времени занимает разработка сайта?',
  'Можно ли заказать сайт с индивидуальным дизайном?',
  'Будет ли сайт работать на телефонах?',
  'Можно ли добавить новые функции после запуска?',
  'Предоставляется ли помощь после завершения проекта?',
  'Как формируется стоимость разработки?',
  'Можно ли заказать Telegram-бота?',
  'Как происходит передача готового проекта?',
  'Обсуждение',
  'Дизайн и структура',
  'Разработка',
  'Проверка и запуск',
]

const requiredMarkup = [
  'id="home"',
  'id="benefits"',
  'id="services"',
  'id="portfolio"',
  'id="process"',
  'id="tech"',
  'id="pricing"',
  'id="faq"',
  'id="contact"',
  '<main',
  '<header',
  '<footer',
  '<h1',
  'aria-expanded',
  'type="submit"',
]

const missingText = requiredText.filter((needle) => !text.includes(needle))
const missingMarkup = requiredMarkup.filter((needle) => !html.includes(needle))

const count = (name: string) => (html.match(new RegExp(`<${name}[\\s>]`, 'g')) ?? []).length

/* Никакого Lorem Ipsum и вымышленных соцдоказательств (проверяем только текст, не SVG-пути). */
const banned = ['Lorem ipsum', 'lorem ipsum', '★★★★★', 'Отзывы клиентов', '5.0/5', 'рейтинг']
const foundBanned = banned.filter((needle) => text.toLowerCase().includes(needle.toLowerCase()))
const fabricatedSocialProof = /\b\d+\s*(отзыв|клиент|проект[аов]?\s+сдан)/i.test(text)

/* Все ссылки-якоря должны указывать на существующие секции. */
const anchors = [...html.matchAll(/href="#([\w-]+)"/g)].map((m) => m[1])
const deadAnchors = [...new Set(anchors)].filter((id) => !html.includes(`id="${id}"`))

/* Кнопки без обработчиков (пустые onClick) не проверим в строке, но проверим наличие текста. */
const emptyButtons = (html.match(/<button[^>]*>\s*<\/button>/g) ?? []).length

console.log(`SSR render OK — html: ${html.length} B, text: ${text.length} B`)
console.log(
  `sections: ${count('section')}, h1: ${count('h1')}, h2: ${count('h2')}, h3: ${count('h3')}, buttons: ${count('button')}, inputs: ${count('input')}, links: ${count('a')}`,
)
console.log(`anchors: ${[...new Set(anchors)].sort().join(', ')}`)

const problems: string[] = []
if (missingText.length) problems.push(`missing text: ${missingText.join(' | ')}`)
if (missingMarkup.length) problems.push(`missing markup: ${missingMarkup.join(' | ')}`)
if (foundBanned.length) problems.push(`banned content: ${foundBanned.join(' | ')}`)
if (deadAnchors.length) problems.push(`dead anchors: ${deadAnchors.join(' | ')}`)
if (emptyButtons) problems.push(`empty buttons: ${emptyButtons}`)

if (problems.length) {
  console.log('FAIL')
  problems.forEach((p) => console.log(` - ${p}`))
  process.exit(1)
}

console.log(`PASS — ${requiredText.length} текстов, ${requiredMarkup.length} разметочных проверок, 0 мёртвых якорей`)
