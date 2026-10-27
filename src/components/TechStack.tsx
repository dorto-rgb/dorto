import { techStack } from '../data/content'
import { TechLogo } from './Icons'
import { Reveal, Section, SectionHeading } from './ui'

export function TechStack() {
  return (
    <Section id="tech" labelledBy="tech-title" className="relative py-20 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="absolute top-1/2 left-1/2 h-[340px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/8 blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Технологии"
              title={
                <>
                  Технологии, которые помогают создавать{' '}
                  <span className="text-gradient-cool">качественные проекты</span>
                </>
              }
              description="Инструменты подбираю под задачу: для лендинга достаточно одного набора, для веб-приложения — другого. Ниже — то, с чем я работаю."
              id="tech-title"
            />
            <Reveal delay={180}>
              <p className="mt-6 max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-[0.8rem] leading-relaxed text-mist/75">
                Набор технологий зависит от целей проекта — не каждый инструмент используется в каждом
                сайте.
              </p>
            </Reveal>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {techStack.map((tech, index) => (
              <Reveal as="li" key={tech.name} delay={index * 45}>
                <div className="group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(168deg,rgba(255,255,255,0.05),rgba(255,255,255,0.008))] px-4 py-3.5 transition-all duration-400 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.06]">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(180px_circle_at_var(--x,20%)_var(--y,50%),rgba(122,155,255,0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-black/35 transition-transform duration-400 group-hover:scale-105">
                    <TechLogo name={tech.logo} className="h-5 w-5" />
                  </span>
                  <span className="relative min-w-0">
                    <span className="block truncate text-[0.9rem] font-semibold text-white">
                      {tech.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[0.73rem] text-mist/75">{tech.role}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
