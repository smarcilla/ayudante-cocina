## Why

Al hacer exámenes largos (30 preguntas), el flujo actual obliga a hacer click en "SIGUIENTE" después de cada respuesta. Esto frena el ritmo y hace el examen más lento y menos fluido. Auto-avance mejora la velocidad de respuesta.

## What Changes

- Añadir auto-avance al seleccionar respuesta
- Navegar automáticamente a la siguiente pregunta tras seleccionar opción
- Si es última pregunta, permanecer en ella (no avanzar)
- Omitir preguntas en blanco al entregas (solo las contestadas)

### Breaking Changes
- Ninguno. Comportamiento adicional, no replace.

## Capabilities

### New Capabilities
- `auto-advance`: Al seleccionar opción, avanzar a siguiente pregunta automáticamente

### Modified Capabilities
- Ninguno (mejora de UX sobreQuizScreen existente)

## Impact

- `QuizScreen.jsx`: Añadir lógica de advance tras ANSWER
- UI sin cambios visuales necesarios