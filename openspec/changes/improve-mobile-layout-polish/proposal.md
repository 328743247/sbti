## Why

The homepage and source landing page currently feel cramped on small mobile screens: navigation labels wrap awkwardly, hero copy breaks into uneven lines, and CTA groups compress in ways that weaken readability and polish. This needs to be addressed now because both pages act as the primary acquisition surfaces for test users and source-download traffic, and the mobile experience is visibly below the visual standard of the desktop layout.

## What Changes

- Refine the homepage mobile layout so the header, hero title, feature pills, and primary actions keep clear spacing and readable line lengths on narrow screens.
- Improve the source landing page mobile layout so the sticky header, hero content, service banner, and CTA rows stack cleanly without crowded wrapping or squeezed controls.
- Introduce responsive content-width, spacing, and button behavior rules for marketing-style sections shared by the homepage and source page.
- Preserve existing page purpose, navigation destinations, copy meaning, and download/test actions while improving presentation on common phone widths.

## Capabilities

### New Capabilities
- `mobile-marketing-layout`: Defines mobile-first layout behavior for marketing-oriented page sections, including stacked navigation, controlled heading measures, evenly spaced action groups, and non-overlapping pill/button treatments on small screens.

### Modified Capabilities
- `source-landing-page`: Tighten the source landing page requirements so its header, hero, and download entry points remain readable and visually balanced on mobile devices.

## Impact

- Affected code: `index.html`, `source.html`, `style.css`, and any related front-end behavior that supports mobile navigation or CTA presentation.
- Affected systems: homepage marketing shell, source landing page layout, shared responsive CSS rules.
- No API or dependency changes are expected.
