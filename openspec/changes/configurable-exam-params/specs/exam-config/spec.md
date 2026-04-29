## ADDED Requirements

### Requirement: Centralized exam configuration
The system SHALL provide a single configuration module at `src/config.js` that defines all exam parameters. Each parameter SHALL have a `default` field and an `options` field listing valid selectable values.

#### Scenario: Config module exists
- **WHEN** the application loads
- **THEN** `src/config.js` exports an `EXAM_CONFIG` object with all exam parameters

#### Scenario: Config contains block structure
- **WHEN** `EXAM_CONFIG` is inspected
- **THEN** `blocks.default` contains two entries: general (28 questions) and especifico (32 questions)

#### Scenario: Config contains time settings
- **WHEN** `EXAM_CONFIG` is inspected
- **THEN** `timeMinutes.default` equals 60 and `timeMinutes.options` contains at least [30, 60, 90, 115]

#### Scenario: Config contains penalty settings
- **WHEN** `EXAM_CONFIG` is inspected
- **THEN** `penalty.default` equals 0.33 and `penalty.options` contains at least [0, 0.25, 0.33, 0.50]

### Requirement: UI renders controls from config
The HomeScreen SHALL render time and penalty selection controls using values from `EXAM_CONFIG.options`. The default-selected value in each control SHALL be `EXAM_CONFIG.<param>.default`.

#### Scenario: Time select populated from config
- **WHEN** HomeScreen renders
- **THEN** the time dropdown contains options matching `EXAM_CONFIG.timeMinutes.options`

#### Scenario: Time defaults to config value
- **WHEN** HomeScreen renders
- **THEN** the time dropdown has 60 minutes pre-selected

#### Scenario: Penalty select populated from config
- **WHEN** HomeScreen renders
- **THEN** the penalty dropdown contains options matching `EXAM_CONFIG.penalty.options`

#### Scenario: Penalty defaults to config value
- **WHEN** HomeScreen renders
- **THEN** the penalty dropdown has 0.33 pre-selected

### Requirement: Block structure uses config defaults
The `selectQuestionsByBlocks` function SHALL read block definitions from `EXAM_CONFIG.blocks.default` instead of the loaded exam's internal config section.

#### Scenario: Question selection uses config blocks
- **WHEN** `selectQuestionsByBlocks` is called with a loaded exam
- **THEN** it selects 28 general and 32 specific questions based on `EXAM_CONFIG.blocks.default`
