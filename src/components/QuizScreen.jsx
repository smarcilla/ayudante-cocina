import { useEffect, useRef } from 'react'
import { useExam } from '../context/ExamContext'

export default function QuizScreen() {
  const { state, dispatch } = useExam()
  const { questions, current, answers, timeLeft } = state
  const timerRef = useRef(null)

  useEffect(() => {
    if (state.screen === 'quiz' && timeLeft > 0) {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          dispatch({ type: 'TICK' })
        }, 1000)
        dispatch({ type: 'START_TIMER', payload: timerRef.current })
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [state.screen])

  useEffect(() => {
    if (timeLeft <= 0 && state.screen === 'quiz') {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      dispatch({ type: 'FINISH' })
    }
  }, [timeLeft, state.screen])

  const q = questions?.[current]
  if (!q || !questions?.length) return null

  const handleAnswer = (idx) => {
    dispatch({ type: 'ANSWER', payload: { index: current, answer: idx } })
  }

  const handlePrev = () => {
    if (current > 0) dispatch({ type: 'NAVIGATE', payload: current - 1 })
  }

  const handleNext = () => {
    if (current < (questions?.length || 0) - 1) dispatch({ type: 'NAVIGATE', payload: current + 1 })
  }

  const handleFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    dispatch({ type: 'FINISH' })
  }

  const currentAnswers = answers || {}
  const options = q.options || []

  return (
    <div className="panel">
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:15, fontSize:12, color:'var(--muted)'}}>
        <span>PREGUNTA {current + 1} DE {questions?.length || 0}</span>
        <button className="ghost" style={{padding:'5px 10px'}} onClick={handleFinish}>ENTREGAR EXAMEN</button>
      </div>
      <p style={{fontSize:'1.1rem', fontWeight:500, minHeight:60}}>{q.question}</p>
      <div>
        {options.map((opt, idx) => {
          const isSelected = currentAnswers[current] === idx
          return (
            <div
              key={idx}
              className={`opt ${isSelected ? 'selected' : ''}`}
              onClick={() => handleAnswer(idx)}
            >
              <span style={{opacity:0.5, fontWeight:'bold'}}>{String.fromCharCode(65 + idx)}</span>
              <span>{opt}</span>
            </div>
          )
        })}
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:15, marginTop:25}}>
        <button className="secondary" onClick={handlePrev} disabled={current === 0}>ANTERIOR</button>
        <button onClick={handleNext} disabled={current >= (questions?.length || 1) - 1}>SIGUIENTE</button>
      </div>
    </div>
  )
}