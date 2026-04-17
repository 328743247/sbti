## Context

The current site is a static HTML/CSS/JavaScript project with two high-visibility marketing-style entry pages: the homepage (`index.html`) and the source landing page (`source.html`). Both pages already include responsive breakpoints, but the current mobile rules mainly collapse grids and full-width buttons; they do not adequately manage text measure, navigation wrapping, section spacing, or stacked CTA balance. The visible result on phone-sized screens is uneven multi-line labels, compressed header navigation, and hero blocks that look crowded even though content remains technically accessible.

This change is constrained to front-end presentation and should avoid altering routing, SEO intent, test logic, download links, or page copy semantics. The implementation should reuse the existing CSS architecture in `style.css` rather than introducing a new framework or a separate mobile stylesheet.

## Goals / Non-Goals

**Goals:**
- Make the homepage header and hero area feel intentional on common mobile widths without changing the destination or meaning of existing navigation and CTA links.
- Make the source landing page header, hero section, service banner, and CTA groups stack cleanly on mobile without squeezed buttons or awkward label wrapping.
- Introduce shared responsive rules for spacing, content width, and inline-chip/button wrapping that can be applied consistently across both pages.
- Preserve the current desktop aesthetic while improving the visual rhythm and readability of the mobile experience.

**Non-Goals:**
- Rewriting page copy, changing download/test flows, or introducing new business content.
- Redesigning the desktop layout or visual brand system.
- Adding JavaScript-driven mobile menus, carousels, or new interaction patterns unless a tiny behavior tweak is needed to support an existing layout.

## Decisions

### Decision: Treat this as a mobile-layout refinement within the existing stylesheet
The change will be implemented by tightening breakpoints and component rules inside `style.css`, with only minimal HTML adjustments if a wrapper or class is required for better stacking behavior. This keeps the change small, avoids CSS duplication, and aligns with the current single-stylesheet structure.

Alternative considered: creating a separate mobile stylesheet. This was rejected because the project is small, the problem is localized to a handful of shared marketing components, and splitting styles would increase maintenance overhead for little benefit.

### Decision: Optimize for content measure and stacking, not only for column collapse
The main defect is not just multi-column layout on small screens; it is uncontrolled line length and dense grouping within headers, hero text, pill rows, and CTA clusters. The implementation should therefore tune font sizes, max widths, alignment, gaps, and pill/button wrapping in addition to switching grid layouts to a single column.

Alternative considered: only lowering font sizes. This was rejected because smaller text alone would not fix crowded navigation rows, oversized inline groups, or inconsistent button stacking.

### Decision: Keep primary actions prominent by standardizing full-width or single-column CTA behavior on narrow screens
Homepage and source-page action groups should use a predictable single-column pattern on small widths so labels can remain readable and tap targets remain stable. Supporting pills and secondary chips should wrap with deliberate spacing instead of compressing inline.

Alternative considered: preserving side-by-side CTAs wherever possible. This was rejected because the current screenshots already show cramped action areas, and forcing horizontal alignment on narrow screens increases wrapping risk and harms touch ergonomics.

### Decision: Preserve existing semantics and anchors
The change should keep current links, anchor targets, test-entry actions, and source-download actions intact. Any markup edits should be structural only, such as grouping nav items or adding helper classes for line-wrapping control.

Alternative considered: shortening navigation labels or rewriting hero copy. This was rejected because the request targets presentation quality, not content strategy.

## Risks / Trade-offs

- [Mobile spacing changes could unintentionally loosen the layout too much on small tablets] -> Use targeted breakpoints and test around the current `860px`, `760px`, and `600px` ranges rather than applying one blanket rule.
- [Full-width mobile CTAs may make sections taller] -> Prioritize clear hierarchy and tap comfort; keep vertical gaps compact so the page still feels efficient.
- [Tweaking shared classes may affect result/test screens] -> Scope new responsive rules to marketing-page selectors and verify that test/result components remain visually unchanged.
- [Additional line-break control may still behave differently across devices and fonts] -> Prefer resilient layout controls such as max-width, balanced gaps, and block stacking instead of fragile manual line breaks.
