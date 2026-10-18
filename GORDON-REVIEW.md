# Judge-style review and presentation plan

Current staging revision: see [PRICING-MVP.md](PRICING-MVP.md) for four pricing structures, margin sliders, and sales constraints. Older guarantee examples below describe the previous prototype.

This is an interpretation of the supplied workshop advice, not Gordon Ho’s actual assessment, a scoring rubric, or a promise of his preference. The transcript has transcription errors and conflicting discussion of video permissions. Confirm final competition submission rules with the organizers; do not assume embedded video, internet access, or a live demo will be available.

## The judgment the team needs to earn

“I understand who has this problem, why it matters, what this product changes, and what the team learned by testing it.” A polished calculator alone cannot establish customer need or willingness to pay.

| Question a judge could ask | Current answer | Next action |
| --- | --- | --- |
| Who specifically is this for? | Independent venue owners or booking managers who handle pricing themselves | Recruit people in that role; keep proxy users labeled |
| What is the decision? | Choose terms that cover entered venue costs under plausible attendance scenarios | Ask owners to explain their existing process with a recent inquiry |
| Why is it needed? | The PRD proposes quoting delays and manual feasibility work; the pricing pain remains a hypothesis | Collect frequency, recent examples, measured or clearly self-reported time, and consequences |
| What changes with StageFit? | One inquiry becomes a visible comparison of deal economics and an owner-reviewed offer | Show one successful task, including the downside and review gate |
| What did customer tests show? | No verified target-customer results have been supplied | Observe users, record failures and assistance, and use exact quotes with permission |
| Where is the AI? | This prototype uses deterministic math, extraction rules, and reply templates | Say so. Demonstrate an external AI integration only after building and evaluating it |
| Why not a spreadsheet? | Integrated inquiry context, visible deal rules, feasibility, and review are a proposed advantage | Compare the task with owners’ existing spreadsheet or usual process |

The two biggest credibility gaps are customer evidence and the absence of a working external AI integration. Neither is solved by adding dashboard metrics or labeling templates as AI.

## What changed in the prototype

The pricing desk now shows a shared-scale visual comparison of low and expected venue contribution for every deal. A concrete sentence explains the trade-off. At the default assumptions, the door split adds $54 at expected attendance but leaves $933 less than flat rental at low attendance. These are computed examples, not customer impact.

The product story at `demo.html` uses four visual screens and actual screenshots. It separates the target-user situation, pricing trade-off, owner control, and next learning decision. The screen-capture PNGs in `demo-assets` can be inserted directly into the competition’s permitted presentation format. They show sample data, no testimonials, and no invented outcome metrics.

## A 60-second product segment

Suggested speaker allocation uses the names from the original PRD. Change the assignments to match the team’s strengths. Every team member should have a speaking role in the full presentation.

| Time | Speaker | Narration |
| --- | --- | --- |
| 0–15 seconds | Aswin | “An independent venue owner receives an inquiry for 240 guests. The date fits, but the owner still needs to decide: flat rental, a door split, or a minimum venue payment? StageFit makes that pricing decision visible.” |
| 15–30 seconds | Jordan | “In this example, the door split leaves $1,034 after entered event costs, $54 more than flat rental. But at low turnout it leaves just $47, compared with $980 for rental. These are scenarios from the owner’s inputs, not a demand forecast.” |
| 30–45 seconds | Kushal | “The owner chooses the terms and reviews an editable offer. A below-target deal needs an explicit exception. Approval opens a handoff; it never sends automatically. This prototype uses rules and templates, with live AI and inbox integration still to build.” |
| 45–60 seconds | Nolan | “The workflow is working. Customer value is the next test. We propose observing five independent venue owners choosing and explaining a deal, then measuring task time, assistance, and corrections before expanding the product.” |

This is the product segment, not a replacement for the full pitch. Before it, show credible problem evidence. After it, present actual testing results when collected and finish with the next decision. Never read a fictional customer quote or present a team rehearsal as a target-user result.

## Visual presentation materials

- `demo-assets/01-compare.png`: pricing cards and shared-scale contribution chart.
- `demo-assets/02-terms.png`: explicit selected terms and itemized scenario economics.
- `demo-assets/03-offer.png`: editable reply with owner approval and a below-target exception gate.

Use screenshots in a short sequence with one takeaway each. Keep product text large enough to read from the room. The HTML story is useful for rehearsal, but it requires a browser; do not rely on it as the competition submission. Insert the PNGs into the required PowerPoint format and test that file on the actual presentation environment. Exact file-format and video rules require organizer confirmation because the transcript is ambiguous.

## Evidence to gather before judging

Observe the full task without steering. Ask what the owner expected and what they would do next. Record completion, elapsed time, help, corrections, their interpretation of low-turnout contribution, and objections. Use the customer-validation workspace to keep observer notes and exact words separate from interpretation. The median is a usability measurement, not proven time savings against a control.

If the team has only proxy participants, describe them precisely and present those results as formative usability feedback. Report the sample size, recruitment, task, source of the inquiry, and failed attempts. Do not generalize a small convenience sample to the whole market. Ask permission before using identifiable photos, names, recordings, or quotes in the presentation.

## Q&A ownership

| Domain | Suggested owner | Concise answer to rehearse |
| --- | --- | --- |
| Customer and problem evidence | Aswin | “Our starting segment is independent venues with owner-led pricing. The key evidence we still need is how often this decision creates delay or an unacceptable deal.” |
| Deal mathematics | Jordan | “We compare venue income minus entered event costs. A guarantee is a minimum paid to the venue, not an artist guarantee. We expose promoter shortfalls and exclude unentered overhead and tax.” |
| Product, AI, and technical limits | Kushal | “This version is a local working prototype with rules and templates. External AI, inbox sync, authentication, and shared storage remain future implementation work.” |
| Validation and next steps | Nolan | “We will first test whether owners can choose and explain a deal without help. Then we will test repeat use and willingness to pay before expanding the scope.” |

Assign one facilitator for general questions. One person answers each question once. Other team members add information only if the judge asks a follow-up or the facilitator explicitly redirects. Rehearse likely questions about customer segment, data quality, alternatives, business model, and AI reliability.

## Closing line

“StageFit makes the pricing trade-off visible and keeps the venue owner in control. Our next step is to test that decision with independent venue owners, fix observed failures, and use the results to decide whether to proceed with an inbox and AI pilot. What questions do you have?”

Only replace this conditional next step with a stronger implementation claim after the evidence supports it.
