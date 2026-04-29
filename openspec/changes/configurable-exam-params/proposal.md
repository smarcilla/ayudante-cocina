## Why

The exam simulator currently hardcodes key parameters (30 questions, 115 min timer, -0.25 penalty) across multiple files. spec_4.md requires new default values (60 questions, 60 min, -0.33 penalty) and mandates that all exam parameters be configurable rather than scattered as hardcoded values. Centralizing configuration prevents future spec drift from requiring code changes in multiple locations.

## What Changes

- Centralize all exam parameters into a single `src/config.js` module with explicit `default` and `options` fields per parameter
- Add JSON validation: on file load, verify the question bank has enough questions per block to satisfy the configured structure (28 general + 32 specific)
- Update HomeScreen UI: replace hardcoded `<option>` values with dynamic rendering from config; set defaults from config values (60 min, -0.33 penalty)
- Update ExamContext: `selectQuestionsByBlocks` reads block configuration from `config.js` instead of exam.json's config section
- Update ResultScreen: scoring formula uses configurable penalty from exam state instead of hardcoded 0.25
- Display selected penalty value in results so users understand how their score was calculated

## Capabilities

### New Capabilities
- `exam-config`: Centralized configuration module defining all exam parameters (structure, time, penalty) with default values and selectable options
- `exam-validation`: Input validation that verifies loaded question banks meet the configured structural requirements
- `configurable-scoring`: Score calculation using the user-selected penalty rate instead of a fixed value

### Modified Capabilities
- *(none — no existing spec files)*

## Impact

- **New file**: `src/config.js` — single source of truth for exam parameters
- **Modified**: `src/components/HomeScreen.jsx` — dynamic selects, validation feedback
- **Modified**: `src/context/ExamContext.jsx` — reads config for block structure, validation logic
- **Modified**: `src/components/ResultScreen.jsx` — uses configurable penalty for scoring
- **No impact**: `src/components/QuizScreen.jsx`, `src/components/StatusBar.jsx`, `src/App.jsx` — already parameter-agnostic
