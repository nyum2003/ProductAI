# StageFit prototype and validation guide

Prepared against Gordon Ho’s Session 2 bootcamp presentation supplied by the team. The deck offers workshop guidance, not a published judging rubric. Slide numbers below refer to the original deck order. No customer interviews or test results have been supplied; none are claimed here.

The current prototype leads with pricing. Use [PRICING-MVP.md](PRICING-MVP.md) for the current task, formulas, five pricing acceptance tests, and demo story. The original inquiry-to-reply journey below remains available in the booking desk as supporting functionality. Customer validation now tests whether an owner can choose and explain an acceptable deal within 10 minutes.

## Customer and hypothesis

Our initial segment is independent performance venues where an owner or booking manager handles inquiry emails personally. Enterprise arenas remain outside this prototype’s scope.

For these owners, who may struggle to quote promptly while checking room constraints, StageFit helps prepare a reviewed venue reply in under 10 minutes through explicit feasibility rules and approved prices. Faster work, trust in drafts, actual inquiry volume, and willingness to pay are assumptions to validate.

The core task is to decide how to respond to one inquiry and prepare a reply the owner is comfortable sending. The prototype tests that task, rather than the full future platform.

## Alignment with the workshop

| Deck guidance | Implementation or supporting material | Remaining evidence gap |
| --- | --- | --- |
| Discovery path and focused hypothesis, slides 5–7 | Narrow segment, hypothesis above, evidence register in Customer validation | Actual customer pain, frequency, and current behavior |
| Product-market fit pyramid, slide 10 | Venue setup, one inquiry, rule checks, quote review, explicit approval | Whether owners adopt this workflow |
| Assumptions into evidence, slides 12–15 | Separate customer observation log, source types, limitations, exports | Interviews, original-source checks, and competitive benchmarks |
| PRD and SMART metrics, slide 16 | PRD is retained; under-10-minute task hypothesis is observable | Response-to-send time and conversion require live delivery data |
| Smallest useful prototype, slide 18 | One booking task, responsive layout, working checks and editable replies | Simulated inbox and deterministic extraction remain disclosed |
| Observe without steering, slide 20 | Neutral facilitator prompts, assistance and failure fields, proxy/target distinctions | Real target-customer sessions still need to happen |
| ICE prioritization, slides 21–23 | Deferred until competing ideas have supporting evidence | No invented confidence scores or arbitrary feature rankings |
| Storytelling, slides 24–27 | Demo outline below, concrete problem, product demonstration, evidence gap, next step | Actual customer quotes and results must replace placeholders |

## What works and what is simulated

Working: venue rule configuration, manual inquiry import, limited deterministic field extraction, editable details, feasibility checks, fixed itemized pricing, editable replies, approval gate, email-client handoff, local persistence, booking-date conflicts, research notes and export.

Simulated or absent: live inbox sync, external language model, artist demand data, verified delivery, contracts, payments, cloud storage, multi-venue operations, learning from edits, and statistical experiment analysis. Sample booking counts demonstrate UI behavior only.

Leave these integrations out of the first usability test. Validate the core task before expanding scope. The long-term product still needs backend authentication, inbox permissions, secure storage, a delivery integration, and reliable extraction.

## Five acceptance tests

1. **Venue setup and persistence.** Set capacity to 350, curfew to 23:00, rates to $1,500 + $240 + $180, and unavailable date to 2026-11-21. Open the desk, refresh, and confirm settings persist.
2. **Successful core task.** Open Juniper & The Wild. Confirm its 240 guests and 22:30 finish pass the checks. Prepare a $1,920 reply, edit it, and verify approval is disabled until the owner checks the review box. Approval enables email handoff and download without sending anything automatically.
3. **Incompatible inquiry.** Open Midnight Assembly. Confirm the unavailable date and late finish require review. Prepare a clarification reply that requests flexibility and does not assert a confirmed booking or an available alternative date.
4. **Import and uncertainty.** Paste an inquiry with 2026-12-10, 200 guests, $2,500, PA, and 22:00. Confirm extracted details, correct a field, and recheck. For an ambiguous email with no date or turnout, require manual confirmation rather than inventing information.
5. **Mobile observation and research persistence.** On a 390px-wide browser, complete the core task using visible controls. In Customer validation, record a clearly labeled team rehearsal, refresh, and verify it persists but does not count as a target-customer test. Export the notes. Repeat with actual target users only after recruitment.

Automated rule tests live in `tests/engine.test.cjs`. Manual acceptance tests and customer research are distinct: passing software tests does not validate customer demand.

## First customer test

Recruit five owners or booking managers from the initial segment. Use a sanitized customer email or a clearly labeled synthetic inquiry. Record participant role and inquiry source. Before the task, ask about the last inquiry they processed and their usual time; treat the answer as self-reported, not a measured baseline.

Give the task without explaining the interface. Observe hesitation, correction, assistance, completion, elapsed minutes, reply edits, and objections. Ask “What did you expect to happen?” and “What would you do next?” Avoid leading questions about whether the problem is large or the product is good.

Proposed learning gate: at least four of five target users finish without help in ten minutes or less with no or light edits. Define light edits as wording or tone changes; changing a price, date, fit assessment, or missing essential term is a major edit. A failed or incomplete task counts as not meeting the gate. Record the minutes spent even if the participant stops.

The gate is a formative usability decision, not statistical proof. Segment results by synthetic versus customer inquiry and inspect every failure. Test willingness to use and pay separately. The PRD’s eight-week controlled pilot still needs measured baseline data and a power calculation before making conversion-lift claims.

## Judge demo outline

1. **Hook and market.** “An independent venue owner receives a booking inquiry between running tonight’s show and managing staff. Before replying, they have to check the date, room, curfew, equipment, and price.” Present this as a scenario until customer evidence supports it.
2. **Problem and evidence.** Describe the suspected delay and show verified research only. The PRD’s secondary industry figures are context, not independent-venue validation. If interviews are not yet done, say so.
3. **Solution.** Show the approved venue rules, Juniper’s inquiry, checks, $1,920 itemized draft, edit, and approval. Then show Midnight Assembly’s conflict and clarification reply. Explain that email sending remains with the owner.
4. **Testing.** Show Customer validation. Present actual target-customer observations with the sample size, task, inquiry source, and assistance. Until collected, say “Customer testing pending”; do not substitute demo metrics.
5. **Next decision.** Fix observed task failures first. If the learning gate is met, test real inbox integration and pricing with a concierge pilot. Rehearse the demonstration and keep screenshots as a fallback.

## Likely Q&A

- **Why not a generic chatbot?** The hypothesis is that an explicit venue rate card, visible checks, and owner approval make this task easier to trust. Comparative testing is still needed.
- **Is this AI today?** Extraction and drafting use deterministic local logic in this prototype. The AI integration is future work and should be demonstrated only after it exists.
- **Does this improve bookings?** Unknown. Current counts are local workflow data. Improvement needs a baseline and a controlled pilot.
- **What evidence could stop the project?** Owners do not experience the pain frequently, cannot express workable pricing rules, need extensive reply corrections, or decline to change workflow or pay.
- **How will this make money?** Subscription or usage pricing is a business-model hypothesis. Interview and test willingness to pay before stating a price as validated.

## Preview

Open `index.html` for the booking task and `research.html` for the team’s research workspace. A static server is recommended. No GitHub push or deployment is authorized until the owner gives the green light.
