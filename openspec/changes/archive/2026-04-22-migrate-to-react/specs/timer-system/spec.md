## ADDED Requirements

### Requirement: Timer counts down
The system SHALL display and track remaining time.

#### Scenario: Timer starts
- **WHEN** exam begins
- **THEN** timer starts at selected minutes * 60

#### Scenario: Timer display
- **WHEN** timer is running
- **THEN** display MM:SS format

#### Scenario: Timer expires
- **WHEN** time reaches 0
- **THEN** auto-submit exam (call finish)

### Requirement: Timer can be paused
The system SHALL allow pausing the timer (optional).

- **WHEN** exam is paused
- **THEN** timer stops counting

- **WHEN** exam resumes
- **THEN** timer continues from paused value