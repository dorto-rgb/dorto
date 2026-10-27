import { steps } from '../data/content'
import { ArrowIcon } from './Icons'
import { Reveal, Section, SectionHeading, buttonStyles } from './ui'

export function Process({ onDiscuss }: { onDiscuss: (subject: string) => void }) {
  return (
    <Section id="process" labelledBy="process-title" className="relative py-20 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="absolute top-20 left-1/2 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-electric/7 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Этапы работы"
          title={
            <>
              От идеи до готового сайта — <span className="text-gradient-cool">4 простых этапа</span>
            </>
          }
          description="Прозрачный процесс без сюрпризов: вы всегда понимаете, на каком этапе находится проект и что будет дальше."
          align="center"
          id="process-title"
        />

        <ol className="relative mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {/* connector */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[4.6rem] right-0 left-0 hidden h-px lg:block"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(122,155,255,0.38) 8%, rgba(139,92,246,0.38) 92%, transparent)',
            }}
          />

          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 110} className="relative">
              <div className="group relative flex h-full flex-col rounded-[1.4rem] border border-white/[0.07] bg-[linear-gradient(172deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008))] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-electric-soft/30 hover:bg-white/[0.05]">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 bg-void/80 font-display text-[0.9rem] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors duration-500 group-hover:border-electric-soft/50">
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_20%,rgba(122,155,255,0.28),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative">{step.number}</span>
                  </span criança className="hidden" />
                  <span className="h-px flex-1 bg-gradient-to-r from-white/14 to-transparent" aria-hidden="true" />
                </div>

                <h3 className="mt-6 font-display text-[1.12rem] leading-tight tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.86rem] leading-relaxed text-mist">{step.text}</p>
                <p className="mt-4 border-t border-white/[0.07] pt-4 text-[0.78rem] leading-relaxed text-mist/65">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[1.3rem] border border-white/[0.07] bg-white/[0.025] px-5 py-4 sm:flex-row sm:px-6">
            <p className="text-center text-[0.86rem] text-mist sm:text-left">
              <span className="font-semibold text-fog">Сроки и объём</span> фиксируем до старта работ —
              вы заранее знаете план.
            </p>
            <button
              type="button"
              onClick={() => onDiscuss('Хочу узнать сроки и план работ по проекту')}
              className={`${buttonStyles.secondary} w-full shrink-0 py-2.5 text-[0.85rem] sm:w-auto`}
            >
              Обсудить этапы
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
