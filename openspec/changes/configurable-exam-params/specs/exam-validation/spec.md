## ADDED Requirements

### Requirement: Validate question bank on load
The system SHALL validate that a loaded question bank JSON contains enough questions per block to satisfy the configured structure before starting an exam.

#### Scenario: Valid question bank passes
- **WHEN** user loads a JSON with at least 28 general and 32 specific questions
- **THEN** exam starts normally

#### Scenario: Insufficient general questions fails
- **WHEN** user loads a JSON with fewer than 28 general questions
- **THEN** exam does NOT start and an error message indicates how many general questions are needed vs found

#### Scenario: Insufficient specific questions fails
- **WHEN** user loads a JSON with fewer than 32 specific questions
- **THEN** exam does NOT start and an error message indicates how many specific questions are needed vs found

#### Scenario: Both blocks insufficient fails
- **WHEN** user loads a JSON with insufficient questions in both blocks
- **THEN** exam does NOT start and the error message reports deficits for both blocks

### Requirement: Validate question bank has required block types
The system SHALL verify that the loaded JSON contains questions for each block type defined in `EXAM_CONFIG.blocks.default`.

#### Scenario: Missing block type fails
- **WHEN** user loads a JSON that has no questions with `block: "general"`
- **THEN** exam does NOT start and an error message indicates the missing block type
