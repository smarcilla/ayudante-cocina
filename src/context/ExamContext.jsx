import { createContext, useContext, useReducer, useEffect } from 'react'

const ExamContext = createContext(null)

const initialState = {
  screen: 'home',
  exam: null,
  questions: [],
  answers: {},
  current: 0,
  timeLeft: 0,
  timerId: null,
}

function examReducer(state, action) {
  switch (action.type) {
    case 'SET_EXAM':
      return {
        ...initialState,
        exam: action.payload.exam,
        questions: action.payload.questions || [],
        answers: action.payload.answers || {},
        screen: 'quiz',
        current: 0,
      }
    case 'ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.index]: action.payload.answer },
      }
    case 'NAVIGATE':
      return { ...state, current: action.payload }
    case 'TICK':
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      }
    case 'FINISH':
      return { ...state, screen: 'result', timerId: null }
    case 'SET_TIMER':
      return { ...state, timeLeft: action.payload }
    case 'START_TIMER':
      return { ...state, timerId: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function ExamProvider({ children }) {
  const [state, dispatch] = useReducer(examReducer, initialState)

  return (
    <ExamContext.Provider value={{ state, dispatch }}>
      {children}
    </ExamContext.Provider>
  )
}

export function useExam() {
  const context = useContext(ExamContext)
  if (!context) {
    throw new Error('useExam must be used within ExamProvider')
  }
  return context
}

export function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

export function selectQuestionsByBlocks(exam) {
  const questions = []
  exam.config.blocks.forEach(block => {
    const blockQuestions = exam.questions
      .filter(q => q.block === block.id)
      .sort(() => Math.random() - 0.5)
    questions.push(...blockQuestions.slice(0, block.numQuestions))
  })
  return questions
}