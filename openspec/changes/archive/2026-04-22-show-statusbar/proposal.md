## Why

El StatusBar existe en el código pero no se renderiza en pantalla. El componente StatusBar.jsx tiene la lógica para mostrar botones de navegación con estado "answered" (color diferente) pero App.jsx no lo incluye en el JSX.

Esto impide al usuario:
- Ver qué preguntas ha contestado (necesita recordar mentalmente)
- Navegar rápidamente a cualquier pregunta
- Ver progreso visual general

## What Changes

- Incluir `<StatusBar />` en App.jsx dentro del flujo quiz
- El StatusBar ya tiene la lógica implementada (clases CSS `answered`, `cur`)

### Breaking Changes
- Ninguno. Solo se añade renderizado de componente existente.

## Capabilities

### Modified Capabilities
- `component-architecture`: Añadir StatusBar visible en pantallaquiz

## Impact

- `App.jsx`: Añadir StatusBar entre Header y QuizScreen