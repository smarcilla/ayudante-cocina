## ADDED Requirements

### Requirement: Timer display never disappears during quiz
The timer SHALL remain visible and update correctly for the entire duration of the quiz, including when time reaches zero. The display SHALL show "0:00" when time expires.

#### Scenario: Timer updates normally during quiz
- **WHEN** the quiz is active and time is greater than 0
- **THEN** the timer displays remaining time in "M:SS" format and updates every second

#### Scenario: Timer shows 0:00 at expiration
- **WHEN** the timer reaches 0 seconds
- **THEN** the display shows "0:00" instead of freezing on the last value

#### Scenario: Timer visible on result screen
- **WHEN** the exam is submitted (by user or timeout)
- **THEN** the timer display shows the remaining time (0:00 if expired) or elapsed time

### Requirement: Timer condition includes zero
The Header component's timer update useEffect SHALL use the condition `timeLeft >= 0` instead of `timeLeft > 0` to ensure the display updates at the zero boundary.

#### Scenario: Zero-second timer update
- **WHEN** state.timeLeft equals 0
- **THEN** displayTime is set to "0:00"
