## Context

The exam simulator is a single-page React app for GVA 84/26 (Ayudante de Cocina) preparation. Exam parameters are currently scattered: penalty hardcoded in `ResultScreen.jsx:19` as `ko * 0.25`, default time in `HomeScreen.jsx:31` as `value="115"`, and block structure defined inside `exam.json`. The codebase has zero existing spec files under `openspec/specs/`. The app loads a question bank JSON at runtime via file selector.

## Goals / Non-Goals

**Goals:**
- Single source of truth for all exam parameters in `src/config.js`
- Each parameter has explicit `default` and `options` fields
- UI controls render dynamically from config options with config defaults pre-selected
- JSON validation on load confirms question bank meets structural requirements
- Scoring uses the user-selected penalty rate
- Default values match spec_4.md: 60 questions (28+32), 60 min, -0.33 penalty

**Non-Goals:**
- No changes to question content or difficulty (difficulty increment deferred)
- No persistent storage of user preferences (localStorage, accounts)
- No server-side configuration
- No changes to quiz navigation (StatusBar already works dynamically)

## Decisions

### 1. Config shape: nested `{ default, options }` per parameter

Each configurable parameter follows `{ default: <value>, options: [<values>] }`. This gives the UI a single import to populate selects and set initial values. Block structure uses `default: [{id, numQuestions}]` since it's an array.

**Alternatives considered:**
- Flat object with separate defaults object — harder to keep synchronized
- Config only in JSON — violates "configurable" requirement, forces file edits for UI changes

### 2. Validation location: synchronous in HomeScreen before dispatch

Validation runs in `handleStart` in HomeScreen, before any dispatch. If validation fails, an `alert()` blocks exam start. No new async flows or error screens needed.

**Alternatives considered:**
- Validation in ExamContext reducer — would require new error state and UI handling
- Separate validation utility — overkill for two simple array-length checks

### 3. Penalty propagation: stored in ExamContext state

The selected penalty value is included in the `SET_EXAM` dispatch payload and stored in state. ResultScreen reads `state.penalty` for scoring. This avoids prop drilling or re-importing config.

**Alternatives considered:**
- ResultScreen imports config directly — would use the default, not user's selection
- Global context for config — overkill for one value

### 4. Block structure: config.js overrides exam.json's config section

`selectQuestionsByBlocks` reads from `config.js` instead of `exam.config.blocks`. The exam.json config section becomes irrelevant for question selection. Validation still uses the loaded JSON to count available questions per block.

**Alternatives considered:**
- Merge config from both sources — ambiguous precedence, harder to debug
- Remove config from exam.json — breaking change if external consumers depend on it

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Question bank has < 28 general or < 32 specific questions | Exam cannot start | Clear alert message: "El JSON necesita X preguntas de tipo Y, encontradas Z" |
| `alert()` is crude UX | User friction | Acceptable for single-user tool; can upgrade to toast/modal later |
| exam.json config section becomes unused | Confusion about which config wins | Document in code comment; no removal to maintain backward compat |
| 0.33 floating-point scoring | Rounding differences vs 1/3 | Use `ko * (1/3)` in code, `toFixed(2)` for display — matches current precision approach |
