import { useId, useState } from 'react'
import { faq } from '../data/content'
import { PlusIcon } from './Icons'
import { Reveal, Section, SectionHeading, buttonStyles } from './ui'

export function Faq({ onDiscuss }: { onDiscuss: (subject: string) => void }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <Section id="faq" labelledBy="faq-title" className="relative py-20 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="absolute top-1/2 -left-32 h-[360px] w-[360px] rounded-full bg-violet/9 blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Часто задаваемые <span className="text-gradient-cool">вопросы</span>
                </>
              }
              description="Собрал то, о чём спрашивают чаще всего. Если вашего вопроса здесь нет — напишите, отвечу лично."
              id="faq-title"
            />
            <Reveal delay={180}>
              <button
                type="button"
                onClick={() => onDiscuss('У меня есть вопрос по разработке сайта')}
                className={`${buttonStyles.secondary} mt-7 w-full py-3 text-[0.87rem] sm:w-auto sm:px-6`}
              >
                Задать свой вопрос
              </button>
            </Reveal>
          </div>

          <ul className="flex flex-col gap-2.5">
            {faq.map((item, index) => {
              const isOpen = open === index
              const panelId = `${baseId}-panel-${index}`
              const buttonId = `${baseId}-button-${index}`

              return (
                <Reveal as="li" key={item.q} delay={index * 45}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors duration-400 ${
                      isOpen
                        ? 'border-electric-soft/28 bg-[linear-gradient(172deg,rgba(61,107,255,0.1),rgba(255,255,255,0.015))]'
                        : 'border-white/[0.075] bg-white/[0.022] hover:border-white/16 hover:bg-white/[0.04]'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : index)}
                        className="flex w-full items-start justify-between gap-4 px-5 py-4.5 text-left sm:px-6 sm:py-5"
                      >
                        <span className="flex items-start gap-3.5">
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 font-display text-[0.66rem] tabular-nums transition-colors duration-300 ${
                              isOpen ? 'text-electric-soft' : 'text-mist/45'
                            }`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`text-[0.94rem] leading-snug font-semibold transition-colors duration-300 sm:text-[1rem] ${
                              isOpen ? 'text-white' : 'text-fog'
                            }`}
                          >
                            {item.q}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                            isOpen
                              ? 'rotate-45 border-electric-soft/45 bg-electric/20 text-white'
                              : 'border-white/12 bg-white/[0.04] text-mist'
                          }`}
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="acc-panel"
                      data-open={isOpen ? 'true' : 'false'}
                    >
                      <div>
                        <p className="pr-6 pb-5 pl-5 text-[0.855rem] leading-relaxed text-mist sm:pl-6">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
