## Why

El simulador actual es un archivo HTML único con CSS/JS inline. Funciona, pero mantenerlo y extenderlo es difícil. Migrar a React permitirá:
- Componentes reutilizables
- Estado predecible con hooks
- Testing posible
- Escalabilidad para más features (themes, progreso guardado, multiplayer...)

## What Changes

- **Nuevo stack**: React 18 + Vite (o React vanilla si se prefiere)
- **Arquitectura de componentes**: Separar UI de lógica de negocio
- **Estado global**: useReducer o Context para answers/timer
- **Carga de JSON**: Endpoint API o import estático
- **Transiciones**: Pantallas con animaciones fluidas
- **Persistancia**: localStorage para guardar progreso

### Breaking Changes
- UI visual similar pero estructura de DOM diferente
- El archivo JSON se cargará igual (compatibilidad hacia atrás)

## Capabilities

### New Capabilities
- `exam-state-management`: Estado global para preguntas, respuestas, timer, puntuación
- `component-architecture`: Componentes React (Home, Quiz, Result, StatusBar...)
- `json-file-loader`: Carga y parsing del archivo exam.json
- `timer-system`: Countdown con auto-submit al llegar a 0
- `scoring-engine`: Cálculo de nota con penalización -0.25
- `coach-analysis`: Análisis post-examen según puntuación

### Modified Capabilities
- (Ninguno - es una reescritura completa desde cero)

## Impact

- `index.html` → se migra a componentes React
- `exam.json` → se mantiene compatible
- Nuevas dependencias: react, react-dom
- Deprecado: vanilla JS inline