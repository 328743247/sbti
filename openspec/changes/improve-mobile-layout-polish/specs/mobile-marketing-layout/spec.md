## ADDED Requirements

### Requirement: Mobile marketing headers and hero sections remain readable
The system SHALL present marketing-page headers and hero sections in a mobile-friendly layout that preserves readable navigation labels, balanced title wrapping, and visually separated CTA groups on narrow screens.

#### Scenario: Homepage header stacks without crowded wrapping
- **WHEN** the homepage is viewed on a narrow mobile screen
- **THEN** the logo and navigation stack or wrap with deliberate spacing
- **AND** navigation labels remain fully readable without overlapping adjacent items

#### Scenario: Homepage hero copy keeps balanced line lengths
- **WHEN** the homepage hero is viewed on a narrow mobile screen
- **THEN** the main title and supporting copy use mobile typography and widths that avoid visually cramped line breaks
- **AND** the feature pills remain separated with consistent spacing instead of appearing squeezed together

#### Scenario: Homepage actions become tap-friendly on mobile
- **WHEN** the homepage primary actions are viewed on a narrow mobile screen
- **THEN** the action group uses a stable stacked or full-width presentation
- **AND** each action remains easy to tap without colliding with adjacent elements
