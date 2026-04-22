import { useRef } from 'react'
import { useExam, selectQuestionsByBlocks, shuffleArray } from '../context/ExamContext'

export default function HomeScreen() {
  const { dispatch } = useExam()
  const fileInputRef = useRef(null)

  const handleStart = () => {
    const fileSelector = fileInputRef.current
    if (!fileSelector?.files?.length) {
      alert('Selecciona el JSON del examen.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const exam = JSON.parse(e.target.result)
        const mode = document.getElementById('modeSel')?.value || 'exam'
        
        let questions
        if (mode === 'practice') {
          questions = shuffleArray(exam.questions)
        } else {
          questions = selectQuestionsByBlocks(exam)
        }

        const answers = {}
        questions.forEach((_, i) => { answers[i] = null })
        
        const timeLimit = parseInt(document.getElementById('timeSel')?.value || '115') * 60
        
        dispatch({ type: 'SET_EXAM', payload: { exam, questions } })
        dispatch({ type: 'SET_TIMER', payload: timeLimit })
      } catch {
        alert('Error en el formato del JSON.')
      }
    }
    reader.readAsText(fileSelector.files[0])
  }

  return (
    <div className="panel">
      <h3 style={{marginTop:0}}>Configuración del Test</h3>
      <div style={{marginBottom:20}}>
        <label htmlFor="fileInput" style={{display:'block', marginBottom:8, fontSize:12, color:'var(--muted)'}}>1. CARGAR ARCHIVO JSON</label>
        <input type="file" id="fileInput" ref={fileInputRef} accept=".json" style={{fontSize:14}} />
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:15, marginBottom:20}}>
        <div>
          <label htmlFor="modeSel" style={{display:'block', fontSize:12, color:'var(--muted)'}}>MODO</label>
          <select id="modeSel" style={{width:'100%', padding:10, borderRadius:8, background:'#1b2550', color:'#fff', border:'1px solid var(--line)'}}>
            <option value="exam">Examen Oficial (Aleatorio)</option>
            <option value="practice">Entrenamiento (Todas las preguntas)</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeSel" style={{display:'block', fontSize:12, color:'var(--muted)'}}>TIEMPO</label>
          <select id="timeSel" style={{width:'100%', padding:10, borderRadius:8, background:'#1b2550', color:'#fff', border:'1px solid var(--line)'}}>
            <option value="115">115 minutos</option>
            <option value="60">60 minutos</option>
            <option value="20">20 minutos</option>
          </select>
        </div>
      </div>
      <button onClick={handleStart} style={{width:'100%'}}>EMPEZAR SIMULACIÓN</button>
    </div>
  )
}