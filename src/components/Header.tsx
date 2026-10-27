import { useEffect, useState } from 'react'
import { siteConfig } from '../site'
import { LogoMark, MenuIcon, CloseIcon, ArrowIcon } from './Icons'
import { useBodyLock, useScrollSpy, useScrolled, scrollToSection } from '../hooks/useUi'

const sectionIds = ['home', 'services', 'portfolio', 'process', 'faq', 'contact']

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(20)
  const active = useScrollSpy(sectionIds)

  useBodyLock(open)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (href: string) => {
    const id = href.replace('#', '')
    setOpen(false)
    // allow the mobile menu to close before scrolling
    window.setTimeout(() => scrollToSection(id), 10)
  }

  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:bg-electric focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Перейти к содержимому
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-void/72 backdrop-blur-xl py-2.5'
            : 'border-b border-transparent py-4'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              go('#home')
            }}
            className="group flex items-center gap-2.5 rounded-full transition-opacity hover:opacity-90"
            aria-label={`${siteConfig.brand} — на главную`}
          >
            <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[8deg]" />
            <span className="font-display text-[1.02rem] font-semibold tracking-[-0.02em] text-white">
              {siteConfig.brand}
            </span>
          </a>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => {
                const isActive = active === item.href.replace('#', '')
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        go(item.href)
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-[0.85rem] font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-mist hover:text-white'
                      }`}
                    >
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                        />
                      ) : null}
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                go('#contact')
              }}
              className="group hidden items-center gap-2 rounded-full bg-[linear-gradient(100deg,#4d78ff,#7c5cff_60%,#9d7bff)] px-5 py-2.5 text-[0.85rem] font-semibold text-white shadow-[0_8px_28px_-10px_rgba(93,108,255,0.9),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-12px_rgba(120,110,255,1)] sm:inline-flex"
            >
              Обсудить проект
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-fog transition-colors hover:border-white/25 hover:text-white lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[99] lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-void/80 backdrop-blur-md transition-opacity duration-400 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          aria-label="Мобильная навигация"
          className={`absolute inset-x-3 top-[4.6rem] origin-top rounded-[1.6rem] border border-white/10 bg-[#080b13]/97 p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] transition-all duration-400 ${
            open ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-3 scale-[0.98] opacity-0'
          }`}
        >
          <ul className="flex flex-col">
            {siteConfig.nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.href)
                  }}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[1.02rem] font-medium text-fog transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-display text-[0.66rem] text-electric-soft/60">
                      0{i + 1}
                    </span>
                    {item.label}
                  </span>
                  <ArrowIcon className="h-4 w-4 text-mist/50" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              go('#contact')
            }}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(100deg,#4d78ff,#7c5cff_60%,#9d7bff)] px-5 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(93,108,255,1)]"
          >
            Обсудить проект
            <ArrowIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </>
  )
}
