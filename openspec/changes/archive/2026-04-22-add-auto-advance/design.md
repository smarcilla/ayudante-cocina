## Context

La app React actual tiene el componente QuizScreen que espera a que el usuario clicke "SIGUIENTE" tras cada respuesta. El cambio añade auto-avance inmediato tras seleccionar.

## Goals / Non-Goals

**Goals:**

- Auto-avance después de seleccionar respuesta
- Mantener navegación manual como fallback
- No avanzar si es última pregunta

**Non-Goals:**

- No cambiar scoring
- No cambiar UI visual
- No añadir keyboard shortcuts

## Decisions

### D1: Timing del advance

- **Alternativas**: Instantáneo vs con delay (200ms)
- **Razón**: delay breve (200ms) permite al usuario ver la selección antes de avançar previene clicks accidentales

### D2: Comportamiento en última pregunta

- **Alternativas**: Quedarse vs mostrar alert vs ir a primera
- **Razón**: Quedarse es lo esperado, no confuse al usuario

### D3: Skip questions sin respuesta

- **Alternativas**: Respetar blancas al auto-avance vs skip automático
- **Razón**: Respetar blancas dacontrol al usuario

## Risks / Trade-offs

- **[Risk]** Click accidental en móvil → **Mitigation**: delay de 200ms antes del advance
- **[Risk]** Usuario quiere mantener respuesta → **Mitigation**: Solo avanza si hace click, no si toca

## Migration Plan

1. Modificar QuizScreen.jsx
2. Añadir setTimeout(200ms) antes de dispatch NAVIGATE
3. Verificar con react-doctor
4. Build y test

## Open Questions

- ¿200ms es buen delay? ¿Quizás 150ms? Si.
- ¿Añadir setting para disable auto-avance? No.
