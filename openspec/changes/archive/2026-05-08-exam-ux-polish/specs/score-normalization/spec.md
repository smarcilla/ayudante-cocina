## ADDED Requirements

### Requirement: Score displayed on 0-10 scale
The system SHALL display the final score normalized to a 0-10 scale as the primary grade. The normalized score SHALL be calculated as: `Math.max(0, (ok - ko * penalty) / numQuestions) * 10` and rounded to 2 decimal places.

#### Scenario: Perfect score
- **WHEN** user answers all 30 questions correctly with penalty 0.33
- **THEN** normalized score displays as "10.00"

#### Scenario: Score with penalties that stays positive
- **WHEN** user has 20 correct, 5 wrong, 5 blank with penalty 0.33 on 30 questions
- **THEN** raw score = 20 - (5 × 0.33) = 18.35, normalized = (18.35 / 30) × 10 = 6.12

#### Scenario: Negative raw score clamps to 0
- **WHEN** user has 5 correct, 20 wrong, 5 blank with penalty 0.33 on 30 questions
- **THEN** raw score = 5 - (20 × 0.33) = -1.6, clamped = 0, normalized = 0.00

### Requirement: Raw score shown as secondary information
The system SHALL display the raw score (aciertos - fallos × penalización) alongside the normalized grade so users can understand the penalty impact.

#### Scenario: Result screen shows both scores
- **WHEN** user views the result screen
- **THEN** the display shows "Nota Final: 6.12/10" as primary and raw score as secondary info

### Requirement: Zero penalty produces linear score
When penalty is 0, the normalized score SHALL equal `(ok / numQuestions) * 10`.

#### Scenario: No penalty mode
- **WHEN** penalty is 0 and user has 15 correct out of 30
- **THEN** normalized score = (15 / 30) × 10 = 5.00
