import { plans } from '../data/content'
import { CheckIcon, ArrowIcon } from './Icons'
import { Reveal, Section, SectionHeading } from './ui'

export function Pricing({ onCalculate }: { onCalculate: (request: string) => void }) {
  return (
    <Section id="pricing" labelledBy="pricing-title" className="relative py-20 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="absolute top-1/3 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-electric/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Стоимость"
          title={
            <>
              Выберите <span className="text-gradient-cool">формат вашего проекта</span>
            </>
          }
          description="Стоимость зависит от сложности проекта, количества страниц и необходимого функционала. Ниже — три формата сотрудничества, чтобы было проще сориентироваться."
          align="center"
          id="pricing-title"
        />

        <ul className="mt-14 grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {plans.map((plan, index) => (
            <Reveal as="li" key={plan.title} delay={index * 100} className="relative">
              <article
                className={`relative flex h-full flex-col rounded-[1.5rem] p-6 transition-all duration-500 sm:p-7 ${
                  plan.highlighted
                    ? 'border border-electric-soft/35 bg-[linear-gradient(172deg,rgba(61,107,255,0.16),rgba(139,92,246,0.07)_46%,rgba(9,11,19,0.9))] shadow-[0_40px_100px_-50px_rgba(80,110,255,0.95),inset_0_1px_0_rgba(255,255,255,0.14)] lg:-my-3 lg:py-10'
                    : 'border border-white/[0.075] bg-[linear-gradient(172deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008))] hover:border-white/16'
                }`}
              >
                {plan.highlighted ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(100deg,#4d78ff,#8b5cf6)] px-3.5 py-1.5 text-[0.62rem] font-bold tracking-[0.14em] text-white uppercase shadow-[0_8px_22px_-8px_rgba(93,108,255,1)]">
                    Чаще всего выбирают
                  </span>
                ) : null}

                <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.025em] text-white">
                  {plan.title}
                </h3>
                <p className="mt-2.5 text-[0.845rem] leading-relaxed text-mist">{plan.subtitle}</p>

                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-3.5">
                  <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-mist/55 uppercase">
                    Стоимость
                  </p>
                  <p className="mt-1.5 text-[0.92rem] leading-snug font-semibold text-fog">
                    Рассчитывается индивидуально
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-mist/65">
                    зависит от сложности, объёма страниц и функционала
                  </p>
                </div>

                <p className="mt-5 text-[0.8rem] leading-relaxed text-mist/70">{plan.forWhom}</p>

                <ul className="mt-5 flex-1 space-y-2.5 border-t border-white/[0.07] pt-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.845rem] leading-snug text-fog/88">
                      <CheckIcon
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                          plan.highlighted ? 'text-electric-soft' : 'text-electric-soft/70'
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onCalculate(plan.request)}
                  className={`group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.89rem] font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-[linear-gradient(100deg,#4d78ff_0%,#7c5cff_55%,#9d7bff_100%)] text-white shadow-[0_12px_36px_-12px_rgba(93,108,255,0.95),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_20px_54px_-14px_rgba(120,110,255,1)]'
                      : 'border border-white/12 bg-white/[0.045] text-fog hover:-translate-y-0.5 hover:border-electric-soft/40 hover:bg-electric/10 hover:text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.82rem] leading-relaxed text-mist/65">
            Точную стоимость и сроки называю после обсуждения задачи. Фиксированный прайс здесь не указан
            намеренно — два похожих по описанию проекта могут требовать разного объёма работы.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
