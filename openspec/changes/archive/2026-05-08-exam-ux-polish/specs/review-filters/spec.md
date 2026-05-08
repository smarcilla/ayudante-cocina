## ADDED Requirements

### Requirement: Review items filterable by answer status
The result screen SHALL provide tab-style filter controls that allow the user to view review items filtered by their answer status: all questions, errors only, blank only, or correct only.

#### Scenario: Default view shows all questions
- **WHEN** user opens the result screen
- **THEN** all questions are displayed in the review section

#### Scenario: Filter to errors only
- **WHEN** user clicks the "Fallos" filter tab
- **THEN** only incorrectly answered questions are displayed

#### Scenario: Filter to blank questions only
- **WHEN** user clicks the "Blancas" filter tab
- **THEN** only unanswered questions are displayed

#### Scenario: Filter to correct answers only
- **WHEN** user clicks the "Aciertos" filter tab
- **THEN** only correctly answered questions are displayed

### Requirement: Active filter visually indicated
The system SHALL visually distinguish the active filter tab from inactive tabs, using the existing button styling patterns (primary vs secondary style).

#### Scenario: Active tab highlighted
- **WHEN** user clicks "Fallos" tab
- **THEN** the "Fallos" button appears with primary style and other tabs with secondary/ghost style
