## Context

StatusBar.jsx existe pero no se renderiza en App.jsx. Componente existente con lógica completa para responder/navegar.

## Goals / Non-Goals

**Goals:**
- Mostrar StatusBar en pantalla Quiz

**Non-Goals:**
- No cambiar lógica de StatusBar (ya funciona)

## Implementation

Simple: añadir import y renderizado en App.jsx:
```jsx
import StatusBar from './components/StatusBar'

// En el return del quiz:
<QuizScreen />
<StatusBar />
```

## Placement Decision

```
┌──────────────────────────────────────┐
│  Header                           │
├──────────────────────────────────────┤
│  QuizScreen                      │
│  (pregunta + opciones)             │
├──────────────────────────────────────┤
│  StatusBar                      │  ← AÑADIR AQUÍ
│  [1][2][3][4][5]...           │
└──────────────────────────────────────┘
```

Ubicación: Debajo de QuizScreen, antes de closing `<main>`.

## Risks

- **[Risk]** Ninguno. Componente simple ya	testeado