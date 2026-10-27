export type Contacts = {
  telegram: string
  email: string
}

/**
 * Контакты по умолчанию.
 * Их можно изменить прямо на сайте (кнопка «Изменить» в блоке контактов) —
 * значения сохраняются в localStorage, либо заменить здесь в коде.
 */
export const defaultContacts: Contacts = {
  telegram: '@appjet_dev',
  email: 'hello@appjet.dev',
}

export const siteConfig = {
  brand: 'appjet',
  tagline: 'Веб-разработка • UI/UX • Современные технологии',
  nav: [
    { label: 'Главная', href: '#home' },
    { label: 'Услуги', href: '#services' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Этапы работы', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Контакты', href: '#contact' },
  ],
} as const

export function telegramUrl(handle: string) {
  const clean = handle.trim().replace(/^https?:\/\/(t\.me|telegram\.me)\//i, '').replace(/^@/, '')
  return clean ? `https://t.me/${clean}` : ''
}

export function telegramLabel(handle: string) {
  const clean = handle.trim().replace(/^https?:\/\/(t\.me|telegram\.me)\//i, '')
  if (!clean) return ''
  return clean.startsWith('@') ? clean : `@${clean}`
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim())
}
