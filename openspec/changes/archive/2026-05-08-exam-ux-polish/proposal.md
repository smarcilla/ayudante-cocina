## Why

The exam simulator has four UX gaps that reduce usability: (1) it rejects JSON files that don't match exact block sizes (28G + 32E), preventing use with smaller question banks like the current 10G + 20E exam.json; (2) score is shown as raw points instead of a familiar 0-10 scale; (3) the post-test review shows all questions mixed together with no way to filter; (4) the timer display can freeze or disappear when time runs out.

## What Changes

- **Flexible blocks**: Remove strict validation wall. Each block uses `min(available, configured)` questions instead of failing. Any JSON with any number of questions can start a test.
- **Score 0-10**: Transform raw score to a 0-10 scale, clamped at 0 (negative scores become 0). Raw score with penalty still shown as secondary info.
- **Review filters**: Add tab-style filters on ResultScreen: [Todas] [Fallos] [Blancas] [Aciertos].
- **Persistent timer**: Timer display never disappears during quiz. Shows `0:00` when time expires instead of freezing.

## Capabilities

### New Capabilities

- `flexible-blocks`: Adaptive question selection that uses available questions per block without hard minimums
- `score-normalization`: Score displayed on 0-10 scale with floor clamp
- `review-filters`: Tab-based filtering of review items by answer status
- `persistent-timer`: Timer header that remains visible at all times during quiz and results

### Modified Capabilities

- *(none — no existing spec files)*

## Impact

- **Modified**: `src/components/HomeScreen.jsx` — remove strict validation, use min(available, configured)
- **Modified**: `src/components/ResultScreen.jsx` — score normalization, review filter tabs
- **Modified**: `src/App.jsx` — timer always visible condition
- **No impact**: `src/context/ExamContext.jsx`, `src/components/QuizScreen.jsx`, `src/components/StatusBar.jsx`, `src/config.js`
