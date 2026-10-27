import { siteConfig, telegramLabel, telegramUrl, type Contacts } from '../site'
import { LogoMark, TelegramIcon, MailIcon, ArrowIcon } from './Icons'
import { scrollToSection } from '../hooks/useUi'

export function Footer({ contacts }: { contacts: Contacts }) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-14 pb-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-electric/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          <div>
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="group flex items-center gap-2.5"
              aria-label={`${siteConfig.brand} — наверх`}
            >
              <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[8deg]" />
              <span className="font-display text-[1.02rem] font-semibold tracking-[-0.02em] text-white">
                {siteConfig.brand}
              </span>
            </button>
            <p className="mt-4 max-w-xs text-[0.86rem] leading-relaxed text-mist">
              Разработка сайтов и веб-приложений для бизнеса: дизайн, вёрстка, функциональность и
              запуск под ключ.
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="text-[0.64rem] font-semibold tracking-[0.16em] text-mist/50 uppercase">
              Разделы
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href.replace('#', ''))
                    }}
                    className="text-[0.85rem] text-mist transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('pricing')
                  }}
                  className="text-[0.85rem] text-mist transition-colors hover:text-white"
                >
                  Стоимость
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[0.64rem] font-semibold tracking-[0.16em] text-mist/50 uppercase">
              Связаться
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={telegramUrl(contacts.telegram)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2.5 text-[0.85rem] text-mist transition-colors hover:text-white"
                >
                  <TelegramIcon className="h-4 w-4 text-electric-soft/80" />
                  {telegramLabel(contacts.telegram) || 'Telegram'}
                  <ArrowIcon className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className="group inline-flex items-center gap-2.5 text-[0.85rem] text-mist transition-colors hover:text-white"
                >
                  <MailIcon className="h-4 w-4 text-electric-soft/80" />
                  <span className="break-all">{contacts.email}</span>
                  <ArrowIcon className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-[0.82rem] font-semibold text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-soft/40 hover:bg-electric/10 hover:text-white"
            >
              Обсудить проект
              <ArrowIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.76rem] text-mist/55">
            © {year} {siteConfig.brand}. Сайт-портфолио веб-разработчика.
          </p>
          <p className="text-[0.76rem] text-mist/45">
            Проекты в портфолио — демонстрационные концепты.
          </p>
        </div>
      </div>
    </footer>
  )
}
