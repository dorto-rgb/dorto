import { useRef, type PointerEvent } from 'react'

/**
 * Композиция из плавающих интерфейсов.
 * Лёгкий параллакс от курсора, но на тач-устройствах и при reduced-motion
 * остаётся статичной, чтобы не мешать чтению.
 */
export function HeroScene() {
  const sceneRef = useRef<HTMLDivElement | null>(null)

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = sceneRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tilt-y', `${x * 9}deg`)
    el.style.setProperty('--tilt-x', `${-y * 7}deg`)
  }

  const onPointerLeave = () => {
    const el = sceneRef.current
    if (!el) return
    el.style.setProperty('--tilt-y', '0deg')
    el.style.setProperty('--tilt-x', '0deg')
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[620px] select-none"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      {/* glow behind the composition */}
      <div className="pointer-events-none absolute inset-x-4 top-8 bottom-12 -z-10 rounded-[50%] bg-[radial-gradient(circle_at_50%_45%,rgba(93,108,255,0.4),rgba(139,92,246,0.22)_42%,transparent_72%)] blur-3xl" />

      <div
        ref={sceneRef}
        className="relative aspect-[1/1.02] w-full sm:aspect-[1/0.92] [transform-style:preserve-3d] [perspective:1400px]"
        style={{ ['--tilt-x' as string]: '0deg', ['--tilt-y' as string]: '0deg' }}
      >
        <div
          className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-500 ease-out"
          style={{
            transform: 'rotateX(var(--tilt-x)) rotateY(var(--tilt-y))',
          }}
        >
          {/* ---------- main app window ---------- */}
          <div
            className="absolute top-[9%] left-[4%] w-[87%] overflow-hidden rounded-[1.4rem] border border-white/12 bg-[#080b14]/95 shadow-[0_50px_120px_-40px_rgba(2,6,24,0.95),0_0_0_1px_rgba(122,155,255,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
            style={{ transform: 'translateZ(50px) rotateX(4deg) rotateY(-9deg)' }}
          >
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <div className="ml-2 flex h-6 flex-1 items-center gap-1.5 rounded-md border border-white/[0.07] bg-black/30 px-2.5">
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-mist/50" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
                  <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
                </svg>
                <span className="text-[0.6rem] font-medium tracking-wide text-mist/70">your-project.ru</span>
              </div>
            </div>

            {/* site preview */}
            <div className="relative">
              <div className="bg-[radial-gradient(120%_90%_at_15%_-10%,rgba(77,120,255,0.22),transparent_60%),radial-gradient(90%_80%_at_95%_0%,rgba(139,92,246,0.2),transparent_62%)] px-5 pt-5 pb-6">
                {/* mini nav */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-[5px] bg-gradient-to-br from-electric-soft to-violet" />
                    <div className="h-1.5 w-10 rounded-full bg-white/45" />
                  </div>
                  <div className="hidden items-center gap-2.5 sm:flex">
                    {[16, 12, 14, 11].map((w, i) => (
                      <div key={i} className="h-1 rounded-full bg-white/18" style={{ width: `${w * 1.5}px` }} />
                    ))}
                  </div>
                  <div className="h-4 w-12 rounded-full bg-white/85" />
                </div>

                {/* mini hero */}
                <div className="mt-6 space-y-1.5">
                  <div className="h-2 w-14 rounded-full bg-electric-soft/70" />
                  <div className="h-3.5 w-[78%] rounded-full bg-white/80" />
                  <div className="h-3.5 w-[58%] rounded-full bg-white/45" />
                  <div className="h-1.5 w-[70%] rounded-full bg-white/16" />
                  <div className="h-1.5 w-[52%] rounded-full bg-white/12" />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-6 w-20 rounded-full bg-[linear-gradient(100deg,#4d78ff,#8b5cf6)] shadow-[0_6px_18px_-6px_rgba(93,108,255,0.9)]" />
                  <div className="h-6 w-16 rounded-full border border-white/18 bg-white/[0.04]" />
                </div>

                {/* mini cards row */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-2.5"
                    >
                      <div className="h-4 w-4 rounded-md bg-gradient-to-br from-electric/70 to-violet/50" />
                      <div className="mt-2 h-1 w-full rounded-full bg-white/26" />
                      <div className="mt-1 h-1 w-2/3 rounded-full bg-white/14" />
                    </div>
                  ))}
                </div>
              </div>

              {/* scanning highlight */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-scan h-16 w-full bg-[linear-gradient(180deg,transparent,rgba(122,155,255,0.16),transparent)]" />
              </div>
            </div>
          </div>

          {/* ---------- analytics / growth card ---------- */}
          <div
            className="animate-float-mid absolute top-[2%] -right-[2%] w-[45%] max-w-[218px] rounded-[1.1rem] border border-white/12 bg-[#0a0d17]/95 p-3.5 shadow-[0_36px_80px_-30px_rgba(2,6,24,0.95),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl sm:right-[-4%]"
            style={{ transform: 'translateZ(120px) rotateY(-8deg)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.55rem] font-semibold tracking-[0.14em] text-mist/60 uppercase">
                  Конверсия
                </p>
                <p className="mt-1 font-display text-[1.05rem] font-semibold text-white">Рост заявок</p>
              </div>
              <span className="rounded-full border border-[#37d9a4]/30 bg-[#37d9a4]/12 px-1.5 py-0.5 text-[0.55rem] font-bold text-[#5ce9b8]">
                ↑
              </span>
            </div>

            {/* bar chart */}
            <div className="mt-3 flex h-12 items-end gap-1.5">
              {[34, 52, 41, 68, 58, 84, 96].map((h, i) => (
                <div key={i} className="flex-1 overflow-hidden rounded-sm">
                  <div
                    className="animate-bar w-full origin-bottom rounded-sm"
                    style={{
                      height: `${(h / 100) * 48}px`,
                      animationDelay: `${i * 90}ms`,
                      background:
                        i > 4
                          ? 'linear-gradient(180deg,#8b5cf6,#4d78ff)'
                          : 'linear-gradient(180deg,rgba(122,155,255,0.55),rgba(77,120,255,0.25))',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.07] pt-2">
              <span className="text-[0.55rem] text-mist/60">интерфейс</span>
              <div className="flex gap-1">
                {['#4d78ff', '#8b5cf6', '#7cd4ff'].map((c) => (
                  <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>

          {/* ---------- new request notification ---------- */}
          <div
            className="animate-float-slow absolute top-[46%] -left-[1%] w-[56%] max-w-[236px] rounded-[1rem] border border-white/12 bg-[#0a0d17]/95 p-3 shadow-[0_34px_70px_-28px_rgba(2,6,24,0.95),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl sm:-left-[6%]"
            style={{ transform: 'translateZ(160px) rotateY(6deg)' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#4d78ff,#8b5cf6)] text-[0.62rem] font-bold text-white shadow-[0_6px_16px_-6px_rgba(93,108,255,1)]">
                AI
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.68rem] font-semibold text-white">Новая заявка с сайта</p>
                <p className="mt-0.5 truncate text-[0.56rem] text-mist/70">форма обратной связи</p>
              </div>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#37d9a4] shadow-[0_0_8px_2px_rgba(55,217,164,0.7)]" />
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-2 py-1.5">
              <span className="text-[0.55rem] font-medium text-mist/70">Отправлено</span>
              <span className="text-[0.55rem] font-semibold text-electric-soft">успешно</span>
            </div>
          </div>

          {/* ---------- code / tech chip ---------- */}
          <div
            className="animate-float-fast absolute right-[1%] bottom-[16%] w-[42%] max-w-[196px] rounded-[1rem] border border-white/12 bg-[#0a0d17]/95 p-3 font-mono shadow-[0_30px_70px_-28px_rgba(2,6,24,0.95),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl sm:right-[-2%]"
            style={{ transform: 'translateZ(90px) rotateY(-10deg)' }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-soft" />
              <span className="text-[0.52rem] tracking-widest text-mist/55 uppercase">Component</span>
            </div>
            <div className="mt-2 space-y-1.5">
              <div className="flex gap-1.5">
                <span className="text-[0.55rem] text-violet-soft">const</span>
                <span className="text-[0.55rem] text-fog/85">site</span>
                <span className="text-[0.55rem] text-mist/50">=</span>
                <span className="text-[0.55rem] text-[#5ce9b8]">'ready'</span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10" />
              <div className="h-1 w-3/4 rounded-full bg-white/08" />
              <div className="h-1 w-1/2 rounded-full bg-white/06" />
            </div>
            <div className="mt-2.5 inline-flex items-center gap-1 rounded-full border border-electric-soft/30 bg-electric/12 px-2 py-0.5">
              <span className="h-1 w-1 rounded-full bg-electric-soft" />
              <span className="text-[0.5rem] font-semibold tracking-wide text-electric-soft">TypeScript</span>
            </div>
          </div>

          {/* ---------- responsive device chips ---------- */}
          <div
            className="animate-float-mid absolute bottom-[4%] left-[10%] flex items-center gap-1.5 rounded-full border border-white/12 bg-[#0a0d17]/95 px-2.5 py-1.5 shadow-[0_24px_50px_-24px_rgba(2,6,24,0.95),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl"
            style={{ transform: 'translateZ(200px)' }}
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-mist/70" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="4" y="3" width="16" height="12" rx="1.6" />
              <path d="M8 19h8" />
            </svg>
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-mist/70" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="7.5" y="2.5" width="9" height="19" rx="2" />
            </svg>
            <span className="ml-0.5 text-[0.55rem] font-semibold tracking-wide text-fog/85">адаптив</span>
          </div>

          {/* thin orbit ring */}
          <div
            className="pointer-events-none absolute inset-[6%] rounded-full border border-white/[0.055]"
            style={{ transform: 'translateZ(-20px) rotateX(64deg)' }}
          />
        </div>
      </div>
    </div>
  )
}
