import { ExamProvider, useExam } from './context/ExamContext'
import HomeScreen from './components/HomeScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import StatusBar from './components/StatusBar'
import { useState, useEffect } from 'react'

function Header() {
  const { state } = useExam()
  const [displayTime, setDisplayTime] = useState('--:--')

  useEffect(() => {
    if (state.screen === 'quiz' && state.timeLeft > 0) {
      const updateTime = () => {
        const m = Math.floor(state.timeLeft / 60)
        const s = state.timeLeft % 60
        setDisplayTime(`${m}:${s.toString().padStart(2,'0')}`)
      }
      updateTime()
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }
  }, [state.screen, state.timeLeft])

  const answered = state.screen === 'quiz' && state.answers
    ? Object.values(state.answers).filter(a => a !== null && a !== undefined).length
    : 0

  const numQuestions = state.questions?.length || 0
  const progress = state.screen === 'quiz' && numQuestions > 0
    ? `${answered}/${numQuestions}` : '0/0'

  return (
    <header>
      <div>
        <h1>Simulador GVA · Ayudante de Cocina</h1>
      </div>
      <div className="pill">
        <span>Tiempo: <strong>{displayTime}</strong></span>
        <span>Progreso: <strong>{progress}</strong></span>
      </div>
    </header>
  )
}

function AppContent() {
  const { state } = useExam()
  const screen = state.screen || 'home'

  return (
    <div className="wrap">
      <div className="card">
        {screen === 'home' && <HomeScreen />}
        {screen === 'quiz' && (
          <>
            <Header />
            <main>
              <QuizScreen />
              <StatusBar />
            </main>
          </>
        )}
        {screen === 'result' && (
          <>
            <Header />
            <main>
              <ResultScreen />
            </main>
          </>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ExamProvider>
      <AppContent />
    </ExamProvider>
  )
}