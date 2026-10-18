# StageFit AI MVP

A responsive, dependency-free pricing and booking desk for independent venues, based on the included PRD.

The home screen compares Flat Rate, Door Split, Hybrid, and Best using owner-entered costs and attendance scenarios. See [PRICING-MVP.md](PRICING-MVP.md) for formulas, deal definitions, controls, and five pricing acceptance tests. The original booking desk remains at `booking.html`.

## Run locally

Anyone with repository access can clone and run this static application. No API keys, npm installation, or build step are required.

```sh
git clone https://github.com/nyum2003/ProductAI.git
cd ProductAI
python -m http.server 4173
```

Visit `http://localhost:4173`. Python 3 is needed for this example server; any static HTTP server works. Alternatively, open `index.html` directly in a modern browser, though serving over localhost is recommended for consistent browser storage and secure-context APIs.

The localhost URL works only on the computer running the server. Pushing to GitHub does not publish a hosted website. For a shareable URL, deploy these static files to a web host such as GitHub Pages.

Each visitor has their own browser-local workspace. Venue settings, inquiries, and research notes are not shared across users or included in the repository.

## User journey

1. Configure venue capacity, curfew, equipment, unavailable dates, approved rates, and reply tone.
2. Explore sample inquiries or paste an email into New inquiry.
3. Confirm extracted details. Extraction is deterministic and recognizes ISO dates, dollar budgets, guest counts, equipment keywords, and 24-hour times. Missing details must be entered manually.
4. Review date, capacity, technical, and curfew checks, plus the itemized quote.
5. Prepare and edit a reply. Incompatible events receive a clarification reply, not a confirmed quote.
6. Explicitly approve the reply, then open a mailto draft or download the text. The email client handles sending; StageFit does not send or verify delivery.
7. Manually confirm a booking to reserve its date in subsequent feasibility checks.

## Scope and limitations

- Browser-local persistence and JSON export; no backend, authentication, cloud storage, or multi-user synchronization.
- No live Gmail/Outlook connection, external AI, demand signals, automated learning, or streaming data. Never presents these as connected.
- Single-room USD rate card with fixed rental, staffing, and security. Door splits, guarantees, tier pricing, taxes, deposits, and alternate-room/date inventory are future work.
- Metrics show actual local counts; response-time and experimental lift metrics remain unmeasured.
- Existing approved reply text is retained when venue rules change. Booking confirmation rechecks current rules.
- Google Fonts is optional; system fonts work offline. No external scripts or dependencies.
- Sample dates and contacts are demonstration data. Workspace data stays in this browser until exported or handed to the email client.

## Validation

`node --test tests/engine.test.cjs tests/research.test.cjs tests/pricing.test.cjs tests/time.test.cjs` tests feasibility boundaries, booked-date conflicts, unknown fields, email extraction, research counting, and pricing arithmetic. Node.js is needed only to run these tests. Browser QA should cover onboarding, import, editing, approval, email handoff, refresh persistence, and mobile layouts.

Website deployment is separate from publishing the source to GitHub.

## Customer validation and judge demo

Open `research.html` (or Customer validation in the sidebar) for a separate team research workspace. Record observed task time, assistance, edits, participant role, and evidence limitations. Team rehearsals do not count as target-customer tests. Notes persist locally and export as JSON; no customer results are prefilled.

See [JUDGE-READINESS.md](JUDGE-READINESS.md) for the workshop alignment, five acceptance tests, neutral test protocol, scope boundaries, and judge demo outline.

## Product story and presentation fallback

Open `demo.html` for a four-screen, roughly 60-second product story with actual prototype screenshots. All story assets are local. Use the PNGs in `demo-assets/` in the organizer-approved presentation format; the browser story itself is a rehearsal tool. [GORDON-REVIEW.md](GORDON-REVIEW.md) contains the judge-style critique, narration, evidence gaps, and suggested Q&A ownership.
