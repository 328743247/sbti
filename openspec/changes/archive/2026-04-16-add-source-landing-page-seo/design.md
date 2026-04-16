## Context

The project is currently a static SBTI test site centered on a single [index.html](/D:/project/sbti/index.html) experience with supporting styles in [style.css](/D:/project/sbti/style.css) and screen-switching logic in [app.js](/D:/project/sbti/app.js). The homepage header already contains navigational anchors for core test content, but there is no dedicated destination for users seeking the source package itself.

The requested change introduces a second SEO-oriented page whose job is different from the test homepage: it must rank for source-code acquisition queries, surface the Baidu Netdisk and Quark Netdisk links clearly, and mirror the successful content pattern seen in `D:\project\beida-gupiao` without migrating the whole project to a new framework. The repository also already contains `sbti.zip`, so the landing page can describe an existing downloadable asset instead of inventing a new packaging flow.

Constraints:
- Keep the implementation compatible with the current static-site structure.
- Avoid disrupting the existing test flow or its section-switching behavior.
- Make the new page legible to both traditional crawlers and AI systems that prefer direct-answer blocks, FAQ content, and structured data.
- Preserve the user-provided distribution details for Baidu Netdisk and Quark Netdisk exactly enough for users to act on them.

## Goals / Non-Goals

**Goals:**
- Create a standalone source landing page that can rank independently for `sbti人格测试源码`, `百度网盘`, and `夸克网盘`.
- Add a visible `源码获取` entry in the homepage header that routes to the landing page.
- Reuse the current front-end stack so implementation remains simple and low-risk.
- Structure content for SEO and AI SEO using direct answers, entity-rich headings, FAQ copy, internal linking, and JSON-LD.
- Make the landing page mobile-friendly and clear enough for users to copy or open both netdisk links.

**Non-Goals:**
- Rebuild the main SBTI site into Next.js or another framework.
- Change the underlying test logic, scoring model, or result presentation.
- Introduce user accounts, gated downloads, analytics migrations, or CMS-backed editing.
- Perform a full sitewide SEO overhaul beyond the homepage entry and the new landing page.

## Decisions

### Decision: Use a dedicated static landing page instead of another homepage section
The implementation will add a separate source acquisition page, likely as a standalone HTML entry such as `source.html`, and link to it from the homepage header.

Rationale:
- A dedicated URL gives search engines and AI systems a clean document focused on the source-code intent instead of mixing two different intents into the test homepage.
- It matches the user request for a landing page that the header can jump to.
- It reduces risk to the existing single-page test experience because the new content does not need to coexist inside the current screen-switching flow.

Alternatives considered:
- Add a new section inside `index.html`: rejected because it dilutes keyword focus and complicates the current screen-switching behavior.
- Convert the project to a router-based SPA or Next.js app: rejected because it is unnecessary for one landing page and would enlarge implementation scope.

### Decision: Reuse the current static assets with a page-specific content block and optional small helper script
The page will be built with the current HTML/CSS/JS stack. Shared visual tokens can remain in [style.css](/D:/project/sbti/style.css), while page-specific rules may be scoped under a dedicated class. Interactive behavior for netdisk copy/open actions can be implemented with a lightweight script in the existing [app.js](/D:/project/sbti/app.js) or in a small page-specific script if separation is cleaner.

Rationale:
- This keeps the delivery model consistent with the rest of the repository.
- The requested landing page is content-heavy and does not need a framework runtime.
- Shared styling reduces duplication while still allowing a distinctive landing-page layout.

Alternatives considered:
- Create an isolated CSS file only for the landing page: acceptable but lower priority unless style collisions become hard to manage.
- Inline all interaction with plain anchors and no script: rejected because copy-friendly UX and clearer CTA handling are valuable for netdisk links.

### Decision: Model the page around answer-engine-friendly content blocks
The landing page will include a direct-answer hero, concise source summary, value/highlight section, netdisk acquisition module, FAQ, and explanatory/legal/trust copy. Metadata will include a unique title, description, canonical, and JSON-LD using `WebPage` plus `FAQPage`, with copy shaped for extraction rather than keyword stuffing.

Rationale:
- This aligns with the `ai-seo` guidance to make passages self-contained and citable.
- It also aligns with `seo-audit` fundamentals such as clear title/H1 alignment, heading hierarchy, and internal linking.
- The reference project pattern already demonstrates that this structure works well for acquisition-oriented pages.

Alternatives considered:
- Use a short thin page with only links: rejected because it would underperform for ranking and citation.
- Stuff the keywords repeatedly into generic sections: rejected because that harms readability and can reduce AI visibility.

### Decision: Add homepage internal linking without altering primary test CTAs
The homepage header will gain a `源码获取` menu item, and the landing page will include a reciprocal link back to the main SBTI test homepage. The main hero CTA on the homepage remains test-first.

Rationale:
- This creates a clean internal linking loop and improves crawlability.
- It preserves the main product intent of the homepage while still exposing the new acquisition funnel.

Alternatives considered:
- Replace an existing header item: rejected because it risks removing useful navigation from the test experience.

## Risks / Trade-offs

- [Landing page styling clashes with the current site styles] → Scope new styles under landing-page-specific wrappers and validate both pages after implementation.
- [Chinese copy appears garbled due to existing encoding inconsistency] → Normalize edited files to UTF-8 and verify visible text in the browser before finishing implementation.
- [Netdisk links may expire or change] → Centralize the link strings in one easy-to-update location and add copy explaining that users should save promptly.
- [SEO over-optimization reduces readability] → Favor direct-answer language, FAQ clarity, and semantic headings over repeated exact-match keywords.
- [Header change impacts existing mobile layout] → Include responsive checks for the new navigation item at common breakpoints.

## Migration Plan

1. Add the new static landing page file and its content sections.
2. Update homepage navigation to expose the new `源码获取` link.
3. Add or adjust shared styles and minimal interaction logic for the landing page.
4. Update metadata and JSON-LD for the new page and any homepage internal-link references.
5. Verify desktop/mobile rendering, link behavior, and visible SEO elements.

Rollback strategy:
- Remove the new landing page entry file and revert the homepage header link if the page causes regressions.
- Because the design avoids changing test logic, rollback stays limited to presentation and navigation files.

## Open Questions

- Whether the final landing page path should be `source.html`, `yuanma.html`, or another SEO-friendly filename can be decided during implementation, but it must stay short and keyword-relevant.
- If the project is later deployed behind a routing layer, canonical and absolute URLs will need one final pass using the production domain.
