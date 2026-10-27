import { useEffect, useMemo, useRef, useState } from 'react'
import { projects, projectFilters, type Project } from '../data/content'
import { ProjectPreview } from './ProjectPreview'
import { ArrowUpRight, CheckIcon, CloseIcon } from './Icons'
import { Reveal, Section, SectionHeading, buttonStyles } from './ui'
import { useBodyLock, useSpotlight } from '../hooks/useUi'

export function Portfolio({ onDiscuss }: { onDiscuss: (subject: string) => void }) {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]['id']>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const active = projects.find((p) => p.id === openId) ?? null

  return (
    <Section id="portfolio" labelledBy="portfolio-title" className="relative py-20 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-[420px] w-[420px] rounded-full bg-electric/12 blur-[130px]" />
        <div className="absolute right-0 bottom-1/4 h-[380px] w-[380px] rounded-full bg-violet/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Портфолио"
            title={
              <>
                Проекты, которые <span className="text-gradient-cool">говорят сами за себя</span>
              </>
            }
            description="Шесть концептов, созданных для демонстрации подхода к дизайну и разработке: типографика, структура, превью интерфейсов и логика взаимодействия."
            id="portfolio-title"
          />
          <Reveal delay={120}>
            <p className="max-w-xs rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.78rem] leading-relaxed text-mist/80 lg:text-right">
              <span className="font-semibold text-fog">Важно:</span> все проекты — демонстрационные
              концепты. Это не реальные заказы клиентов.
            </p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={60}>
          <div
            role="tablist"
            aria-label="Фильтр проектов по категории"
            className="mt-12 flex flex-wrap gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2 backdrop-blur-md sm:inline-flex"
          >
            {projectFilters.map((item) => {
              const isActive = filter === item.id
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setFilter(item.id)}
                  className={`rounded-xl px-4 py-2.5 text-[0.82rem] font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-[linear-gradient(100deg,#4d78ff,#8b5cf6)] text-white shadow-[0_8px_24px_-10px_rgba(93,108,255,0.9),inset_0_1px_0_rgba(255,255,255,0.28)]'
                      : 'text-mist hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* grid */}
        <ul className="mt-8 grid gap-5 lg:grid-cols-2">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </ul>

        <Reveal>
          <p className="mt-8 text-center text-[0.8rem] text-mist/60">
            {visible.length === 1
              ? 'Показан 1 концепт'
              : `Показано ${visible.length} ${visible.length < 5 ? 'концепта' : 'концептов'}`}{' '}
            · {projects.length} в коллекции
          </p>
        </Reveal>
      </div>

      <ProjectDialog project={active} onClose={() => setOpenId(null)} onDiscuss={onDiscuss} />
    </Section>
  )
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLLIElement>()

  return (
    <Reveal as="li" delay={index * 70}>
      <article
        ref={ref}
        onPointerMove={onPointerMove}
        className="tile spotlight group flex h-full flex-col overflow-hidden p-3.5 sm:p-4"
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Посмотреть концепт ${project.name}`}
          className="relative block w-full cursor-pointer rounded-[1.15rem] text-left"
        >
          <ProjectPreview project={project} />
          <span className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-fog/90 uppercase backdrop-blur-md">
            Концепт
          </span>
        </button>

        <div className="flex flex-1 flex-col px-1.5 pt-5 pb-1.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-[1.35rem] leading-none tracking-[-0.03em] text-white">
                {project.name}
              </h3>
              <p className="mt-2 text-[0.72rem] font-semibold tracking-[0.13em] text-mist/60 uppercase">
                {project.categoryLabel}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="mt-0.5 h-2 w-2 shrink-0 rounded-full shadow-[0_0_12px_2px_currentColor]"
              style={{ color: project.accent, backgroundColor: project.accent }}
            />
          </div>

          <p className="mt-4 text-[0.875rem] leading-relaxed text-mist">{project.summary}</p>

          <ul className="mt-5 flex flex-1 flex-wrap gap-1.5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[0.7rem] text-fog/75"
              >
                {feature}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpen}
            className={`${buttonStyles.secondary} mt-6 w-full py-3 text-[0.86rem] group-hover:border-electric-soft/40 group-hover:bg-electric/10`}
          >
            Посмотреть проект
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </article>
    </Reveal>
  )
}

/* ---------------- detail dialog ---------------- */

function ProjectDialog({
  project,
  onClose,
  onDiscuss,
}: {
  project: Project | null
  onClose: () => void
  onDiscuss: (subject: string) => void
}) {
  const open = Boolean(project)
  useBodyLock(open)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [open, onClose])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/80 p-4 backdrop-blur-md sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="relative my-auto w-full max-w-3xl rounded-[1.6rem] border border-white/12 bg-[linear-gradient(168deg,#0d1018,#080a11)] p-4 shadow-[0_60px_140px_-50px_rgba(0,0,0,1)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 pb-4">
          <div>
            <span className="text-[0.66rem] font-semibold tracking-[0.16em] text-electric-soft uppercase">
              Демонстрационный концепт
            </span>
            <h3
              id="project-dialog-title"
              className="mt-2 font-display text-[1.6rem] leading-none tracking-[-0.03em] text-white sm:text-[1.9rem]"
            >
              {project.name}
            </h3>
            <p className="mt-2 text-[0.8rem] text-mist">{project.categoryLabel}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-fog transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <ProjectPreview project={project} />

        <div className="mt-5 grid gap-5 sm:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-mist/55 uppercase">
              О проекте
            </p>
            <p className="mt-2.5 text-[0.9rem] leading-relaxed text-fog/85">{project.summary}</p>
            <p className="mt-3 text-[0.8rem] leading-relaxed text-mist/70">
              Формат: {project.kind}. Концепт создан для показа подхода к структуре, типографике и
              визуальной подаче — без привязки к реальному клиенту.
            </p>
          </div>
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-mist/55 uppercase">
              Реализованные блоки
            </p>
            <ul className="mt-2.5 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[0.85rem] text-fog/85">
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-soft/80" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.08] pt-5 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              onDiscuss(`Хочу сайт в стиле концепта ${project.name}`)
              onClose()
            }}
            className={`${buttonStyles.primary} w-full py-3 text-[0.88rem] sm:w-auto sm:px-6`}
          >
            Заказать похожий проект
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`${buttonStyles.ghost} w-full py-3 text-[0.88rem] sm:w-auto`}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
