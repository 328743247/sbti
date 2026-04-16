# source-landing-page Specification

## Purpose
TBD - created by archiving change add-source-landing-page-seo. Update Purpose after archive.
## Requirements
### Requirement: Dedicated source landing page
The system SHALL provide a dedicated landing page for SBTI source acquisition with a unique URL and page identity that focuses on the query intent for `sbti人格测试源码`.

#### Scenario: User opens the source landing page
- **WHEN** a user navigates to the source landing page URL
- **THEN** the page displays a unique H1 and introductory content describing the SBTI source package
- **AND** the content includes visible references to `sbti人格测试源码`, `百度网盘`, and `夸克网盘`

#### Scenario: Search crawler reads the landing page
- **WHEN** a search engine or AI crawler parses the landing page
- **THEN** it can identify a standalone document focused on source acquisition rather than the personality test workflow

### Requirement: Homepage exposes source acquisition entry
The homepage SHALL include a `源码获取` navigation item in the header that links to the dedicated source landing page without disrupting the existing test entry points.

#### Scenario: User clicks the header menu entry
- **WHEN** a user clicks `源码获取` in the homepage header
- **THEN** the browser navigates to the source landing page

#### Scenario: Existing homepage CTAs remain test-focused
- **WHEN** a user views the homepage after the navigation update
- **THEN** the main test-start actions remain available and unchanged in purpose

### Requirement: Source landing page presents both netdisk acquisition methods
The source landing page SHALL present both the Baidu Netdisk and Quark Netdisk acquisition options with the shared URL details, access code details where applicable, and guidance that helps users preserve the resource.

#### Scenario: User needs Baidu Netdisk details
- **WHEN** a user reads the download section
- **THEN** the page shows the Baidu Netdisk share link
- **AND** the page shows the extraction code `ina1`

#### Scenario: User needs Quark Netdisk details
- **WHEN** a user reads the download section
- **THEN** the page shows the Quark Netdisk share link
- **AND** the page identifies it as an alternative acquisition path for the same source package

### Requirement: Landing page includes SEO and AI-extractable content structure
The source landing page SHALL include metadata and content blocks that support traditional SEO and AI extraction, including a targeted title/description pair, a clear heading hierarchy, FAQ content, internal links, and structured data for the page content.

#### Scenario: Page is evaluated for on-page SEO
- **WHEN** the landing page HTML is inspected
- **THEN** it contains a dedicated title tag and meta description aligned to the source acquisition intent
- **AND** it contains a single primary H1 with supporting H2 or H3 sections

#### Scenario: AI system extracts answers from the page
- **WHEN** an AI assistant or crawler summarizes the landing page
- **THEN** it can locate concise answer blocks that explain what the source package is, how to obtain it, and which netdisk options are available

#### Scenario: Rich content is exposed through structured data
- **WHEN** a crawler reads the structured data on the landing page
- **THEN** it can identify the page as a web page with FAQ-style supporting content

