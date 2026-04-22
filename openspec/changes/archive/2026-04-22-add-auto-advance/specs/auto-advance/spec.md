## ADDED Requirements

### Requirement: Auto-advance after answering
The system SHALL automatically advance to the next question after user selects an answer.

#### Scenario: Auto-advance on answer
- **WHEN** user clicks an answer option
- **AND** there is a next question (not last)
- **THEN** the system waits 200ms
- **AND** then navigates to the next question

#### Scenario: No advance on last question
- **WHEN** user clicks an answer on the last question
- **AND** there is no next question
- **THEN** the system stays on current question (no navigation)

#### Scenario: Manual navigation works
- **WHEN** user clicks "SIGUIENTE" or "ANTERIOR"
- **THEN** the system navigates as before (auto-advance does not replace manual)