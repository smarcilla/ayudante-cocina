import { useRef } from "react";
import {
  useExam,
  selectQuestionsByBlocks,
  shuffleArray,
} from "../context/ExamContext";
import { EXAM_CONFIG } from "../config";

export default function HomeScreen() {
  const { dispatch } = useExam();
  const fileInputRef = useRef(null);

  const handleStart = () => {
    const fileSelector = fileInputRef.current;
    if (!fileSelector?.files?.length) {
      alert("Selecciona el JSON del examen.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const exam = JSON.parse(e.target.result);
        const mode = document.getElementById("modeSel")?.value || "exam";

        const timeVal = Number.parseInt(
          document.getElementById("timeSel")?.value ||
            EXAM_CONFIG.timeMinutes.default,
        );
        const penaltyVal = Number.parseFloat(
          document.getElementById("penaltySel")?.value ||
            EXAM_CONFIG.penalty.default,
        );

        const errors = [];
        if (mode === "exam") {
          for (const block of EXAM_CONFIG.blocks.default) {
            const available = exam.questions.filter(
              (q) => q.block === block.id,
            ).length;
            if (available < block.numQuestions) {
              errors.push(
                `${block.label}: necesita ${block.numQuestions}, encontradas ${available}`,
              );
            }
          }
        }

        if (errors.length > 0) {
          alert(
            "El JSON no tiene suficientes preguntas:\n" + errors.join("\n"),
          );
          return;
        }

        let questions;
        if (mode === "practice") {
          questions = shuffleArray(exam.questions);
        } else {
          questions = selectQuestionsByBlocks(exam);
        }

        const answers = {};
        questions.forEach((_, i) => {
          answers[i] = null;
        });

        const timeLimit = timeVal * 60;

        dispatch({
          type: "SET_EXAM",
          payload: { exam, questions, penalty: penaltyVal },
        });
        dispatch({ type: "SET_TIMER", payload: timeLimit });
      } catch {
        alert("Error en el formato del JSON.");
      }
    };
    reader.readAsText(fileSelector.files[0]);
  };

  const selectStyle = {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    background: "#1b2550",
    color: "#fff",
    border: "1px solid var(--line)",
  };

  return (
    <div className="panel">
      <h3 style={{ marginTop: 0 }}>Configuración del Test</h3>
      <div style={{ marginBottom: 20 }}>
        <label
          htmlFor="fileInput"
          style={{
            display: "block",
            marginBottom: 8,
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          1. CARGAR ARCHIVO JSON
        </label>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          accept=".json"
          style={{ fontSize: 14 }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 15,
          marginBottom: 20,
        }}
      >
        <div>
          <label
            htmlFor="modeSel"
            style={{ display: "block", fontSize: 12, color: "var(--muted)" }}
          >
            MODO
          </label>
          <select id="modeSel" style={selectStyle}>
            <option value="exam">Examen Oficial (Aleatorio)</option>
            <option value="practice">
              Entrenamiento (Todas las preguntas)
            </option>
          </select>
        </div>
        <div>
          <label
            htmlFor="timeSel"
            style={{ display: "block", fontSize: 12, color: "var(--muted)" }}
          >
            TIEMPO
          </label>
          <select
            id="timeSel"
            defaultValue={EXAM_CONFIG.timeMinutes.default}
            style={selectStyle}
          >
            {EXAM_CONFIG.timeMinutes.options.map((min) => (
              <option key={min} value={min}>
                {min} minutos
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="penaltySel"
            style={{ display: "block", fontSize: 12, color: "var(--muted)" }}
          >
            PENALIZACIÓN
          </label>
          <select
            id="penaltySel"
            defaultValue={EXAM_CONFIG.penalty.default}
            style={selectStyle}
          >
            {EXAM_CONFIG.penalty.options.map((p) => (
              <option key={p} value={p}>
                -{p === 0 ? "0" : p.toFixed(2).replace(/^0/, "")} por fallo
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleStart} style={{ width: "100%" }}>
        EMPEZAR SIMULACIÓN
      </button>
    </div>
  );
}
