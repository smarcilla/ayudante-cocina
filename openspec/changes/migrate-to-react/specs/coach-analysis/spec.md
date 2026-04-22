## ADDED Requirements

### Requirement: Coach analysis based on score
The system SHALL provide feedback based on final score percentage.

#### Scenario: Excellent score
- **WHEN** score >= 80%
- **THEN** show "Nivel Plaza! Estás en un estado de forma excelente..."

#### Scenario: Passing but needs work
- **WHEN** 50% <= score < 80%
- **THEN** show "Bien, pero falta pulir. Has aprobado, pero en una oposición real dependes de la nota de corte..."

#### Scenario: Needs improvement
- **WHEN** score < 50%
- **THEN** show "Toca hincar los codos. Los conceptos generales están flojos..."