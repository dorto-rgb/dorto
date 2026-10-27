import { services } from '../data/content'
import { Icon, CheckIcon, ArrowIcon } from './Icons'
import { Reveal, Section, SectionHeading, buttonStyles } from './ui'
import { useSpotlight } from '../hooks/useUi'

export function Services({ onOrder }: { onOrder: (serviceTitle: string) => void }) {
  return (
    <Section id="services" labelledBy="services-title" className="relative py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
      />
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Услуги"
          title={
            <>
              Что я могу разработать <span className="text-gradient-cool">для вашего бизнеса</span>
            </>
          }
          description="От одностраничного лендинга до веб-приложения с личным кабинетом. Выберите формат — обсудим задачу и подберём решение."
          id="services-title"
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} onOrder={onOrder} />
          ))}
        </ul>
      </div>
    </Section>
  )
}

function ServiceCard({
  service,
  index,
  onOrder,
}: {
  service: (typeof services)[number]
  index: number
  onOrder: (serviceTitle: string) => void
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLLIElement>()

  return (
    <Reveal as="li" delay={index * 60}>
      <article
        ref={ref}
        onPointerMove={onPointerMove}
        className="tile spotlight group flex h-full flex-col overflow-hidden p-6 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(122,155,255,0.2),rgba(139,92,246,0.07))] text-electric-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-500 group-hover:scale-[1.04] group-hover:border-electric-soft/40 group-hover:text-white">
            <Icon name={service.icon} className="h-[22px] w-[22px]" />
          </span>
          <span className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.09em] text-mist/80 uppercase">
            {service.tag}
          </span>
        </div>

        <h3 className="mt-6 font-display text-[1.3rem] leading-tight tracking-[-0.025em] text-white">
          {service.title}
        </h3>
        <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mist">{service.text}</p>

        <div className="mt-6 flex-1">
          <p className="text-[0.66rem] font-semibold tracking-[0.16em] text-mist/50 uppercase">Включает</p>
          <ul className="mt-3 space-y-2">
            {service.includes.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-[0.82rem] leading-snug text-fog/85">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-soft/80" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => onOrder(service.title)}
          className={`${buttonStyles.secondary} mt-7 w-full py-3 text-[0.86rem] group-hover:border-electric-soft/40 group-hover:bg-electric/10`}
        >
          Заказать
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </article>
    </Reveal>
  )
}
