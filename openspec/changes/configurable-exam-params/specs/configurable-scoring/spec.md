## ADDED Requirements

### Requirement: Score calculation uses configurable penalty
The ResultScreen SHALL calculate the final score using the user-selected penalty rate instead of a hardcoded value. The formula SHALL be: `finalScore = correctAnswers - (wrongAnswers * selectedPenalty)`.

#### Scenario: Score with default penalty
- **WHEN** user completes an exam with the default -0.33 penalty
- **THEN** finalScore equals correct minus (wrong × 0.33), rounded to 2 decimal places

#### Scenario: Score with zero penalty
- **WHEN** user selects 0 penalty and completes an exam
- **THEN** finalScore equals correct answers (no deduction for wrong answers)

#### Scenario: Score with custom penalty
- **WHEN** user selects 0.50 penalty and completes an exam with 40 correct and 10 wrong
- **THEN** finalScore equals 35.00 (40 - 10 × 0.50)

### Requirement: Selected penalty is stored in exam state
The penalty rate selected by the user SHALL be included in the `SET_EXAM` dispatch payload and stored in the ExamContext state for use by ResultScreen.

#### Scenario: Penalty stored on exam start
- **WHEN** user starts an exam after selecting a penalty value
- **THEN** `state.penalty` contains the selected value

### Requirement: Penalty value is visible in results
The ResultScreen SHALL display which penalty rate was used for the score calculation.

#### Scenario: Penalty shown in results
- **WHEN** user views the results screen
- **THEN** the displayed score information includes the penalty rate used (e.g., "Penalización: -0.33")
