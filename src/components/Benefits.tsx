import { benefits } from '../data/content'
import { Icon } from './Icons'
import { Reveal, Section, SectionHeading } from './ui'
import { useSpotlight } from '../hooks/useUi'

export function Benefits() {
  return (
    <Section id="benefits" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Преимущества"
            title={
              <>
                Почему <span className="text-gradient-cool">выбирают меня</span>
              </>
            }
            description="Не просто красивый сайт, а продуманный инструмент для бизнеса — от структуры и дизайна до запуска и передачи проекта."
            id="benefits-title"
          />
          <Reveal delay={180} className="lg:pb-2">
            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4">
              <div className="font-display text-[1.6rem] leading-none text-gradient-cool">6</div>
              <p className="max-w-[9rem] text-[0.78rem] leading-snug text-mist">
                принципов, на которых строится каждый проект
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <BenefitCard key={item.title} item={item} index={index} />
          ))}
        </ul>
      </div>
    </Section>
  )
}

function BenefitCard({ item, index }: { item: (typeof benefits)[number]; index: number }) {
  const { ref, onPointerMove } = useSpotlight<HTMLLIElement>()

  return (
    <Reveal as="li" delay={index * 70}>
      <article
        ref={ref}
        onPointerMove={onPointerMove}
        className="tile spotlight group relative h-full overflow-hidden p-6 sm:p-7"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${item.accent} opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
        />

        <div className="relative flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(122,155,255,0.22),rgba(139,92,246,0.08))] text-electric-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-500 group-hover:border-electric-soft/40 group-hover:text-white group-hover:shadow-[0_0_28px_-6px_rgba(122,155,255,0.65),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <Icon name={item.icon} className="h-[22px] w-[22px]" />
          </span>
          <span className="font-display text-[0.68rem] font-medium tracking-[0.16em] text-mist/35">
            0{index + 1}
          </span>
        </div>

        <h3 className="relative mt-6 text-[1.14rem] leading-snug tracking-[-0.02em]">{item.title}</h3>
        <p className="relative mt-3 text-[0.88rem] leading-relaxed text-mist">{item.text}</p>

        <div
          aria-hidden="true"
          className="relative mt-6 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-electric-soft/60 via-violet/40 to-transparent transition-transform duration-500 group-hover:scale-x-100"
        />
      </article>
    </Reveal>
  )
}
