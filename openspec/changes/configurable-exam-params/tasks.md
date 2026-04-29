## 1. Create config module

- [x] 1.1 Create `src/config.js` with `EXAM_CONFIG` export containing `blocks`, `timeMinutes`, and `penalty` — each with `default` and `options` fields matching spec_4.md defaults
- [x] 1.2 Verify config exports are importable by other modules

## 2. Update HomeScreen to use config

- [x] 2.1 Import `EXAM_CONFIG` in HomeScreen
- [x] 2.2 Replace hardcoded `<option>` values in time select with dynamic rendering from `EXAM_CONFIG.timeMinutes.options`
- [x] 2.3 Set time select default value to `EXAM_CONFIG.timeMinutes.default` (60)
- [x] 2.4 Add penalty select control rendered from `EXAM_CONFIG.penalty.options`
- [x] 2.5 Set penalty select default value to `EXAM_CONFIG.penalty.default` (0.33)

## 3. Add JSON validation

- [x] 3.1 In HomeScreen `handleStart`, add validation function that counts questions per block in loaded JSON
- [x] 3.2 Compare counts against `EXAM_CONFIG.blocks.default` requirements
- [x] 3.3 Show alert with specific deficit information if validation fails (block type, needed, found)
- [x] 3.4 Include selected penalty in `SET_EXAM` dispatch payload as `payload.penalty`

## 4. Update ExamContext

- [x] 4.1 Import `EXAM_CONFIG` in ExamContext
- [x] 4.2 Update `selectQuestionsByBlocks` to read block definitions from `EXAM_CONFIG.blocks.default` instead of `exam.config.blocks`
- [x] 4.3 Add `penalty` field to initial state with value 0
- [x] 4.4 Update `SET_EXAM` reducer case to store `action.payload.penalty` in state

## 5. Update ResultScreen scoring

- [x] 5.1 Replace hardcoded `0.25` penalty with `state.penalty` (use `state.penalty || 0` as fallback)
- [x] 5.2 Display the penalty rate used in the results view (e.g., "Penalización: -0.33")
- [x] 5.3 Verify score calculation uses `ko * state.penalty` formula

## 6. Cleanup and verification

- [x] 6.1 Remove hardcoded `value="115"` from HomeScreen time select
- [x] 6.2 Remove hardcoded `ko * 0.25` from ResultScreen
- [x] 6.3 Test with current exam.json (30 questions) — should fail validation with clear message
- [x] 6.4 Test with a mock JSON containing 28+32 questions — should start exam with correct defaults
- [x] 6.5 Verify all UI selects reflect config defaults on fresh load
