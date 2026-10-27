import type { Project } from '../data/content'
import { useFitScale } from '../hooks/useUi'

/**
 * Превью концепта в браузерном окне.
 * Внутри — «сайт», нарисованный на фиксированном холсте 1200×750
 * и отмасштабированный под ширину карточки, поэтому превью остаётся
 * чётким и не ломает сетку на мобильных.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const { ref, scale } = useFitScale(1200)

  return (
    <div className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#05070d] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.07)]">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.035] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/75" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/75" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/75" />
        <div className="ml-1.5 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-white/[0.07] bg-black/35 px-2 py-1">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0 text-mist/45" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
            <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
          </svg>
          <span className="truncate text-[0.58rem] font-medium tracking-wide text-mist/65">
            {project.domain}
          </span>
        </div>
      </div>

      {/* scaled mockup */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div ref={ref} className="absolute inset-0">
          <div
            className="mockup-canvas absolute top-0 left-0"
            style={{ width: 1200, height: 750, transform: `scale(${scale})` }}
          >
            <Mockup id={project.id} />
          </div>
        </div>

        {/* subtle top light + vignette so the preview reads as a screen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_28%),radial-gradient(120%_90%_at_50%_120%,rgba(0,0,0,0.35),transparent_60%)]"
        />
      </div>
    </div>
  )
}

function Mockup({ id }: { id: string }) {
  switch (id) {
    case 'nova':
      return <NovaMockup />
    case 'lumiere':
      return <LumiereMockup />
    case 'monolith':
      return <MonolithMockup />
    case 'velocity':
      return <VelocityMockup />
    case 'finora':
      return <FinoraMockup />
    default:
      return <AuroraMockup />
  }
}

/* ---------------- shared bits ---------------- */

function Bar({ w, h = 8, color = 'rgba(255,255,255,0.22)', r = 99 }: { w: number; h?: number; color?: string; r?: number }) {
  return <div style={{ width: w, height: h, background: color, borderRadius: r }} />
}

/* ---------------- 1. NOVA — technology company ---------------- */

function NovaMockup() {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: '#070911', color: '#fff', fontFamily: 'Manrope, sans-serif' }}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 12% -10%, rgba(61,107,255,0.5), transparent 62%), radial-gradient(50% 45% at 88% 0%, rgba(139,92,246,0.42), transparent 65%)',
        }}
      />
      <div className="relative flex items-center justify-between px-[64px] pt-[36px]">
        <div className="flex items-center gap-[12px]">
          <div
            className="grid place-items-center"
            style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(140deg,#5d7dff,#8b5cf6)' }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(255,255,255,0.92)' }} />
          </div>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: '0.16em' }}>NOVA</span>
        </div>
        <div className="flex items-center gap-[30px]">
          {['Платформа', 'Решения', 'Кейсы', 'О нас'].map((t) => (
            <span key={t} style={{ fontSize: 15, color: 'rgba(201,209,228,0.75)' }}>
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            padding: '11px 22px',
            borderRadius: 99,
            background: 'linear-gradient(100deg,#4d78ff,#8b5cf6)',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Демо
        </div>
      </div>

      <div className="relative mt-[54px] flex gap-[48px] px-[64px]">
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 15px',
              borderRadius: 99,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.04)',
              fontSize: 12,
              letterSpacing: '0.13em',
              color: '#a9b8de',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#7cd4ff' }} />
            ИНФРАСТРУКТУРА ДЛЯ ДАННЫХ
          </div>
          <div style={{ marginTop: 26, fontSize: 62, lineHeight: 1.02, fontWeight: 700, letterSpacing: '-0.035em' }}>
            Данные,
            <br />
            которые
            <br />
            <span
              style={{
                background: 'linear-gradient(96deg,#8fa9ff,#c0a9ff,#7cd4ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              работают
            </span>
          </div>
          <div style={{ marginTop: 24, fontSize: 16, lineHeight: 1.55, color: 'rgba(201,209,228,0.72)', maxWidth: 400 }}>
            Единая платформа для сбора, обработки и аналитики данных в реальном времени.
          </div>
          <div className="mt-[30px] flex items-center gap-[14px]">
            <div style={{ padding: '14px 26px', borderRadius: 99, background: '#fff', color: '#070911', fontSize: 15, fontWeight: 700 }}>
              Запросить демо
            </div>
            <div
              style={{
                padding: '14px 22px',
                borderRadius: 99,
                border: '1px solid rgba(255,255,255,0.18)',
                fontSize: 15,
                color: '#c9d1e4',
              }}
            >
              Документация
            </div>
          </div>
        </div>

        {/* product panel */}
        <div style={{ width: 380, flex: 'none' }}>
          <div
            style={{
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(10,14,26,0.9)',
              padding: 20,
              boxShadow: '0 40px 80px -40px rgba(0,0,0,0.9)',
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, letterSpacing: '0.14em', color: 'rgba(154,164,189,0.8)' }}>ПОТОК ДАННЫХ</span>
              <span style={{ fontSize: 11, color: '#5ce9b8' }}>● online</span>
            </div>
            <div className="mt-[16px] flex h-[92px] items-end gap-[7px]">
              {[38, 62, 48, 74, 58, 88, 70, 96, 64, 82].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: 4,
                    background: i > 6 ? 'linear-gradient(180deg,#a78bfa,#4d78ff)' : 'rgba(122,155,255,0.35)',
                  }}
                />
              ))}
            </div>
            <div className="mt-[18px] grid grid-cols-3 gap-[10px]">
              {[
                ['Запросы', '4.2K'],
                ['Задержка', '12мс'],
                ['Ноды', '24'],
              ].map(([k, v]) => (
                <div key={k} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: 'rgba(154,164,189,0.8)' }}>{k}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-[14px] space-y-[8px]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-[10px]">
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: 'rgba(124,212,255,0.8)' }} />
                  <Bar w={178 - i * 26} h={7} color="rgba(255,255,255,0.14)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-auto flex items-center gap-[46px] px-[64px] pb-[38px]" style={{ opacity: 0.6 }}>
        {[74, 58, 86, 66, 92].map((w, i) => (
          <Bar key={i} w={w} h={13} color="rgba(255,255,255,0.16)" r={3} />
        ))}
      </div>
    </div>
  )
}

/* ---------------- 2. LUMIÈRE — cosmetics shop ---------------- */

function LumiereMockup() {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: '#F6F1EA', color: '#2C2420', fontFamily: 'Manrope, sans-serif' }}>
      <div className="flex items-center justify-between px-[58px] pt-[30px]">
        <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: '0.28em' }}>LUMIÈRE</span>
        <div className="flex items-center gap-[28px]">
          {['Уход', 'Макияж', 'Ароматы', 'О бренде'].map((t) => (
            <span key={t} style={{ fontSize: 14, color: '#6B5B4F' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-[14px]">
          <div style={{ width: 22, height: 22, border: '1.5px solid #2C2420', borderRadius: 99 }} />
          <div style={{ width: 22, height: 22, border: '1.5px solid #2C2420', borderRadius: 4 }} />
        </div>
      </div>

      <div className="flex flex-1 items-center gap-[40px] px-[58px]">
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.24em', color: '#A08B78' }}>НОВАЯ КОЛЛЕКЦИЯ</div>
          <div style={{ marginTop: 18, fontSize: 58, lineHeight: 1.04, letterSpacing: '-0.03em', fontWeight: 400 }}>
            Сияние
            <br />
            <span style={{ fontStyle: 'italic', color: '#8A6F55' }}>каждой кожи</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 15, lineHeight: 1.6, color: '#6B5B4F', maxWidth: 330 }}>
            Средства с натуральными маслами и витамином C для ежедневного ухода.
          </div>
          <div className="mt-[26px] flex items-center gap-[12px]">
            <div style={{ padding: '13px 26px', borderRadius: 99, background: '#2C2420', color: '#F6F1EA', fontSize: 14 }}>
              В каталог
            </div>
            <span style={{ fontSize: 14, color: '#6B5B4F', textDecoration: 'underline' }}>Подобрать уход</span>
          </div>
        </div>

        {/* product visual */}
        <div style={{ position: 'relative', width: 400, height: 300, flex: 'none' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 18,
              background: 'linear-gradient(150deg,#EADFD1,#DCC8B4)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 54,
              transform: 'translateX(-50%)',
              width: 96,
              height: 150,
              borderRadius: 16,
              background: 'linear-gradient(160deg,#F7F2EC,#CBB49E)',
              boxShadow: '0 24px 40px -20px rgba(80,60,40,0.5)',
            }}
          >
            <div
              style={{
                margin: '26px auto 0',
                width: 52,
                height: 34,
                borderRadius: 4,
                background: '#2C2420',
                display: 'grid',
                placeItems: 'center',
                color: '#F6F1EA',
                fontSize: 7,
                letterSpacing: '0.18em',
              }}
            >
              LUMIÈRE
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 204,
              transform: 'translateX(-50%)',
              width: 34,
              height: 26,
              background: '#2C2420',
              borderRadius: 3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 18,
              background: '#FFFDFA',
              borderRadius: 12,
              padding: '11px 15px',
              boxShadow: '0 14px 30px -16px rgba(80,60,40,0.35)',
            }}
          >
            <div style={{ fontSize: 10, color: '#A08B78', letterSpacing: '0.1em' }}>СЫВОРОТКА</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 3 }}>Vitamin C</div>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-[16px] px-[58px] pb-[30px]">
        {[
          ['Крем', 'Питание', '#E9DCCB'],
          ['Сыворотка', 'Сияние', '#F0E5D8'],
          ['Тоник', 'Баланс', '#E4D6C6'],
        ].map(([name, tag, bg]) => (
          <div key={name} style={{ background: '#FFFDFA', borderRadius: 12, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 46, height: 46, borderRadius: 8, background: bg }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 11, color: '#A08B78', marginTop: 2 }}>{tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- 3. MONOLITH — architecture bureau ---------------- */

function MonolithMockup() {
  return (
    <div className="relative flex h-full w-full flex-col" style={{ background: '#E8E4DC', color: '#151412', fontFamily: 'Manrope, sans-serif' }}>
      <div className="flex items-center justify-between px-[56px] pt-[30px]">
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.3em' }}>MONOLITH</span>
        <div className="flex items-center gap-[26px]">
          {['Проекты', 'Бюро', 'Пресса', 'Контакты'].map((t) => (
            <span key={t} style={{ fontSize: 13, color: '#5C5850' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="px-[56px] pt-[46px]">
        <div style={{ fontSize: 11, letterSpacing: '0.26em', color: '#8A857B' }}>АРХИТЕКТУРНОЕ БЮРО · 2014</div>
        <div style={{ marginTop: 16, fontSize: 92, lineHeight: 0.94, letterSpacing: '-0.05em', fontWeight: 500 }}>
          Форма
          <br />
          как тишина
        </div>
      </div>

      <div className="mt-auto flex gap-[14px] px-[56px] pb-[34px]">
        <div style={{ flex: 1.6, height: 214, background: 'linear-gradient(200deg,#C9C3B8,#A7A196)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: '18%', right: '18%', top: 0, bottom: 0, background: 'rgba(255,255,255,0.22)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 46, background: 'rgba(20,18,16,0.18)' }} />
          <div style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.85)' }}>
            ДОМ В ЛЕСУ · 2023
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ flex: 1, background: 'linear-gradient(160deg,#B9B3A8,#98928A)', borderRadius: 2 }} />
          <div style={{ flex: 1, background: '#D5D0C7', borderRadius: 2, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', color: '#6E685E' }}>ИЗБРАННОЕ</div>
            <div style={{ fontSize: 26, letterSpacing: '-0.03em' }}>18 объектов</div>
          </div>
        </div>
        <div style={{ flex: 1.1, height: 214, background: 'linear-gradient(200deg,#DAD5CC,#BFB9AE)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: '24px 26px', border: '1px solid rgba(40,38,34,0.25)' }} />
          <div style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(40,38,34,0.7)' }}>
            ПАВИЛЬОН · 2022
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- 4. VELOCITY — automotive brand ---------------- */

function VelocityMockup() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: '#0A0A0B', color: '#fff', fontFamily: 'Manrope, sans-serif' }}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(70% 60% at 78% 40%, rgba(224,71,47,0.34), transparent 62%)' }}
      />
      <div className="relative flex items-center justify-between px-[56px] pt-[30px]">
        <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '0.22em', fontStyle: 'italic' }}>VELOCITY</span>
        <div className="flex items-center gap-[26px]">
          {['Модели', 'Технологии', 'Спорт', 'Дилеры'].map((t) => (
            <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)' }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#FF6B52' }}>ТЕСТ-ДРАЙВ →</div>
      </div>

      <div className="relative px-[56px] pt-[40px]">
        <div style={{ fontSize: 12, letterSpacing: '0.3em', color: '#FF6B52' }}>GT LINE</div>
        <div style={{ marginTop: 12, fontSize: 86, lineHeight: 0.92, fontWeight: 800, letterSpacing: '-0.045em', fontStyle: 'italic' }}>
          VELOCITY
          <span style={{ color: '#FF6B52' }}>.</span>
        </div>
        <div style={{ marginTop: 14, fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 340 }}>
          Аэродинамика, доведённая до предела. Новая модель уже в шоурумах.
        </div>
      </div>

      {/* car silhouette */}
      <div className="pointer-events-none absolute right-[40px] bottom-[86px]" aria-hidden="true">
        <div
          style={{
            width: 470,
            height: 130,
            borderRadius: '60% 42% 18% 12% / 78% 68% 32% 22%',
            background: 'linear-gradient(160deg,#2A2A2E,#101012 60%,#1D1D20)',
            boxShadow: 'inset 0 12px 26px rgba(255,255,255,0.08), 0 30px 60px -20px rgba(0,0,0,0.9)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 22, left: '22%', width: '46%', height: 40, borderRadius: '50% 40% 6% 6%', background: 'linear-gradient(180deg,#3B4048,#22252B)' }} />
          <div style={{ position: 'absolute', bottom: -14, left: 74, width: 62, height: 62, borderRadius: 99, background: '#0B0B0C', border: '5px solid #232327' }} />
          <div style={{ position: 'absolute', bottom: -14, right: 74, width: 62, height: 62, borderRadius: 99, background: '#0B0B0C', border: '5px solid #232327' }} />
        </div>
        <div style={{ position: 'absolute', bottom: -34, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(224,71,47,0.65),transparent)' }} />
      </div>

      <div className="relative mt-auto grid grid-cols-3 gap-[16px] px-[56px] pb-[30px]" style={{ maxWidth: 620 }}>
        {[
          ['3.4 с', '0–100 км/ч'],
          ['610 л.с.', 'Мощность'],
          ['320 км/ч', 'Максимум'],
        ].map(([v, k]) => (
          <div key={k} style={{ borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>{v}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
              {k.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- 5. FINORA — finance web app ---------------- */

function FinoraMockup() {
  return (
    <div className="flex h-full w-full" style={{ background: '#F4F6F9', color: '#101828', fontFamily: 'Manrope, sans-serif' }}>
      {/* sidebar */}
      <div className="flex flex-col" style={{ width: 196, background: '#0D1420', padding: '22px 16px', color: '#fff' }}>
        <div className="flex items-center gap-[9px]">
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(140deg,#37b9a4,#2d7ce0)' }} />
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.06em' }}>FINORA</span>
        </div>
        <div className="mt-[26px] space-y-[7px]">
          {['Обзор', 'Операции', 'Счета', 'Аналитика', 'Настройки'].map((t, i) => (
            <div
              key={t}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '9px 11px',
                borderRadius: 9,
                background: i === 0 ? 'rgba(55,185,164,0.18)' : 'transparent',
                color: i === 0 ? '#5CE0C6' : 'rgba(255,255,255,0.55)',
                fontSize: 12.5,
              }}
            >
              <div style={{ width: 13, height: 13, borderRadius: 4, background: i === 0 ? '#5CE0C6' : 'rgba(255,255,255,0.22)' }} />
              {t}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', borderRadius: 12, background: 'rgba(255,255,255,0.06)', padding: 12 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Баланс</div>
          <div style={{ fontSize: 19, fontWeight: 700, marginTop: 4 }}>₽ 842 500</div>
        </div>
      </div>

      {/* main */}
      <div style={{ flex: 1, padding: '24px 26px' }}>
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em' }}>Обзор счёта</div>
            <div style={{ fontSize: 11.5, color: '#7C8AA0', marginTop: 3 }}>Период: последние 30 дней</div>
          </div>
          <div className="flex items-center gap-[8px]">
            <div style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #DEE4EC', fontSize: 11.5, color: '#4A5668' }}>Фильтр</div>
            <div style={{ padding: '8px 14px', borderRadius: 8, background: '#0D1420', color: '#fff', fontSize: 11.5 }}>Новый платёж</div>
          </div>
        </div>

        <div className="mt-[18px] flex gap-[12px]">
          {[
            ['Поступления', '₽ 1 240 800', '+12,4%', '#37b9a4'],
            ['Списания', '₽ 398 300', '−4,1%', '#e2584a'],
            ['Средний чек', '₽ 18 400', '+2,8%', '#2d7ce0'],
          ].map(([k, v, d, c]) => (
            <div key={k} style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E7ECF3' }}>
              <div style={{ fontSize: 10.5, color: '#7C8AA0', letterSpacing: '0.06em' }}>{k}</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6, letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 10.5, color: c, marginTop: 4, fontWeight: 600 }}>{d}</div>
            </div>
          ))}
        </div>

        <div className="mt-[12px] flex gap-[12px]">
          {/* chart */}
          <div style={{ flex: 1.5, background: '#fff', borderRadius: 12, border: '1px solid #E7ECF3', padding: 14 }}>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, fontWeight: 600 }}>Динамика</span>
              <span style={{ fontSize: 10, color: '#7C8AA0' }}>30 дней</span>
            </div>
            <svg viewBox="0 0 320 110" className="mt-[10px] w-full" preserveAspectRatio="none" style={{ height: 108 }}>
              <defs>
                <linearGradient id="finora-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#37b9a4" stopOpacity="0.32" />
                  <stop offset="1" stopColor="#37b9a4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[22, 52, 82].map((y) => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#EDF1F6" strokeWidth="1" />
              ))}
              <path
                d="M0 86 L34 70 L68 78 L102 54 L136 62 L170 40 L204 48 L238 26 L272 34 L306 16 L320 20 L320 110 L0 110 Z"
                fill="url(#finora-fill)"
              />
              <path
                d="M0 86 L34 70 L68 78 L102 54 L136 62 L170 40 L204 48 L238 26 L272 34 L306 16 L320 20"
                fill="none"
                stroke="#37b9a4"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* transactions */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #E7ECF3', padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Операции</div>
            <div className="mt-[10px] space-y-[9px]">
              {[
                ['Оплата', '− ₽ 24 900', '#e2584a'],
                ['Поступление', '+ ₽ 86 000', '#37b9a4'],
                ['Перевод', '− ₽ 12 300', '#e2584a'],
                ['Поступление', '+ ₽ 42 700', '#37b9a4'],
              ].map(([k, v, c], i) => (
                <div key={i} className="flex items-center justify-between" style={{ borderBottom: i < 3 ? '1px solid #F1F4F8' : 'none', paddingBottom: 8 }}>
                  <div className="flex items-center gap-[8px]">
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: '#F1F5FA' }} />
                    <span style={{ fontSize: 11, color: '#4A5668' }}>{k}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- 6. AURORA — travel agency ---------------- */

function AuroraMockup() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ color: '#fff', fontFamily: 'Manrope, sans-serif' }}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(170deg,#0B1B33 0%,#123A63 42%,#2E6E9E 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 76% 8%, rgba(124,212,255,0.42), transparent 62%), radial-gradient(50% 45% at 8% 92%, rgba(139,92,246,0.32), transparent 64%)' }}
      />
      {/* aurora ribbons */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[12%] h-[42%]"
        style={{
          background: 'linear-gradient(100deg, transparent, rgba(108,240,200,0.28) 32%, rgba(139,160,255,0.3) 58%, transparent)',
          filter: 'blur(28px)',
          transform: 'rotate(-6deg)',
        }}
      />

      <div className="relative flex items-center justify-between px-[54px] pt-[28px]">
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.26em' }}>AURORA</span>
        <div className="flex items-center gap-[24px]">
          {['Направления', 'Туры', 'О нас', 'Контакты'].map((t) => (
            <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ padding: '9px 18px', borderRadius: 99, background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.28)', fontSize: 12 }}>
          Подобрать тур
        </div>
      </div>

      <div className="relative px-[54px] pt-[52px]">
        <div style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.7)' }}>СЕВЕРНОЕ СИЯНИЕ · 2025</div>
        <div style={{ marginTop: 14, fontSize: 64, lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 600, maxWidth: 560 }}>
          Путешествия,
          <br />
          которые
          <br />
          запоминаются
        </div>
        <div className="mt-[22px] flex items-center gap-[10px]">
          <div style={{ padding: '12px 22px', borderRadius: 99, background: '#fff', color: '#0B1B33', fontSize: 13, fontWeight: 700 }}>
            Смотреть направления
          </div>
          <div style={{ padding: '12px 20px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.35)', fontSize: 13 }}>
            Подбор по датам
          </div>
        </div>
      </div>

      {/* destination cards */}
      <div className="relative mt-auto flex gap-[14px] px-[54px] pb-[28px]">
        {[
          ['Исландия', 'от 7 дней', 'linear-gradient(150deg,#2E6E9E,#0F2740)'],
          ['Норвегия', 'от 5 дней', 'linear-gradient(150deg,#3E8FB0,#123048)'],
          ['Мурманск', 'от 3 дней', 'linear-gradient(150deg,#5A6FB0,#18203C)'],
        ].map(([name, meta, bg]) => (
          <div key={name} style={{ flex: 1, borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ height: 66, background: bg }} />
            <div style={{ padding: '9px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
