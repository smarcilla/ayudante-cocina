## Context

El simulador actual es un archivo HTML con 257 líneas de código inline (CSS + JS). La migración a React requiere decisiones de arquitectura.

### Estado Actual
- 1 archivo HTML con todo junto
- Estado global en variables JS (`state = {}`)
- Timer con `setInterval`
- Navegación por visibility toggle (display:none/block)

### Restricciones
- Mantener compatibilidad con `exam.json`
- UI similar visualmente (mismo look & feel)
- Sin servidor necesario (SPA estática)
- Mantenible a largo plazo

## Goals / Non-Goals

**Goals:**
- Migrar a React 18 con Vite
- Componentes limpios y testeables
- Estado predecible con useReducer
- Transiciones suaves entre pantallas
- Persistir progreso en localStorage

**Non-Goals:**
-Añadir autenticación o backend
- Cambiar el formato de exam.json
- Multiidioma en esta versión
- Modo offline (PWA)

## Decisions

### D1: Stack = React 18 + Vite
- **Alternativas**: Next.js (overkill), vanilla React (sin tooling), CRA (deprecated)
- **Razón**: Vite = dev fast, build optimizado, zero-config. React 18 = Concurrent mode para future.

### D2: Estado = useReducer + Context
- **Alternativas**: Redux (overkill), Zustand (extra dep), useState only (fragments)
- **Razón**: Acciones complejas (answer, tick, finish), debugging con Redux DevTools opcional.

### D3: Routing = Zustand + Conditionals
- **Alternativas**: react-router (extra dep), conditional rendering nativo
- **Razón**: Solo 3 pantallas, noneed for routing library. URL state no needed.

### D4: Styling = CSS Modules o Styled Components
- **Alternativas**: Tailwind (extra setup), inline styles (messy), emotion (extra dep)
- **Razón**: CSS Modules = scoped, zero-dep, migrate渐进. Mantener variables CSS exactas.

### D5: Timer = useEffect + setInterval con cleanup
- **Alternativas**: Web Workers (overkill), requestAnimationFrame (too precise)
- **Razón**: Simple interval con clearInterval on unmount es suficiente.

## Risks / Trade-offs

- **[Risk]** UI diferente al original → **Mitigation**: Copiar colores y spacing exactos de CSS variables
- **[Risk]** Breaking existing exam.json → **Mitigation**: Same parser, validation schemático
- **[Risk]** Performance timer React 18 → **Mitigation**: useRef for interval, no re-renders on tick (solo state update)

## Migration Plan

1. Inicializar proyecto Vite + React
2. Crear структуру componentes
3. Migrar lógica de negocio (exam, quiz, scoring)
4. Añadir estilos (CSS Modules)
5. Verificar funcionalidad vs index.html original
6. desplegar / reemplazar

## Open Questions

- ¿Queréis CSS Modules o styled-components o Tailwind?
- ¿Añadir tests con Vitest + React Testing Library?
- ¿Guardar progreso automáticamente o solo al final?