# StageFit pricing MVP

The home screen is now a pricing desk. The original booking workflow remains at `booking.html`; customer validation remains at `research.html`.

## Core task

Choose an inquiry, enter event costs and ticket assumptions, compare three deal structures, choose acceptable terms, and prepare an owner-approved offer. Test whether an independent venue owner can choose and explain an acceptable deal in under 10 minutes.

## Explicit deal definitions

- **Flat rental:** promoter pays the entered all-in fee to the venue regardless of ticket sales.
- **Door split:** venue receives the entered percentage of ticket gross after the entered per-ticket fees.
- **Minimum venue guarantee:** promoter pays the venue the greater of the entered minimum or the door split. The guarantee is a minimum paid to the venue, not an artist guarantee and not added on top of the split.

For all three structures, the venue pays the entered room operations, staffing, security, and equipment costs. Flat rental is the price charged; room operations is a cost. They are intentionally distinct.

Venue contribution = venue income minus these costs. Promoter remainder = net ticket revenue minus venue income, before artist payments and other promoter costs. A negative promoter remainder is a funding shortfall, not a calculator error. Contribution is not net profit; tax, other overhead, and bar sales are excluded.

Break-even attendance and attendance needed to meet the contribution target round up to whole guests. A fixed fee that covers the relevant threshold is labeled “Covered by fixed fee”; zero per-guest yield can make a threshold unreachable. A computed threshold above capacity is explicitly flagged.

## Owner controls

All inputs are owner assumptions. The page identifies the deal with the highest contribution in the low-attendance scenario; it does not recommend market pricing or predict demand. Selecting a different deal or recalculating invalidates the prior draft and approval. Unsaved input changes disable deal selection and offer actions until recalculation.

The owner must review the offer. If low-attendance contribution is below the target, an explicit exception reason is required. Existing venue feasibility rules must pass before preparing an offer. Approval saves a local snapshot of inputs, venue, event, and scenario economics. A download or mailto handoff follows; nothing sends automatically.

## Five pricing acceptance tests

1. With the default costs of $940 and a $1,920 flat rental, verify venue contribution is $980 in every attendance scenario.
2. At 240 guests, a $25 ticket, $1.50 fee, and a 35% venue split, verify gross revenue is $6,000, fees $360, venue income $1,974, and contribution $1,034.
3. Select the $1,200 minimum venue guarantee. At 120 guests, verify income is $1,200, not $2,187. At 240 guests it is $1,974, not $3,174.
4. Prepare an offer for a deal below the $750 downside target. Verify approval requires an exception reason and the review checkbox. Edit assumptions and confirm recalculation clears the previous approval. A conflicting inquiry must not enable a pricing offer.
5. Refresh after approving and verify persistence. At mobile width, compare deals and read scenario economics. Research test sessions must remain separate from pricing scenarios and demo inquiry counts.

Automated arithmetic tests: `node --test tests/pricing.test.cjs`.

## Demo story

Show the same inquiry under each structure. Ask what the venue keeps at low turnout, then adjust the flat fee or venue share and show the change. Prepare an offer and demonstrate the owner’s review and downside exception controls. State that prices and turnout are user inputs, not external market data or AI forecasts.

Customer feedback, willingness to accept these terms, and willingness to pay for StageFit remain unvalidated. Use the neutral observation protocol in Customer validation, now focused on choosing and explaining a deal.
