## ADDED Requirements

### Requirement: Score calculated with penalty
The system SHALL calculate final score using the formula: correct - (wrong * 0.25)

#### Scenario: Score calculation
- **WHEN** exam is submitted
- **THEN** score = correctAnswers - (wrongAnswers * 0.25)
- **AND** blank answers = 0 points

#### Scenario: Percentage display
- **WHEN** score is calculated
- **THEN** display as percentage: (score / totalQuestions) * 100

### Requirement: Results categorized
The system SHALL categorize answers as correct, wrong, or blank.

- **WHEN** user answer is null
- **THEN** count as blank

- **WHEN** user answer equals correct index
- **THEN** count as correct

- **WHEN** user answer differs from correct index
- **THEN** count as wrong