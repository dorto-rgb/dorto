import { siteConfig } from '../site'
import { scrollToSection } from '../hooks/useUi'
import { ArrowIcon, ArrowUpRight, SparkArrow } from './HeroIcons'
import { HeroScene } from './HeroScene'

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-28"
    >
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-70" />
        <div className="aurora absolute inset-x-0 top-[-18%] h-[70vh] opacity-90" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void via-void/80 to-transparent" />
        <div className="noise-layer absolute inset-0" />
      </div>

      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-8">
        {/* ---------- copy ---------- */}
        <div className="relative z-10 max-w-2xl">
          <div className="reveal" data-visible="true" style={{ ['--reveal-delay' as string]: '60ms' }}>
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-soft opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-soft" />
              </span>
              Открыт к новым проектам
            </span>
          </div>

          <h1
            id="hero-title"
            className="reveal mt-7 text-[clamp(2.25rem,5.9vw,4.35rem)] leading-[1.03] tracking-[-0.045em]"
            data-visible="true"
            style={{ ['--reveal-delay' as string]: '120ms' }}
          >
            Создаю сайты,{' '}
            <span className="relative inline-block">
              <span className="text-gradient">которые превращают</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-electric/60 sm:-bottom-1.5"
              >
                <path d="M2 8.5C60 3.5 130 2.5 298 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            посетителей в клиентов
          </h1>

          <p
            className="reveal mt-7 max-w-xl text-[1rem] leading-[1.65] text-mist sm:text-[1.09rem]"
            data-visible="true"
            style={{ ['--reveal-delay' as string]: '210ms' }}
          >
            Разрабатываю современные сайты и веб-приложения для бизнеса. Продуманный дизайн, удобный интерфейс
            и функциональность, которая помогает вашему проекту расти.
          </p>

          <div
            className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            data-visible="true"
            style={{ ['--reveal-delay' as string]: '300ms' }}
          >
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('portfolio')
              }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(100deg,#4d78ff_0%,#7c5cff_58%,#9d7bff_100%)] px-7 py-4 text-[0.95rem] font-semibold text-white shadow-[0_14px_44px_-14px_rgba(93,108,255,0.95),inset_0_1px_0_rgba(255,255,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-16px_rgba(120,110,255,1),inset_0_1px_0_rgba(255,255,255,0.42)]"
            >
              Посмотреть проекты
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/14 bg-white/[0.05] px-7 py-4 text-[0.95rem] font-semibold text-fog backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.09] hover:text-white"
            >
              Обсудить мой проект
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] font-semibold tracking-[0.2em] text-mist/70 uppercase sm:text-[0.73rem]"
            data-visible="true"
            style={{ ['--reveal-delay' as string]: '390ms' }}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-electric-soft/70" aria-hidden="true" />
            <span>{siteConfig.tagline.split('•').map((part, i, arr) => (
              <span key={part}>
                {part.trim()}
                {i < arr.length - 1 ? <span className="mx-2 text-electric-soft/60">•</span> : null}
              </span>
            ))}</span>
          </div>
        </div>

        {/* ---------- 3D scene ---------- */}
        <div className="relative z-0 -mx-4 sm:mx-0">
          <HeroScene />
        </div>
      </div>

      <div className="mx-auto mt-4 w-full max-w-[1240px] px-5 sm:px-8 lg:mt-10">
        <div className="hairline" aria-hidden="true" />
      </div>
    </section>
  )
}
