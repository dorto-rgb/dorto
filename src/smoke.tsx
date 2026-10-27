import { renderToString } from 'react-dom/server'
import App from './App'

const html = renderToString(<App />)

/* Проверяем, что все секции реально отрендерились и ключевой контент на месте. */
const required = [
  'Создаю сайты, которые превращают посетителей в клиентов',
  'Веб-разработка • UI/UX • Современные технологии',
  'id="benefits"',
  'id="services"',
  'id="portfolio"',
  'id="process"',
  'id="tech"',
  'id="pricing"',
  'id="faq"',
  'id="contact"',
  'Лендинг',
  'Telegram-бот',
  'Редизайн сайта',
  'NOVA',
  'LUMIÈRE',
  'MONOLITH',
  'VELOCITY',
  'FINORA',
  'AURORA',
  'Старт',
  'Бизнес',
  'Индивидуальный проект',
  'Рассчитать стоимость',
  'Сколько времени занимает разработка сайта?',
  'Оставьте заявку',
  'appjet',
]

const missing = required.filter((needle) => !html.includes(needle))

const tagCount = (name: string) => (html.match(new RegExp(`<${name}[\\s>]`, 'g')) ?? []).length

console.log(`SSR render OK — html length: ${html.length}`)
console.log(`sections: ${tagCount('section')}, h2: ${tagCount('h2')}, buttons: ${tagCount('button')}`)

if (missing.length) {
  console.log(`MISSING (${missing.length}): ${missing.join(' | ')}`)
  process.exit(1)
}

console.log('All required content present.')
