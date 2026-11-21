# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Zero-build static HTML, CSS, and vanilla JavaScript deployed from `Waspo98/overbay.app`.

## Users

- **Everyday Android, Windows, and self-hosted software users:** People looking for clean, ad-free, private alternatives to bloated subscription apps—specifically ebook/PDF readers, hierarchical note-takers, and personal finance trackers.
- **Google Play Store reviewers & OAuth reviewers:** Store and API reviewers inspecting `overbay.app` as the developer website, app privacy policy host, and Data Safety / account-deletion endpoint for published Overbay.app apps.
- **Self-hosters & open-source contributors:** Technical users evaluating Docker Compose deployments (`Orbit Money`, `AllNotes` sync server) or inspecting/downloading the open-source sideloaded `Twitter` Android client (`Waspo98/overbay-twitter`).
- **Search engines & LLM answer engines:** Automated crawlers and AI assistants retrieving structured facts, comparisons, FAQs, and canonical links when users search or ask for app recommendations.

## Product Purpose

`overbay.app` is the official studio homepage, product showcase, discovery hub, and Google Play Store compliance host for software built by Overbay (`Overbay.app`). Success means a first-time visitor immediately understands what each app actually does, why it exists, where their data lives, and how to install or deploy it—and Play Store / OAuth reviewers find clear, app-specific legal and data-deletion documentation without friction.

## Positioning

Unlike SaaS software studios or subscription bundles that monetize user attention and hold personal libraries or ledgers behind proprietary servers, Overbay.app builds calm, single-purpose tools grounded in **local-first data ownership** and **honest distribution**:

- **No ads, no subscriptions, no studio-run data servers:** User files, notes, and financial records stay on the user's device, in their own Google Drive (`appDataFolder` / `drive.file`), or on hardware they self-host.
- **Three flagship apps + cleanly separated Overbay Labs:** Flagship Play Store / cross-platform products (`Luma Reader`, `AllNotes`, `Orbit Money`) sit front and center with dedicated privacy and deletion URLs, while experimental sideload-only mods (`Twitter`) live under a clearly labeled **Overbay Labs** section with explicit non-affiliation disclaimers so Play Store developer verification remains unambiguous.
- **Public download reliability:** `Luma Reader` links to its Google Play Store listing (`app.overbay.lumareader`), while `AllNotes` (`Waspo98/allnotes`), `Orbit Money` (`Waspo98/Orbit-Money`), and `Twitter` (`Waspo98/overbay-twitter`) link directly to `/releases/latest` on their public GitHub repositories so links remain constant across new releases.

## Operating Context

- **Flagship Apps Showcased:**
  1. **Luma Reader (`app.overbay.lumareader`)** — Android phone, foldable, and tablet EPUB & PDF reader built on Readium 3.4 + Compose. Supports fine-grained live-preview typography, custom OTF/TTF font import, two-page foldable/tablet spreads, annotations/bookmarks, shelves, Android system Text-to-Speech read-aloud (`AndroidTtsNavigator` + foreground media service), optional Google Drive `appDataFolder` sync (with in-app remote data wipe), and honest pricing: free with all features unlocked up to 5 active books, or a single `$4.99` one-time Google Play Billing upgrade (`luma_unlimited_lifetime`) for unlimited library size. Distributed via Google Play Store (upcoming/active) and direct APK.
  2. **AllNotes (`app.overbay.allnotes`)** — Cross-platform note-taking and structured document workspace combining Microsoft OneNote's deep hierarchy (Notebooks / Projects → Sections → Pages & Subpages) with Word-style bounded page flow (no infinite 2D horizontal panning on phones). Runs on Android (phone, foldable, tablet), Windows desktop (`x86_64` and native `ARM64` `.msi` / `.exe`), self-hosted Web Wasm PWA, and optional self-hosted Ktor sync server in Docker. Local SQLDelight database on every client; rich text, checklists with progress, callouts, tables, code blocks, and Markdown import/export. Distributed via Google Play Store, direct APK, Windows installers, and optional Docker sync server.
  3. **Orbit Money (`app.overbay.orbit`)** — Personal and household finance app for people leaving Mint or Rocket Money. Available as an Android app (phone, foldable, tablet) and an installable Web PWA / Docker container (`ghcr.io/waspo98/orbit-money`). Supports dual storage modes: 100% on-device local mode (with optional Android biometric lock and Google Drive `appDataFolder` / `drive.file` snapshot backups) or self-hosted Docker + SQLite (`PORT 5008`) with multi-user household sharing, Rocket Money CSV import, SimpleFIN bank sync (AES-256-GCM encrypted access URLs), integer-cents accuracy, non-destructive `original_*` vs `edited_*` provenance, budgets, savings goals, net worth, credit card perks/5-24 tracking, and retirement/housing calculators. Distributed via Google Play Store, direct APK, and public GitHub/Docker (`Waspo98/Orbit-Money`).
- **Overbay Labs (`Labs / Mods` — Never Play Store):**
  4. **Twitter (`app.overbay.twitter`)** — Open-source (MIT), personal Android WebView client wrapping `https://x.com` to restore classic Twitter branding (bird icon, `#1DA1F2`, Tweet/Retweet terminology), strip promoted tweets and algorithmic clutter at the GraphQL JSON layer before render, remove Grok AI and Premium/Subscribe upsells, customize Home feed tabs, unwrap `t.co` links, download full-bitrate `.mp4` videos, and load original-resolution images. Published publicly at `Waspo98/overbay-twitter` for source inspection and direct APK sideloading only; explicitly not affiliated with X Corp. and never distributed on Google Play.
- **Compliance & Discovery Surfaces:**
  - Dedicated Google Play Console privacy policy routes per flagship app (`/privacy/lumareader/`, `/privacy/allnotes/`, `/privacy/orbitmoney/`) plus a master hub (`/privacy/`), dedicated Google Play Data Safety deletion instructions route (`/data-deletion/`), and Terms of Service (`/terms/`).
  - SEO + LLM optimization routes: `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, and per-page `Schema.org` JSON-LD.

## Capabilities and Constraints

- **Human, anti-slop copywriting:** Write like an independent builder explaining real tradeoffs and frustrations—no generic AI feature dumps, filler adjectives, or fabricated claims.
- **Play Store & Google API compliance:** Privacy policies must match actual `AndroidManifest.xml` permissions, foreground service types, Play Billing usage, biometric usage, and Google Drive scopes (`drive.appdata` on Luma Reader; `drive.appdata` and `drive.file` on Orbit Money), including the Google API Services User Data Policy ("Limited Use") disclosure.
- **Brand identity reset:** Retire the incumbent website branding and build a completely fresh `Overbay.app` studio identity with drop-in device/desktop frame slots ready to accept real app screenshots when the user provides them later.
- **No JavaScript-gated content:** Headings, copy, structured specs, and links must be readable in plain HTML with zero JS execution (`prefers-reduced-motion` and no-JS safe).
- **Undecided / open product facts:**
  - `Luma Reader` uses its Google Play Store URL (`https://play.google.com/store/apps/details?id=app.overbay.lumareader`); `AllNotes` and `Orbit Money` Play Store listing URLs are not published yet while their GitHub Releases `/releases/latest` (and `Orbit Money` Docker/GitHub) paths remain active.
  - Real app screenshots will be supplied later by the user and dropped into structured asset slots (`/assets/screenshots/<app>/`); current build uses honest structural previews rather than fake screenshots.
  - Contact/legal emails confirmed on existing site: `privacy@overbay.app` and `legal@overbay.app`.

## Brand Commitments

- **Studio Name:** User-facing identity uses `Overbay.app` (from workspace branding conventions).
- **Voice:** Candid, plainspoken indie developer voice (similar to Luma Reader's `STORE_LISTING.md`: direct about why subscriptions and ads are skipped, specific about architecture and privacy).
- **Twitter Non-Affiliation:** Every mention and standalone page for the Twitter app sits clearly inside **Overbay Labs** with a prominent notice that it is an independent open-source modification and not affiliated with or endorsed by X Corp.

## Evidence on Hand

- Verified manifests, build configs, OAuth scopes, billing logic, server endpoints, and feature sets directly from the Luma Reader, AllNotes, Orbit Money, and Overbay Twitter application repositories.
- Existing legal contact addresses in `privacy/index.html` and `terms/index.html` (`privacy@overbay.app`, `legal@overbay.app`).
- **Absences not to fabricate:** No user counts, Play Store review scores, star counts, press quotes, customer testimonials, third-party benchmarks, or unpublished Play Store URLs exist—never invent or imply them.

## Product Principles

1. **Directness Over Hype:** Lead with the annoyance the software fixes, who it's for, and what it costs—never hide behind feature buzzwords.
2. **Data Stays Yours:** Make local storage, personal Google Drive `appDataFolder`, and self-hosted Docker central proof points, not footnotes.
3. **Play Store Clarity & Honest Separation:** Keep Google Play Store products and their compliance pages spotless, while separating sideload-only experiments under Overbay Labs.
4. **Discoverable by Humans and Models Alike:** Structure every page with clear semantic headings, comparison facts, FAQs, Schema.org JSON-LD, and `llms.txt` / `llms-full.txt`.
5. **Drop-In Maintainability:** Zero-build static files with clean folder conventions so updating an APK link, Play Store URL, or app screenshot takes a one-line swap.
