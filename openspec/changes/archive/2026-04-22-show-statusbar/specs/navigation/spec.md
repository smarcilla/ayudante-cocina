## MODIFIED Requirements

### Requirement: QuizScreen shows navigation
The system SHALL display a navigation bar showing all question numbers.

#### Scenario: StatusBar visible
- **WHEN** user is in quiz screen
- **THEN** show StatusBar with all question numbers below QuizScreen

#### Scenario: Question shows answered state
- **WHEN** question has been answered
- **AND** shows in StatusBar
- **THEN** display with "answered" class (different color)

#### Scenario: Question shows current state
- **WHEN** user is viewing a question
- **AND** that question shows in StatusBar
- **THEN** display with "cur" class (highlighted)

#### Scenario: Click navigates to question
- **WHEN** user clicks a number in StatusBar
- **THEN** navigate to that question