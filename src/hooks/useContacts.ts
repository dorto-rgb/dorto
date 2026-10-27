import { useCallback, useEffect, useState } from 'react'
import { defaultContacts, isEmail, type Contacts } from '../site'

const STORAGE_KEY = 'appjet.contacts.v1'

function readStored(): Contacts {
  if (typeof window === 'undefined') return defaultContacts
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultContacts
    const parsed = JSON.parse(raw) as Partial<Contacts>
    return {
      telegram: typeof parsed.telegram === 'string' && parsed.telegram.trim() ? parsed.telegram : defaultContacts.telegram,
      email: typeof parsed.email === 'string' && isEmail(parsed.email) ? parsed.email : defaultContacts.email,
    }
  } catch {
    return defaultContacts
  }
}

/**
 * Контакты хранятся локально и могут быть отредактированы из интерфейса.
 * Хук синхронизирует состояние между всеми блоками сайта.
 */
export function useContacts() {
  const [contacts, setContacts] = useState<Contacts>(readStored)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
    } catch {
      /* приватный режим — просто не сохраняем */
    }
  }, [contacts])

  const update = useCallback((next: Partial<Contacts>) => {
    setContacts((prev) => ({ ...prev, ...next }))
  }, [])

  const reset = useCallback(() => setContacts(defaultContacts), [])

  return { contacts, update, reset }
}
