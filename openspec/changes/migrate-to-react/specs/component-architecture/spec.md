## ADDED Requirements

### Requirement: HomeScreen configures the exam
The system SHALL display configuration options before starting the exam.

#### Scenario: File selection
- **WHEN** user selects a JSON file
- **THEN** the system validates and parses the exam

#### Scenario: Mode selection
- **WHEN** user selects "Examen Oficial"
- **THEN** the system will randomize by blocks

- **WHEN** user selects "Entrenamiento"
- **THEN** the system will include all questions

#### Scenario: Time selection
- **WHEN** user selects a time limit
- **THEN** the timer uses that value in minutes

### Requirement: QuizScreen displays questions
The system SHALL render questions with navigation and answer selection.

#### Scenario: Question rendering
- **WHEN** a question is displayed
- **THEN** show question number, text, and all options

#### Scenario: Option selection
- **WHEN** user clicks an option
- **THEN** highlight that option as selected

#### Scenario: Navigation
- **WHEN** user clicks "ANTERIOR" and not on first question
- **THEN** show previous question

- **WHEN** user clicks "SIGUIENTE" and not on last question
- **THEN** show next question

### Requirement: ResultScreen shows final score
The system SHALL display results and review after exam completion.

#### Scenario: Score display
- **WHEN** exam finishes
- **THEN** show final score, correct, wrong, blank counts

#### Scenario: Review list
- **WHEN** exam finishes
- **THEN** show each question with: user answer, correct answer, explanation

#### Scenario: Coach analysis
- **WHEN** exam finishes
- **AND** score >= 80%
- **THEN** show "Nivel Plaza!" message

- **WHEN** exam finishes
- **AND** 50% <= score < 80%
- **THEN** show "Bien, pero falta pulir" message

- **WHEN** exam finishes
- **AND** score < 50%
- **THEN** show "Toca hincar los codos" message