## ADDED Requirements

### Requirement: JSON file loads exam data
The system SHALL read and parse the exam JSON file.

#### Scenario: Valid file
- **WHEN** user uploads a valid exam.json
- **THEN** the system parses and stores questions

#### Scenario: Invalid file
- **WHEN** user uploads an invalid JSON file
- **THEN** the system shows error alert

#### Scenario: File structure
- **WHEN** exam.json is loaded
- **THEN** the system extracts: meta, config.blocks, questions[].question, options, correct