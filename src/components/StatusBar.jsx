import { useExam } from '../context/ExamContext'

export default function StatusBar() {
  const { state, dispatch } = useExam()
  const { questions, current, answers } = state

  if (!questions?.length) return null

  const answersToUse = answers || {}

  return (
    <div className="statusbar">
      {questions.map((_, i) => {
        const isCurrent = i === current
        const isAnswered = answersToUse[i] !== undefined && answersToUse[i] !== null
        return (
          <button
            key={i}
            className={`qbtn ${isCurrent ? 'cur' : ''} ${isAnswered ? 'answered' : ''}`}
            onClick={() => dispatch({ type: 'NAVIGATE', payload: i })}
          >
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}