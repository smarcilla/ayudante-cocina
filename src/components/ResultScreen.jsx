import { useExam } from '../context/ExamContext'

export default function ResultScreen() {
  const { state, dispatch } = useExam()
  const { questions, answers } = state

  if (!questions?.length) return null

  let ok = 0, ko = 0, bl = 0
  const answersToUse = answers || {}

  questions.forEach((q, i) => {
    const ans = answersToUse[i]
    if (ans === null || ans === undefined) bl++
    else if (ans === q.correct) ok++
    else ko++
  })

  const finalScore = ok - (ko * 0.25)
  const numQuestions = questions.length
  const percent = numQuestions > 0 ? (finalScore / numQuestions) * 100 : 0

  let analysis = ''
  if (percent >= 80) {
    analysis = '<strong>Nivel Plaza!</strong> Estás en un estado de forma excelente. Sigue repasando los fallos puntuales para asegurar el 10 en el oficial.'
  } else if (percent >= 50) {
    analysis = '<strong>Bien, pero falta pulir.</strong> Has aprobado, pero en una oposición real dependes de la nota de corte. Necesitas asegurar más temas específicos.'
  } else {
    analysis = '<strong>Toca hincar los codos.</strong> Los conceptos generales están flojos. Te recomiendo repasar las explicaciones de abajo y volver a intentarlo en modo entrenamiento.'
  }

  const handleRestart = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <>
      <div className="coach-box" dangerouslySetInnerHTML={{ __html: analysis }} />
      
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:10, marginBottom:30}}>
        <div className="panel" style={{textAlign:'center', margin:0}}>
          <small>Nota Final</small>
          <div style={{fontSize:24, fontWeight:900}}>{finalScore.toFixed(2)}</div>
        </div>
        <div className="panel" style={{textAlign:'center', margin:0}}>
          <small>Aciertos</small>
          <div style={{color:'var(--good)', fontSize:20}}>{ok}</div>
        </div>
        <div className="panel" style={{textAlign:'center', margin:0}}>
          <small>Fallos</small>
          <div style={{color:'var(--bad)', fontSize:20}}>{ko}</div>
        </div>
        <div className="panel" style={{textAlign:'center', margin:0}}>
          <small>Blancas</small>
          <div style={{color:'var(--warn)', fontSize:20}}>{bl}</div>
        </div>
      </div>

      <h3 style={{borderBottom:'1px solid var(--line)', paddingBottom:10}}>Revisión de Fallos</h3>
      <div>
        {questions.map((q, i) => {
          const ans = answersToUse[i]
          let statusClass = 'null'
          if (ans === null || ans === undefined) statusClass = 'null'
          else if (ans === q.correct) statusClass = 'ok'
          else statusClass = 'ko'

          return (
            <div key={i} className={`review-item ${statusClass}`}>
              <div style={{fontWeight:'bold', marginBottom:5}}>{i + 1}. {q.question}</div>
              <div style={{fontSize:13}}>
                Tu respuesta: <span style={{color: ans === q.correct ? 'var(--good)' : 'var(--bad)'}}>
                  {ans !== null && ans !== undefined ? q.options[ans] : 'En blanco'}
                </span><br />
                Correcta: <span style={{color:'var(--good)'}}>{q.options[q.correct]}</span>
              </div>
              {q.explanation && (
                <div className="exp"><strong>Explicación:</strong> {q.explanation}</div>
              )}
            </div>
          )
        })}
      </div>
      
      <button onClick={handleRestart} style={{width:'100%', marginTop:20}}>VOLVER AL INICIO</button>
    </>
  )
}