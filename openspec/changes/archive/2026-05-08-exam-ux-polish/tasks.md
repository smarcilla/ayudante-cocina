## 1. Flexible blocks — remove validation wall

- [x] 1.1 Remove validation error block in HomeScreen.jsx `handleStart` that checks available vs configured questions per block
- [x] 1.2 Verify `selectQuestionsByBlocks` in ExamContext.jsx already handles fewer available questions (it uses `.slice(0, N)` which works with smaller arrays)

## 2. Persistent timer — never disappear

- [x] 2.1 Change Header useEffect condition in App.jsx from `state.timeLeft > 0` to `state.timeLeft >= 0`
- [x] 2.2 Ensure `displayTime` defaults to a valid value (not `--:--`) when screen is quiz, even at timeLeft=0

## 3. Score normalization — 0-10 scale with clamp

- [x] 3.1 Add `normalizedScore` calculation in ResultScreen.jsx: `Math.max(0, (ok - ko * penalty) / numQuestions) * 10`
- [x] 3.2 Update "Nota Final" display to show normalized score with "/10" suffix
- [x] 3.3 Add raw score display (ok - ko * penalty) as secondary info panel

## 4. Review filters — tab-based filtering

- [x] 4.1 Add `useState` for filter state in ResultScreen.jsx (`'all' | 'ko' | 'null' | 'ok'`)
- [x] 4.2 Create tab filter UI row above review list with 4 buttons: Todas, Fallos, Blancas, Aciertos
- [x] 4.3 Apply filter to `questions.map()` loop — only render items matching active filter
- [x] 4.4 Style active tab as primary button, inactive as secondary/ghost
- [x] 4.5 Update review section title to reflect active filter (e.g., "Todas las preguntas", "Fallos", etc.)
