## Context

The exam simulator is a single-page React app with 4 components: HomeScreen (config + start), QuizScreen (question display + timer), ResultScreen (score + review), and StatusBar (question navigation). Exam parameters live in `src/config.js`. The timer is rendered in `App.jsx` Header component.

Current pain points:
- HomeScreen blocks exam start if JSON doesn't have exactly 28G + 32E questions
- ResultScreen shows raw score (e.g., "16.35") instead of normalized 0-10
- ResultScreen review lists all questions with no filtering capability
- Header timer freezes/disappears when `timeLeft` hits 0

## Goals / Non-Goals

**Goals:**
- Any JSON file with any number of questions can start a test
- Score displayed as familiar 0-10 grade with clamp to 0
- Review items filterable by status (all/errors/blanks/correct)
- Timer always shows a valid time value during quiz

**Non-Goals:**
- No config UI changes (no new selectors needed)
- No changes to ExamContext or timer logic (only display layer)
- No changes to question content or scoring math (penalty formula unchanged)
- No persistent storage (localStorage, preferences)

## Decisions

### 1. Flexible blocks: Remove validation, cap per-block selection

Current HomeScreen validates and blocks. Replace with `Math.min(available, configured)` per block in the question selection loop. If a block has 0 available questions, it contributes 0 questions (exam still starts). No changes to `selectQuestionsByBlocks` needed — it already uses `.slice(0, N)`, so if fewer than N exist, it takes what's there. Only the validation gate in `handleStart` needs removal.

**Alternatives considered:**
- Keep validation but add "flexible mode" toggle — adds UI complexity for no benefit
- Warn instead of block — still creates friction

### 2. Score normalization: Separate raw and normalized

Display normalized 0-10 as the primary score. Show raw score (aciertos - fallos × penalización) as secondary data. Formula:

```
rawScore = ok - ko × penalty
clampedScore = Math.max(0, rawScore)
nota010 = (clampedScore / numQuestions) × 10
```

This keeps the penalty math transparent while giving an intuitive grade.

**Alternatives considered:**
- Scale negative scores to 0-10 range — distorts meaning, confuses users
- Replace raw score entirely — loses transparency about penalty impact

### 3. Review filters: Local state with simple tab UI

Add `useState` in ResultScreen for `filter` state: `'all' | 'ko' | 'null' | 'ok'`. Filter the `questions.map()` loop with a simple conditional. Tabs styled as a row of pill buttons matching existing CSS patterns. No new CSS classes needed — reuse existing `button` and `button.secondary` styles.

**Alternatives considered:**
- Separate "view mode" in ExamContext — overkill for UI-only feature
- Collapsible sections per status — more complex interaction

### 4. Persistent timer: Fix useEffect condition

Change `timeLeft > 0` to `timeLeft >= 0` in the Header's useEffect. This ensures `displayTime` updates to `"0:00"` instead of freezing. The FINISH action still fires normally from QuizScreen's useEffect (which independently checks `timeLeft <= 0`). Timer in results screen will show `0:00` if exam ended by timeout.

**Alternatives considered:**
- Compute elapsed time from a start timestamp — requires new state tracking
- Separate timer component with its own state — adds complexity

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| 0-question block produces exam with fewer questions than expected | User confusion about exam length | Total count shown in quiz header (already exists: `{current+1} of {total}`) |
| Clamped score hides penalty severity | User doesn't see how badly they did | Raw score shown as secondary info |
| Filter state resets on restart | N/A | Expected behavior; review only matters for completed exam |
| Timer showing 0:00 briefly before FINISH | Minor visual flicker | FINISH dispatches in same tick; imperceptible in practice |
