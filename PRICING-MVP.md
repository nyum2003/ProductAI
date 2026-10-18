# StageFit pricing desk v2

Staging: http://127.0.0.1:4173. Four models replace the previous MVG option.

## Models

- Flat Rate is the fixed venue payout, no lower than the editable baseline.
- Door Split is a percentage of actual net ticket revenue. Expected ticket sales must meet the minimum and fund the baseline before a pure split can be approved. Low sales still show actual revenue, not an inflated minimum.
- Hybrid adds a base payment at least equal to the baseline PLUS a separate share of actual net ticket revenue.
- Best pays Flat Rate below the minimum ticket count. Above it, choose the greater of Flat Rate or Door Split. These amounts are never added together.

Minimum Expected Sales is a whole-ticket planning constraint. Its lower bound is the ticket count needed for the entered share to fund the baseline (rounded up). Its upper bound is approved capacity. Impossible splits are flagged. These are arithmetic feasibility bounds, not demand forecasts.

## Profit controls

Margin = (venue payout - entered event costs) / venue payout. Enter a desired lower and upper margin (0–80%, a supported UI range, not an industry benchmark), then select a target inside it.

Margin and attendance sliders immediately fill offer inputs: target payout is costs / (1 - target margin), rounded up to cents and at least the baseline. Flat Rate becomes that payout; Door Split percentage targets it from expected net ticket revenue. Base stays at baseline, and its additional share targets the difference. Shares round up to 0.1% and are capped at 100%. The UI flags insufficient ticket revenue and out-of-range actual margins.

Minimum-sales slider changes adjust the constraint without changing negotiated terms. Manual number edits require Recalculate. The pricing desk focuses on comparison and has no reply draft, approval, or email handoff. Replies and follow-up questions live in the booking inbox. Below-target outcomes remain visible for owner review. Margin excludes taxes and unentered overhead.

## Room and time

Square Footage is descriptive and stored with venue settings. Approved capacity is independent; legal occupancy is not calculated from area. Curfew and finish controls explicitly use AM/PM, with normalized internal time comparisons. Imported emails accept AM/PM and existing 24-hour text.

## Acceptance checks

1. Default Flat Rate $1,920 minus event costs $940 leaves $980 in all scenarios.
2. Door Split at 35% with 240 tickets at $25 less $1.50 fees pays $1,974. At 120 tickets it pays $987 even though minimum expected sales is 234.
3. A $1,920 base plus 10% pays $2,484 at 240 guests.
4. Best pays $1,920 at 120 guests and $1,974 at 240 when the threshold is 234. With threshold 300 it still pays Flat Rate at 240.
5. At target margin 55%, default costs and attendance produce Flat Rate $2,088.89, split 37.1%, base $1,920, and additional share 3%.
6. Reject sales minimum above capacity or below its computed bound; flag impossible splits.
7. Pricing sliders update comparisons without creating replies. Refresh preserves valid values and room details. Review inquiry & follow-ups opens the selected inquiry in the booking inbox.
8. Curfew 11:00 PM accepts 10:30 PM finish and rejects 11:30 PM. Test noon and midnight too.
9. At mobile width, all four models and three scenario columns remain available.

Run node --test tests/*.test.cjs with Node.js. Browser-local data remains separate per visitor. No inbox sync, external AI, market forecasting, or shared cloud storage is connected.
