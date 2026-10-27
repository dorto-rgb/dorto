import type { IconName } from '../data/content'

type Props = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const paths: Record<IconName, React.ReactNode> = {
  sparkles: (
    <>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 15.5l.7 2.2 2.3.8-2.3.7-.7 2.3-.8-2.3-2.2-.7 2.2-.8.8-2.2Z" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1.2a2.3 2.3 0 0 0 1.6-3.9 2.3 2.3 0 0 1 1.6-3.9H19A2.9 2.9 0 0 0 21 10 9 9 0 0 0 12 3Z" />
      <circle cx="8" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="7.6" cy="14" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="5" width="13" height="9.5" rx="1.6" />
      <path d="M6 18.5h6" />
      <rect x="16.5" y="9" width="5" height="10" rx="1.4" />
      <path d="M18.5 16.8h1" />
    </>
  ),
  bolt: <path d="M13.5 2.5 5.5 13.2h5l-1 8.3 8-10.9h-5l1-8.1Z" />,
  cursor: (
    <>
      <path d="M5.5 3.5 19 11l-6.1 1.6L10 19 5.5 3.5Z" />
      <path d="M12.9 12.6 18 18" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="2.4" />
      <path d="M3 9h18M9.5 9v11.5" />
      <path d="M13 13h4.5M13 16.2h3" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5V6.2a1.6 1.6 0 0 1 1.6-1.6h6.2a1.6 1.6 0 0 1 1.6 1.6v14.3" />
      <path d="M13.4 10.5h4.9a1.6 1.6 0 0 1 1.6 1.6v8.4M2.6 20.5h18.8" />
      <path d="M7 8h3M7 11.5h3M7 15h3M16 14h1.5M16 17.4h1.5" />
    </>
  ),
  cart: (
    <>
      <path d="M2.8 4.5h2.1l2.3 10.2a1.8 1.8 0 0 0 1.8 1.4h7.7a1.8 1.8 0 0 0 1.8-1.4l1.3-6.2H6" />
      <circle cx="9.4" cy="19.4" r="1.3" />
      <circle cx="17" cy="19.4" r="1.3" />
    </>
  ),
  window: (
    <>
      <rect x="2.8" y="4" width="18.4" height="16" rx="2.4" />
      <path d="M2.8 8.6h18.4" />
      <circle cx="6" cy="6.3" r=".7" fill="currentColor" stroke="none" />
      <circle cx="8.4" cy="6.3" r=".7" fill="currentColor" stroke="none" />
      <path d="M6.6 12h5M6.6 15.4h8.6M14 12h3.4" />
    </>
  ),
  bot: (
    <>
      <rect x="3.8" y="7.4" width="16.4" height="12.2" rx="3.4" />
      <path d="M12 3.4v4" />
      <circle cx="12" cy="2.9" r="1.1" />
      <circle cx="8.8" cy="13" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="13" r="1.05" fill="currentColor" stroke="none" />
      <path d="M9.4 16.4h5.2M3.8 12.4h-1.2M21.4 12.4h-1.2" />
    </>
  ),
  refresh: (
    <>
      <path d="M20.4 12a8.4 8.4 0 1 1-2.6-6.1" />
      <path d="M20.8 4.4v5h-5" />
    </>
  ),
}

export function Icon({ name, className = 'h-6 w-6' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      {paths[name]}
    </svg>
  )
}

/* ---------------- Technology logos (simplified, brand-accurate colours) ---------------- */

export function TechLogo({ name, className = 'h-7 w-7' }: { name: string; className?: string }) {
  switch (name) {
    case 'html':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M4 2.5h16l-1.45 16.3L12 21.5l-6.55-2.7L4 2.5Z" fill="#E44D26" />
          <path d="M12 4.3v15.5l5.15-2.05L18.3 4.3H12Z" fill="#F16529" />
          <path d="M8 7h8l-.25 2.7H10.9l.16 1.8h4.5l-.42 4.6-3.14.87-3.15-.87-.2-2.3h2.1l.1 1.05 1.15.32 1.16-.32.12-1.35H8.4L8 7Z" fill="#fff" />
        </svg>
      )
    case 'css':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M4 2.5h16l-1.45 16.3L12 21.5l-6.55-2.7L4 2.5Z" fill="#264DE4" />
          <path d="M12 4.3v15.5l5.15-2.05L18.3 4.3H12Z" fill="#2965F1" />
          <path d="M12 10.4h3.3l.22-2.5H8.4l.66 7.3h4.35l-.15 1.65-1.26.35-1.25-.35-.08-.87H8.55l.16 2.2 3.29.92 3.3-.92.45-5.03H10.6l-.22-2.75H12Z" fill="#fff" />
        </svg>
      )
    case 'js':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="#F7DF1E" />
          <path
            d="M12.1 17.4c0 1.9-1.1 2.8-2.75 2.8-1.5 0-2.4-.8-2.85-1.9l1.85-1.1c.25.45.5.85 1 .85.45 0 .75-.18.75-.9v-5.6h2v5.85Zm1.95.2 1.85-1.1c.5.85 1.05 1.35 2 1.35.7 0 1.1-.3 1.1-.75 0-.5-.4-.7-1.2-1.05l-.65-.3c-1.7-.72-2.65-1.6-2.65-3.1 0-1.55 1.15-2.65 2.95-2.65 1.3 0 2.2.45 2.85 1.6l-1.75 1.15c-.4-.7-.8-.95-1.3-.95-.5 0-.8.32-.8.75 0 .5.35.72 1.1 1.05l.65.28c1.95.85 2.9 1.7 2.9 3.25 0 1.85-1.45 2.8-3.4 2.8-1.85 0-3-.85-3.6-2Z"
            fill="#111"
          />
        </svg>
      )
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="#3178C6" />
          <path
            d="M6.4 9.9h6.3v1.8h-2.2v6.1h-1.9v-6.1H6.4V9.9Zm7.2 7.4 1.5-.9c.4.65.9 1.15 1.8 1.15.7 0 1.1-.3 1.1-.75 0-.5-.4-.68-1.15-1l-.45-.2c-1.4-.6-2.2-1.35-2.2-2.6 0-1.3.95-2.25 2.5-2.25 1.05 0 1.85.4 2.4 1.4l-1.45 1c-.35-.6-.7-.85-1.1-.85-.4 0-.65.27-.65.65 0 .45.3.63.95.9l.45.2c1.6.7 2.4 1.4 2.4 2.7 0 1.55-1.2 2.35-2.85 2.35-1.6 0-2.6-.75-3.1-1.8Z"
            fill="#fff"
          />
        </svg>
      )
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="1.9" fill="#61DAFB" />
          <g fill="none" stroke="#61DAFB" strokeWidth="1.15">
            <ellipse cx="12" cy="12" rx="9.4" ry="3.7" />
            <ellipse cx="12" cy="12" rx="9.4" ry="3.7" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9.4" ry="3.7" transform="rotate(120 12 12)" />
          </g>
        </svg>
      )
    case 'next':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9.6" fill="#fff" />
          <path d="M8.2 16.9V7.4h2.2l6 7.6V7.4h1.9v9.5h-2.1L10.1 9v7.9H8.2Z" fill="#04050a" />
          <path d="M16.4 7.4h1.9v9.5h-1.9z" fill="#04050a" opacity=".55" />
        </svg>
      )
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M12 5.6c-2.5 0-4.1 1.25-4.8 3.75.95-1.24 2.1-1.72 3.35-1.4.75.18 1.28.72 1.9 1.35.92.9 1.99 1.95 4.35 1.95 2.5 0 4.1-1.25 4.8-3.75-.95 1.24-2.1 1.72-3.35 1.4-.75-.18-1.28-.72-1.9-1.35C14.31 6.65 13.24 5.6 12 5.6ZM7.2 11.25c-2.5 0-4.1 1.25-4.8 3.75.95-1.24 2.1-1.72 3.35-1.4.75.18 1.28.72 1.9 1.35.92.9 1.99 1.95 4.35 1.95 2.5 0 4.1-1.25 4.8-3.75-.95 1.24-2.1 1.72-3.35 1.4-.75-.18-1.28-.72-1.9-1.35-.92-.9-1.99-1.95-4.35-1.95Z"
            fill="#38BDF8"
          />
        </svg>
      )
    case 'node':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 2.6 20.4 7v10L12 21.4 3.6 17V7L12 2.6Z" fill="#3C873A" />
          <path d="M12 2.6 20.4 7 12 11.4 3.6 7 12 2.6Z" fill="#68A063" />
          <path d="M12 12.6v8.4l-8-4.55V7.9l8 4.7Z" fill="#2F6B2F" opacity=".55" />
        </svg>
      )
    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M13.2 2.2 4.4 13.4c-.4.5 0 1.25.62 1.25h6.3v6.9c0 .85 1 1.25 1.55.62l8.8-11.2c.4-.5.02-1.25-.6-1.25h-6.3V2.82c0-.85-1-1.25-1.55-.62Z" fill="#3ECF8E" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.68-.22.68-.48v-1.7c-2.72.6-3.3-1.3-3.3-1.3-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.87 1.5 2.3 1.07 2.86.82.09-.64.34-1.07.62-1.32-2.17-.25-4.46-1.09-4.46-4.83 0-1.07.38-1.94 1.01-2.63-.1-.25-.44-1.25.1-2.6 0 0 .83-.27 2.7 1a9.3 9.3 0 0 1 4.9 0c1.87-1.27 2.7-1 2.7-1 .54 1.35.2 2.35.1 2.6.63.69 1.01 1.56 1.01 2.63 0 3.75-2.29 4.58-4.47 4.82.35.3.66.9.66 1.8v2.68c0 .26.18.58.69.48A9.8 9.8 0 0 0 12 2.2Z"
            fill="#fff"
          />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".2" />
        </svg>
      )
  }
}

/* ---------------- Utility icons ---------------- */

export function ArrowIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.8}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  )
}

export function ArrowUpRight({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.8}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2.1}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.8}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-5 w-5' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.8}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function MenuIcon({ className = 'h-5 w-5' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.8}>
      <path d="M3.5 8h17M3.5 16h17" />
    </svg>
  )
}

export function TelegramIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M21.9 4.3 19 19.4c-.2 1-.8 1.2-1.6.75l-4.4-3.25-2.1 2.05c-.24.24-.44.44-.9.44l.32-4.5 8.2-7.4c.36-.32-.08-.5-.55-.18L7.8 13.1l-4.35-1.36c-.95-.3-.96-.95.2-1.4l17-6.55c.78-.3 1.47.18 1.25 1.5Z" />
    </svg>
  )
}

export function MailIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.6}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
      <path d="m3.6 7.2 8.4 6 8.4-6" />
    </svg>
  )
}

export function EditIcon({ className = 'h-3.5 w-3.5' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.7}>
      <path d="M4 20h4l10-10a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5 4 20Z" />
      <path d="M13.5 7 17 10.5" />
    </svg>
  )
}

export function SpinnerIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity=".25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.75s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

export function LogoMark({ className = 'h-9 w-9' }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A9BFF" />
          <stop offset="0.55" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#7CD4FF" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#logo-g)" opacity=".13" />
      <rect x="1" y="1" width="38" height="38" rx="11" stroke="url(#logo-g)" strokeWidth="1.2" fill="none" opacity=".55" />
      <path d="M12.5 27.5 20 12l7.5 15.5" stroke="url(#logo-g)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M15.6 22.6h8.8" stroke="url(#logo-g)" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  )
}
