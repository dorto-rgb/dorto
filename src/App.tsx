import { useCallback, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { Services } from './components/Services'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { TechStack } from './components/TechStack'
import { Pricing } from './components/Pricing'
import { Faq } from './components/Faq'
import { Contact, type Prefill } from './components/Contact'
import { Footer } from './components/Footer'
import { useContacts } from './hooks/useContacts'
import { scrollToSection } from './hooks/useUi'

function App() {
  const { contacts, update, reset } = useContacts()
  const [prefill, setPrefill] = useState<Prefill | null>(null)
  const nonceRef = useRef(0)

  /**
   * Все кнопки «Заказать», «Рассчитать стоимость», «Обсудить» ведут в форму:
   * подставляют текст задачи и прокручивают к блоку контактов.
   */
  const requestConsultation = useCallback((text: string) => {
    nonceRef.current += 1
    setPrefill({ text, nonce: nonceRef.current })
    window.setTimeout(() => scrollToSection('contact'), 30)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-void">
      <Header />

      <main id="main">
        <Hero />
        <Benefits />
        <Services onOrder={(service) => requestConsultation(`Интересует услуга «${service}». Задача: `)} />
        <Portfolio onDiscuss={requestConsultation} />
        <Process onDiscuss={requestConsultation} />
        <TechStack />
        <Pricing onCalculate={requestConsultation} />
        <Faq onDiscuss={requestConsultation} />
        <Contact
          contacts={contacts}
          onUpdateContacts={update}
          onResetContacts={reset}
          prefill={prefill}
        />
      </main>

      <Footer contacts={contacts} />
    </div>
  )
}

export default App
