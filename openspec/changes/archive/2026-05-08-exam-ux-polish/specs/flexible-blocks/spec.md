## ADDED Requirements

### Requirement: Exam starts with any number of available questions
The system SHALL start an exam using all available questions per block, without requiring a minimum threshold. If a block has fewer questions than configured, the system SHALL use all available questions from that block instead of blocking exam start.

#### Scenario: JSON has fewer questions than configured per block
- **WHEN** user loads a JSON with 10 general and 20 specific questions, and config specifies 28 general and 32 specific
- **THEN** the exam starts with 30 questions (10 general + 20 specific) without any error

#### Scenario: JSON has more questions than needed per block
- **WHEN** user loads a JSON with 50 general and 60 specific questions, and config specifies 28 general and 32 specific
- **THEN** the exam randomly selects 28 general and 32 specific questions (60 total)

#### Scenario: A block has zero questions
- **WHEN** user loads a JSON with 0 general and 20 specific questions
- **THEN** the exam starts with 20 questions (0 general + 20 specific) without error

### Requirement: No validation alert blocks exam start for insufficient questions
The system SHALL NOT display a blocking alert when the loaded JSON has fewer questions than configured for any block. The previous validation gate that prevented exam start shall be removed.

#### Scenario: User loads undersized JSON
- **WHEN** user clicks "EMPEZAR SIMULACIÓN" with any valid JSON file containing at least one question
- **THEN** the exam starts without any validation error alert
