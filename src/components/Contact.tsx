import { useEffect, useMemo, useRef, useState } from 'react'
import { isEmail, telegramLabel, telegramUrl, type Contacts } from '../site'
import { services } from '../data/content'
import {
  ArrowIcon,
  CheckIcon,
  EditIcon,
  MailIcon,
  SpinnerIcon,
  TelegramIcon,
  ArrowUpRight,
} from './Icons'
import { Reveal, Section } from './ui'

export type Prefill = { text: string; nonce: number }

type FormState = { name: string; contact: string; project: string }
type Errors = Partial<Record<keyof FormState, string>>

const emptyForm: FormState = { name: '', contact: '', project: '' }

function validate(values: FormState, contacts: Contacts): Errors {
  const errors: Errors = {}

  const name = values.name.trim()
  if (!name) errors.name = 'Укажите, как к вам обращаться'
  else if (name.length < 2) errors.name = 'Слишком короткое имя'

  const contact = values.contact.trim()
  const looksLikePhone = /^\+?[\d\s()-]{10,}$/.test(contact)
  const looksLikeHandle = /^@?[a-zA-Z][\w.]{3,}$/.test(contact) && contact.includes('@') === false
  if (!contact) errors.contact = 'Оставьте Telegram, e-mail или телефон'
  else if (!isEmail(contact) && !looksLikeHandle && !looksLikePhone)
    errors.contact = 'Проверьте формат: @username, e-mail или телефон'
  else if (isEmail(contact) && contact.toLowerCase() === contacts.email.toLowerCase())
    errors.contact = 'Это мой адрес — укажите свой контакт'

  const project = values.project.trim()
  if (!project) errors.project = 'Коротко опишите задачу'
  else if (project.length < 10) errors.project = 'Добавьте пару слов о проекте — минимум 10 символов'

  return errors
}

function buildRequest(values: FormState, contacts: Contacts) {
  const lines = [
    'Заявка с сайта-портфолио',
    '',
    `Имя: ${values.name.trim()}`,
    `Контакт: ${values.contact.trim()}`,
    '',
    'О проекте:',
    values.project.trim(),
    '',
    `Ответить: ${contacts.email} · ${telegramLabel(contacts.telegram) || 'Telegram'}`,
  ]
  return lines.join('\n')
}

export function Contact({
  contacts,
  onUpdateContacts,
  onResetContacts,
  prefill,
}: {
  contacts: Contacts
  onUpdateContacts: (next: Partial<Contacts>) => void
  onResetContacts: () => void
  prefill: Prefill | null
}) {
  const [values, setValues] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [sent, setSent] = useState<{ request: string; name: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [editing, setEditing] = useState(false)

  const formRef = useRef<HTMLFormElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)
  const projectRef = useRef<HTMLTextAreaElement | null>(null)
  const timerRef = useRef<number | null>(null)

  // requests coming from services / pricing / portfolio
  useEffect(() => {
    if (!prefill) return
    setStatus('idle')
    setSent(null)
    setValues((prev) => ({ ...prev, project: prefill.text }))
    setErrors((prev) => ({ ...prev, project: undefined }))
    const t = window.setTimeout(() => {
      projectRef.current?.focus({ preventScroll: true })
    }, 480)
    return () => window.clearTimeout(t)
  }, [prefill])

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const fieldError = (key: keyof FormState) => (touched[key] ? errors[key] : undefined)

  const update = (key: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (touched[key]) {
      const next = validate({ ...values, [key]: value }, contacts)
      setErrors((prev) => ({ ...prev, [key]: next[key] }))
    }
  }

  const blur = (key: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    const next = validate(values, contacts)
    setErrors((prev) => ({ ...prev, [key]: next[key] }))
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(values, contacts)
    setErrors(found)
    setTouched({ name: true, contact: true, project: true })

    if (Object.keys(found).length > 0) {
      const first = (['name', 'contact', 'project'] as const).find((key) => found[key])
      if (first === 'name') nameRef.current?.focus()
      if (first === 'project') projectRef.current?.focus()
      return
    }

    setStatus('loading')
    const request = buildRequest(values, contacts)

    timerRef.current = window.setTimeout(() => {
      setSent({ request, name: values.name.trim() })
      setStatus('success')
      setCopied(false)
      void copy(request).then((ok) => setCopied(ok))
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }, 1000)
  }

  const resetForm = () => {
    setValues(emptyForm)
    setErrors({})
    setTouched({})
    setSent(null)
    setStatus('idle')
    window.setTimeout(() => nameRef.current?.focus(), 60)
  }

  const mailto = useMemo(() => {
    if (!sent) return `mailto:${contacts.email}`
    const subject = `Заявка с сайта — ${sent.name}`
    return `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      sent.request,
    )}`
  }, [contacts.email, sent])

  return (
    <Section id="contact" labelledBy="contact-title" className="relative overflow-hidden pt-20 pb-0 sm:pt-28 lg:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora absolute inset-x-0 top-[-10%] h-[560px] opacity-80" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
        <div className="noise-layer absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-14">
          {/* ---------- left: pitch + contacts ---------- */}
          <div>
            <Reveal>
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-soft shadow-[0_0_10px_2px_rgba(122,155,255,0.7)]" />
                Контакты
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h2
                id="contact-title"
                className="mt-6 text-[clamp(1.95rem,4.6vw,3.4rem)] leading-[1.06] tracking-[-0.04em]"
              >
                Есть идея? <br className="hidden sm:block" />
                <span className="text-gradient">Давайте превратим её</span> в работающий продукт
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-mist sm:text-[1.04rem]">
                Расскажите о своей задаче — вместе найдём лучшее решение для вашего проекта.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={telegramUrl(contacts.telegram)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-1 items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-soft/35 hover:bg-electric/[0.09]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-[linear-gradient(150deg,rgba(61,107,255,0.28),rgba(124,212,255,0.12))] text-white">
                    <TelegramIcon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.66rem] font-semibold tracking-[0.14em] text-mist/65 uppercase">
                      Telegram
                    </span>
                    <span className="mt-0.5 block truncate text-[0.9rem] font-semibold text-white">
                      {telegramLabel(contacts.telegram)}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-mist/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>

                <a
                  href={`mailto:${contacts.email}`}
                  className="group flex flex-1 items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-soft/35 hover:bg-electric/[0.09]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-[linear-gradient(150deg,rgba(139,92,246,0.3),rgba(124,212,255,0.1))] text-white">
                    <MailIcon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.66rem] font-semibold tracking-[0.14em] text-mist/65 uppercase">
                      E-mail
                    </span>
                    <span className="mt-0.5 block truncate text-[0.9rem] font-semibold text-white">
                      {contacts.email}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-mist/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.76rem] leading-relaxed text-mist/60">
                  Отвечаю в течение рабочего дня.
                </p>
                <button
                  type="button"
                  onClick={() => setEditing((v) => !v)}
                  aria-expanded={editing}
                  aria-controls="contacts-editor"
                  className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 px-3 py-1.5 text-[0.74rem] font-medium text-mist transition-colors hover:border-white/22 hover:text-white sm:self-auto"
                >
                  <EditIcon className="h-3 w-3" />
                  {editing ? 'Скрыть редактор' : 'Изменить контакты'}
                </button>
              </div>
            </Reveal>

            <ContactsEditor
              open={editing}
              contacts={contacts}
              onUpdate={onUpdateContacts}
              onReset={onResetContacts}
            />
          </div>

          {/* ---------- right: form ---------- */}
          <Reveal delay={120}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-[1.7rem] bg-[linear-gradient(150deg,rgba(122,155,255,0.5),rgba(139,92,246,0.22)_40%,transparent_66%)] opacity-70"
              />
              <div className="relative rounded-[1.7rem] border border-white/[0.08] bg-[linear-gradient(168deg,#0b0e18,#070911)] p-5 shadow-[0_50px_120px_-50px_rgba(0,0,0,1)] sm:p-7">
                {status === 'success' && sent ? (
                  <SuccessPanel
                    sent={sent}
                    contacts={contacts}
                    mailto={mailto}
                    copied={copied}
                    onCopy={() => void copy(sent.request).then((ok) => setCopied(ok))}
                    onReset={resetForm}
                  />
                ) : (
                  <form ref={formRef} onSubmit={submit} noValidate className="flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-[1.15rem] leading-tight tracking-[-0.02em] text-white">
                          Расскажите о проекте
                        </h3>
                        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist">
                          Три поля — и я смогу вернуться с конкретным предложением.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                      <Field
                        id="contact-name"
                        label="Ваше имя"
                        error={fieldError('name')}
                        hint="Как к вам обращаться"
                      >
                        <input
                          ref={nameRef}
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={(e) => update('name', e.target.value)}
                          onBlur={() => blur('name')}
                          aria-invalid={Boolean(fieldError('name'))}
                          aria-describedby={fieldError('name') ? 'contact-name-error' : undefined}
                          placeholder="Александр"
                          className={inputClass(Boolean(fieldError('name')))}
                        />
                      </Field>

                      <Field
                        id="contact-value"
                        label="Контакт для связи"
                        error={fieldError('contact')}
                        hint="Telegram, e-mail или телефон"
                      >
                        <input
                          id="contact-value"
                          name="contact"
                          type="text"
                          autoComplete="email"
                          value={values.contact}
                          onChange={(e) => update('contact', e.target.value)}
                          onBlur={() => blur('contact')}
                          aria-invalid={Boolean(fieldError('contact'))}
                          aria-describedby={fieldError('contact') ? 'contact-value-error' : undefined}
                          placeholder="@username или mail@example.com"
                          className={inputClass(Boolean(fieldError('contact')))}
                        />
                      </Field>

                      <Field
                        id="contact-project"
                        label="Описание проекта"
                        error={fieldError('project')}
                        hint={`${values.project.trim().length}/1200`}
                      >
                        <textarea
                          ref={projectRef}
                          id="contact-project"
                          name="project"
                          rows={5}
                          maxLength={1200}
                          value={values.project}
                          onChange={(e) => update('project', e.target.value)}
                          onBlur={() => blur('project')}
                          aria-invalid={Boolean(fieldError('project'))}
                          aria-describedby={fieldError('project') ? 'contact-project-error' : undefined}
                          placeholder="Какой сайт нужен, для какой задачи, есть ли примеры и сроки"
                          className={`${inputClass(Boolean(fieldError('project')))} resize-y leading-relaxed`}
                        />
                      </Field>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {services.slice(0, 4).map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() =>
                            update(
                              'project',
                              values.project.trim()
                                ? `${values.project.trim()}\n\nФормат: ${service.title}`
                                : `Интересует формат «${service.title}». Задача: `,
                            )
                          }
                          className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 text-[0.71rem] text-mist transition-colors hover:border-electric-soft/35 hover:bg-electric/10 hover:text-white"
                        >
                          + {service.title}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(100deg,#4d78ff_0%,#7c5cff_55%,#9d7bff_100%)] px-6 py-3.5 text-[0.92rem] font-semibold text-white shadow-[0_12px_38px_-12px_rgba(93,108,255,0.9),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_54px_-14px_rgba(120,110,255,1)] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
                    >
                      {status === 'loading' ? (
                        <>
                          <SpinnerIcon className="h-4 w-4" />
                          Отправляем…
                        </>
                      ) : (
                        <>
                          Отправить заявку
                          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="mt-3 text-center text-[0.72rem] leading-relaxed text-mist/55">
                      Нажимая кнопку, вы соглашаетесь на обработку данных для ответа на заявку.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- pieces ---------------- */

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-black/35 px-3.5 py-3 text-[0.9rem] text-white placeholder:text-mist/40 transition-colors duration-300 outline-none ${
    hasError
      ? 'border-[#ff6b6b]/55 focus:border-[#ff6b6b]/80'
      : 'border-white/[0.1] focus:border-electric-soft/60 focus:bg-black/45'
  }`
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.78rem] font-semibold tracking-[0.03em] text-fog">
          {label}
        </label>
        {hint ? <span className="text-[0.68rem] text-mist/45 tabular-nums">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.74rem] text-[#ff8b8b]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function SuccessPanel({
  sent,
  contacts,
  mailto,
  copied,
  onCopy,
  onReset,
}: {
  sent: { request: string; name: string }
  contacts: Contacts
  mailto: string
  copied: boolean
  onCopy: () => void
  onReset: () => void
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#37b9a4]/40 bg-[#37b9a4]/15 text-[#5be0c8]">
          <CheckIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[0.66rem] font-semibold tracking-[0.15em] text-[#5be0c8] uppercase">
            Заявка сформирована
          </p>
          <h3 className="mt-0.5 font-display text-[1.15rem] leading-tight tracking-[-0.02em] text-white">
            Спасибо, {sent.name}!
          </h3>
        </div>
      </div>

      <p className="mt-4 text-[0.86rem] leading-relaxed text-mist">
        Остался последний шаг — отправить заявку мне. Текст уже скопирован в буфер обмена: откройте
        Telegram и вставьте его в чат, либо отправьте письмо одним нажатием.
      </p>

      <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/35 p-3.5">
        <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-mist/50 uppercase">
          Текст заявки
        </p>
        <pre className="mt-2 max-h-40 overflow-y-auto font-sans text-[0.78rem] leading-relaxed break-words whitespace-pre-wrap text-fog/80">
          {sent.request}
        </pre>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        <a
          href={telegramUrl(contacts.telegram)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#4d78ff_0%,#7c5cff_55%,#9d7bff_100%)] px-6 py-3.5 text-[0.9rem] font-semibold text-white shadow-[0_12px_38px_-12px_rgba(93,108,255,0.9)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <TelegramIcon className="h-4 w-4" />
          Открыть Telegram
        </a>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={mailto}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-5 py-3 text-[0.86rem] font-semibold text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <MailIcon className="h-4 w-4" />
            На e-mail
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-5 py-3 text-[0.86rem] font-semibold text-fog transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            {copied ? <CheckIcon className="h-4 w-4 text-[#5be0c8]" /> : <CopyGlyph />}
            {copied ? 'Скопировано' : 'Скопировать'}
          </button>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="mt-1 self-center text-[0.79rem] text-mist underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    </div>
  )
}

function CopyGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11.5" height="11.5" rx="2.2" />
      <path d="M15 5.5A2 2 0 0 0 13 3.5H5.5a2 2 0 0 0-2 2V13a2 2 0 0 0 2 2" />
    </svg>
  )
}

function ContactsEditor({
  open,
  contacts,
  onUpdate,
  onReset,
}: {
  open: boolean
  contacts: Contacts
  onUpdate: (next: Partial<Contacts>) => void
  onReset: () => void
}) {
  const [telegram, setTelegram] = useState(contacts.telegram)
  const [email, setEmail] = useState(contacts.email)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!open) return
    setTelegram(contacts.telegram)
    setEmail(contacts.email)
    setError(null)
    setSaved(false)
  }, [open, contacts.telegram, contacts.email])

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const handle = telegram.trim()
    const mail = email.trim()

    if (!handle && !mail) {
      setError('Заполните хотя бы один способ связи')
      return
    }
    if (mail && !isEmail(mail)) {
      setError('Проверьте формат e-mail')
      return
    }
    if (handle && !/^@?[a-zA-Z0-9_.]{4,}$/.test(handle)) {
      setError('Telegram-username: латиница, от 4 символов, например @studio_dev')
      return
    }

    onUpdate({
      telegram: handle || contacts.telegram,
      email: mail || contacts.email,
    })
    setError(null)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2600)
  }

  return (
    <div
      id="contacts-editor"
      className={`acc-panel ${open ? '' : ''}`}
      data-open={open ? 'true' : 'false'}
      aria-hidden={!open}
    >
      <div>
        <form
          onSubmit={save}
          noValidate
          className="mt-3 rounded-2xl border border-white/[0.09] bg-white/[0.028] p-4 backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-mist/70 uppercase">
              Редактор контактов
            </p>
            <button
              type="button"
              onClick={onReset}
              className="text-[0.72rem] text-mist/70 underline decoration-white/15 underline-offset-4 transition-colors hover:text-white"
            >
              Сбросить
            </button>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            <div>
              <label htmlFor="editor-telegram" className="mb-1 block text-[0.72rem] text-mist/70">
                Telegram
              </label>
              <input
                id="editor-telegram"
                type="text"
                value={telegram}
                onChange={(e) => {
                  setTelegram(e.target.value)
                  setError(null)
                }}
                placeholder="@username"
                className={inputClass(false)}
              />
            </div>
            <div>
              <label htmlFor="editor-email" className="mb-1 block text-[0.72rem] text-mist/70">
                E-mail
              </label>
              <input
                id="editor-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null)
                }}
                placeholder="mail@example.com"
                className={inputClass(false)}
              />
            </div>
          </div>

          {error ? (
            <p role="alert" className="mt-2 text-[0.74rem] text-[#ff8b8b]">
              {error}
            </p>
          ) : null}

          <div className="mt-3 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-white/[0.08] px-4 py-2 text-[0.79rem] font-semibold text-white transition-colors hover:bg-white/[0.14]"
            >
              Сохранить
            </button>
            {saved ? (
              <span className="inline-flex items-center gap-1.5 text-[0.75rem] text-[#5be0c8]">
                <CheckIcon className="h-3.5 w-3.5" />
                Сохранено
              </span>
            ) : (
              <span className="text-[0.72rem] text-mist/55">Контакты сохраняются в этом браузере</span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
