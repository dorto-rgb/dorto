import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useUi'

/* ---------------- Reveal wrapper ---------------- */

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article' | 'header' | 'span'
  className?: string
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${className}`}
      data-visible={visible ? 'true' : 'false'}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
}) {
  const centered = align === 'center'
  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center mx-auto max-w-3xl' : 'items-start max-w-3xl'}`}>
      <Reveal>
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-electric-soft shadow-[0_0_10px_2px_rgba(122,155,255,0.7)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="mt-6 text-[clamp(1.9rem,4.4vw,3.35rem)] tracking-[-0.04em]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={150}>
          <p className={`mt-5 text-[0.98rem] leading-relaxed text-mist sm:text-[1.05rem] ${centered ? 'max-w-2xl' : 'max-w-xl'}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}

/* ---------------- Section shell ---------------- */

export function Section({
  id,
  children,
  className = '',
  labelledBy,
}: {
  id: string
  children: ReactNode
  className?: string
  labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative scroll-mt-28 ${className}`}>
      {children}
    </section>
  )
}

/* ---------------- Buttons ---------------- */

const buttonBase =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.92rem] font-semibold whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-soft disabled:cursor-not-allowed disabled:opacity-55'

export const buttonStyles = {
  primary: `${buttonBase} bg-[linear-gradient(100deg,#4d78ff_0%,#7c5cff_55%,#9d7bff_100%)] px-6 py-3.5 text-white shadow-[0_10px_36px_-12px_rgba(93,108,255,0.85),inset_0_1px_0_rgba(255,255,255,0.32)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-14px_rgba(120,110,255,0.95),inset_0_1px_0_rgba(255,255,255,0.4)] active:translate-y-0`,
  secondary: `${buttonBase} border border-white/12 bg-white/[0.045] px-6 py-3.5 text-fog backdrop-blur-md hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white`,
  ghost: `${buttonBase} border border-white/10 px-5 py-3 text-fog hover:border-white/22 hover:bg-white/[0.06] hover:text-white`,
  small: `${buttonBase} border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[0.82rem] text-fog hover:border-electric-soft/45 hover:bg-electric/10 hover:text-white`,
} as const

/* ---------------- Ambient glow ---------------- */

export function Glow({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[110px] animate-pulse-glow ${className}`}
    />
  )
}
