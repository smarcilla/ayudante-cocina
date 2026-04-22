## ADDED Requirements

### Requirement: Exam state manages questions, answers, and score
The system SHALL maintain the complete state of the exam including questions, user answers, and computed results.

#### Scenario: Initial load
- **WHEN** user loads an exam JSON file
- **THEN** the system parses and stores questions by block

#### Scenario: Answer selection
- **WHEN** user clicks an option
- **THEN** the system updates the answer for that question index
- **AND** the state persists across navigation

#### Scenario: Score computed on finish
- **WHEN** user submits or timer expires
- **THEN** the system calculates: correct - (wrong * 0.25)

### Requirement: Exam state persists across page
The system SHALL preserve exam state when navigating between questions.

- **WHEN** user moves from question 1 to question 5
- **THEN** the answer to question 1 remains selected

### Requirement: Exam has two modes
The system SHALL support "exam" and "practice" modes.

- **WHEN** mode is "exam"
- **THEN** select random questions from each block (numQuestions per block)

- **WHEN** mode is "practice"
- **THEN** include all questions shuffled