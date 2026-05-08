import { useState } from "react";
import { useExam } from "../context/ExamContext";

export default function ResultScreen() {
  const { state, dispatch } = useExam();
  const { questions, answers } = state;
  const [filter, setFilter] = useState("all");

  if (!questions?.length) return null;

  let ok = 0,
    ko = 0,
    bl = 0;
  const answersToUse = answers || {};

  questions.forEach((q, i) => {
    const ans = answersToUse[i];
    if (ans === null || ans === undefined) bl++;
    else if (ans === q.correct) ok++;
    else ko++;
  });

  const rawScore = ok - ko * (state.penalty || 0);
  const clampedScore = Math.max(0, rawScore);
  const numQuestions = questions.length;
  const nota010 = numQuestions > 0 ? (clampedScore / numQuestions) * 10 : 0;

  let analysis = "";
  if (nota010 >= 8) {
    analysis =
      "<strong>Nivel Plaza!</strong> Estás en un estado de forma excelente. Sigue repasando los fallos puntuales para asegurar el 10 en el oficial.";
  } else if (nota010 >= 5) {
    analysis =
      "<strong>Bien, pero falta pulir.</strong> Has aprobado, pero en una oposición real dependes de la nota de corte. Necesitas asegurar más temas específicos.";
  } else {
    analysis =
      "<strong>Toca hincar los codos.</strong> Los conceptos generales están flojos. Te recomiendo repasar las explicaciones de abajo y volver a intentarlo en modo entrenamiento.";
  }

  const handleRestart = () => {
    dispatch({ type: "RESET" });
  };

  const filterLabels = {
    all: "Todas las preguntas",
    ko: "Fallos",
    null: "Preguntas en blanco",
    ok: "Aciertos",
  };

  const filterCounts = {
    all: questions.length,
    ko: ko,
    null: bl,
    ok: ok,
  };

  return (
    <>
      <div
        className="coach-box"
        dangerouslySetInnerHTML={{ __html: analysis }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 10,
          marginBottom: 30,
        }}
      >
        <div className="panel" style={{ textAlign: "center", margin: 0 }}>
          <small>Nota Final</small>
          <div style={{ fontSize: 24, fontWeight: 900 }}>
            {nota010.toFixed(2)}/10
          </div>
        </div>
        <div className="panel" style={{ textAlign: "center", margin: 0 }}>
          <small>Puntos Brutos</small>
          <div style={{ fontSize: 20 }}>
            {rawScore.toFixed(2)}
          </div>
        </div>
        <div className="panel" style={{ textAlign: "center", margin: 0 }}>
          <small>Aciertos</small>
          <div style={{ color: "var(--good)", fontSize: 20 }}>{ok}</div>
        </div>
        <div className="panel" style={{ textAlign: "center", margin: 0 }}>
          <small>Fallos</small>
          <div style={{ color: "var(--bad)", fontSize: 20 }}>{ko}</div>
        </div>
        <div className="panel" style={{ textAlign: "center", margin: 0 }}>
          <small>Blancas</small>
          <div style={{ color: "var(--warn)", fontSize: 20 }}>{bl}</div>
        </div>
        <div className="panel" style={{ textAlign: "center", margin: 0 }}>
          <small>Penalización</small>
          <div style={{ fontSize: 20 }}>
            {state.penalty === 0
              ? "0"
              : "-" + state.penalty.toFixed(2).replace(/^0/, "")}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {Object.entries(filterLabels).map(([key, label]) => (
          <button
            key={key}
            className={filter === key ? "" : "secondary"}
            onClick={() => setFilter(key)}
          >
            {label} ({filterCounts[key]})
          </button>
        ))}
      </div>

      <h3 style={{ borderBottom: "1px solid var(--line)", paddingBottom: 10 }}>
        {filterLabels[filter]}
      </h3>
      <div>
        {questions.map((q, i) => {
          const ans = answersToUse[i];
          let statusClass;
          if (ans === null || ans === undefined) statusClass = "null";
          else if (ans === q.correct) statusClass = "ok";
          else statusClass = "ko";

          if (filter !== "all" && statusClass !== filter) return null;

          return (
            <div key={i} className={`review-item ${statusClass}`}>
              <div style={{ fontWeight: "bold", marginBottom: 5 }}>
                {i + 1}. {q.question}
              </div>
              <div style={{ fontSize: 13 }}>
                Tu respuesta:{" "}
                <span
                  style={{
                    color: ans === q.correct ? "var(--good)" : "var(--bad)",
                  }}
                >
                  {ans !== null && ans !== undefined
                    ? q.options[ans]
                    : "En blanco"}
                </span>
                <br />
                Correcta:{" "}
                <span style={{ color: "var(--good)" }}>
                  {q.options[q.correct]}
                </span>
              </div>
              {q.explanation && (
                <div className="exp">
                  <strong>Explicación:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button onClick={handleRestart} style={{ width: "100%", marginTop: 20 }}>
        VOLVER AL INICIO
      </button>
    </>
  );
}
