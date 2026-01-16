# EngOS Reset Guide

## How Engineering Works in Automation BU

*Shape Up × Team Topologies × API-First Contracts — Human Edition*

**Version:** EngOS v4.4 (Canonical Aggregated — AS-IS + Approved Clarifications)  
**Cadence:** 4 weeks total = **Weeks 1–3 Build** + **Week 4 Cooldown + Next-Cycle Betting**  
**This is a reset document.** It replaces old habits and gives you a simple way to detect drift.

---

# TOP SECTION — Read This First

## 1) EngOS Reset in 2 Minutes

### What EngOS is

EngOS is how we decide and build software **without falling back into scrum-fall** (big planning, late surprises, coordination theater, “just one more thing”).

We use a simple model:

* We **bet time**, not scope.  
* We **shape** work to remove risk before we start.  
* We **prove integration early**, or we stop and fix the plan.  
* We **ship within the timebox**, by cutting scope instead of cutting quality.  
* We use **Week 4** to recover, learn, and **place next-cycle bets** — not to “finish.”

### What changes today

* If work is not tied to a **time bet** (or an urgent/incident tradeoff), it is **not authorized**.  
* “We aligned in the call” is **not a decision**. Decisions live in written artifacts.  
* “We’ll coordinate later” is **not a dependency plan**. Dependencies must be eliminated, stubbed, deferred, or turned into a contract.  
* Platform work is delivered as **capabilities** with **clear contracts and adoption guidance**, not negotiated roadmaps.  
* Week 4 is **cooldown + betting**, not a hidden build week. If you try to “finish features” in Week 4, you are breaking EngOS.

---

## 2) The Cadence

### The 4-week cycle

**Weeks 1–3: Build**

* **Week 1:** Start build + **prove the thin slice works** *(bets were approved in Week 4)*  
* **Week 2:** Go “downhill” (reduce uncertainty, cut scope if needed)  
* **Week 3:** Harden + ship (freeze mid-week, ship by end of week)

**Week 4: Cooldown + Next-Cycle Betting**

* Fix high-leverage bugs/debt  
* Capture learning and update standards  
* **Run next-cycle betting (approve time bets for Weeks 1–3 of the next cycle)**  
* Platform publishes “capabilities this cycle” for the next cycle

### Shaping is a separate track (continuous)

Shaping is **not confined to Week 4**. It runs continuously with **dedicated shaping capacity**.  
Engineers assigned to shaping in a given cycle **should not be on the build critical path** for Week 1–3 delivery.  
The goal is to keep shaping high-quality and fast without jeopardizing delivery focus.

### The point of Week 4

Week 4 prevents:

* burnout,  
* quality debt,  
* and repeating the same mistakes every cycle.

**Week 4 is not a hidden build week.** If you use it that way, you are breaking EngOS.

---

## 3) Non-Negotiable Rules (Rule / Why / Detect / What to do)

| Rule | Why it exists | Early violation signals (what you’ll see/hear) | What to do immediately |
| :---- | :---- | :---- | :---- |
| 1\. We bet **time**, not scope | Fixed scope + fixed time forces quality debt or burnout | “We promised these 10 items.” “We must deliver all of it.” | Re-state the scope line. Cut scope; keep time fixed. |
| 2\. No work starts without a **time bet** (or urgent/incident tradeoff) | Stops stealth work and random interrupts | “Can you just…” becomes work | Stop. Put into next-cycle shaping or log as urgent/unplanned with tradeoff. |
| 3\. Shape removes risk before build | Prevents late surprises and churn | “We’ll figure it out as we go.” | Mark **Not Yet**. Shape risks and dependencies first. |
| 4\. Dependencies must be **E/C/S/D** | Coordination is expensive; contracts are cheaper | “We need another team to commit.” “We’ll sync weekly.” | Choose Eliminate/Contract/Stub/Defer. If none work: **Not Yet**. |
| 5\. Integration proof happens early | Late integration is where projects die | “It’s mostly done; just needs wiring.” | Stop and produce a thin-slice proof now or descope. |
| 6\. Adds require same-day removes | Prevents scope creep | “It’s small.” “We can squeeze it in.” | Remove something immediately and record the cut. |
| 7\. Cut scope, never quality | Quality debt compounds | “We’ll add tests later.” “We’ll harden in Week 4.” | Cut features, not tests/monitoring/rollback. |
| 8\. Week 4 is cooldown-only (no feature scope) | Prevents burnout and makes learning compound | New features starting in Week 4 | Stop. Move feature scope to framing/shaping for next cycle. |
| 9\. Decisions live in writing, not meetings | Prevents confusion and re-litigation | “We decided in that call…” but nothing written | Write the decision and link it. If not written, it didn’t happen. |
| 10\. Platform work is discoverable and adoptable without meetings | Prevents negotiation forums and gatekeeping | Platform roadmap meetings multiply | Publish capability + contract + adoption guide so teams can adopt without meetings; avoid recurring negotiation forums. |
| 11\. Urgency doesn’t bypass the system | Otherwise urgency becomes the system | “This is critical” but nothing gets displaced | Log urgent. Name displaced work. Leadership owns tradeoff. |
| 12\. Shipping happens in Week 3 | Keeps cadence real and predictable | “We’ll ship next week” (Week 4) | Descope and ship the slice, or stop and reshape for next cycle. |
| 13\. If we’re still “figuring it out” mid-Week 2, we cut hard | Hope is not a plan | Week 2 still “uphill” | Cut at least half remaining scope or stop and reshape. |
| 14\. Sync is **rare and approved** | Prevents coordination creep | “Let’s set up a weekly sync” | Replace with async artifact comments; if truly needed, approve as exception and record it. |

### Clarification for Rule 10 (Platform Capabilities)

**What this rule means**
- Platform teams should make their work understandable and usable through artifacts.
- Teams should not need meetings just to learn what exists or how to use it.

**What this rule does NOT mean**
- It does not mean platform ships in isolation.
- It does not mean consumers cannot influence the contract.
- It does not mean no sync ever happens.

**It means**
- No recurring platform roadmap or negotiation meetings.
- Alignment happens through contract proposals, async review, and early integration proof.

---

## 4) Stop Doing This (Old Habits We Are Resetting)

| Old habit (stop) | Why it’s harmful | What to do instead |
| :---- | :---- | :---- |
| Scrum-fall planning (big upfront plans + late integration) | Creates false certainty and late failure | Shape risk + prove early + cut scope |
| Pre-alignment across many teams | Turns planning into theater | Shape locally; contract-first; sync only by exception |
| Weekly dependency syncs | Coordination tax becomes permanent | E/C/S/D + contracts + stubs |
| “We aligned in the call” | Not auditable; leads to drift | Write it down as a decision |
| Platform as a gate | Slows everyone; creates queues | Platform as paved road: self-service contracts |
| Cutting tests to ship | Converts schedule risk into reliability risk | Cut scope; keep quality |
| Using Week 4 to “finish” | Destroys recovery and learning | Week 4 for repair + learning + shaping only |
| Starting work from requests | Creates scope creep and thrash | Frame the problem; define success |

---

## 5) Roles & Responsibilities (Simple)

| Role | What they own | What they must never do |
| :---- | :---- | :---- |
| EL (Head of Eng / GDL / VP) | Protect cadence, stop drift, enforce tradeoffs | Force mid-cycle scope adds without displacement |
| TDM (team manager) | Runs cycle: bets, scope line, checklists | Allow stealth work; allow “coordinate later” |
| TL / Architect / DSE | Technical risk removal + proof + ship readiness | Hide risk until Week 3 |
| PM / UXD | Problem framing, success criteria, value-preserving cuts | Turn shaping into requirements lists |
| PLAT (AI Platform lead) | Paved road capabilities + to contracts + adoption guides | Become bespoke feature factory or meeting gate |
| Any team member | Can stop-the-line (mandatory reporting) | Use stop-the-line as politics; must be good faith |

---

## 6) How Work Flows (The EngOS Loop)

**Frame → Shape → Bet → Build → Prove → Ship → Learn** *(Betting happens during Week 4 for the next cycle.)*

| Step | Purpose | Output |
| :---- | :---- | :---- |
| Frame | Define problem and success | Problem + success criteria |
| Shape | Remove risk and resolve dependencies **(continuous track with dedicated capacity)** | Scope line + E/C/S/D + proof plan **ready for Week 4 betting** |
| Bet | Approve time only (for next cycle) | Time appetite + kill criteria |
| Build | Execute within time | Progress + scope cuts |
| Prove | Show thin slice early | Integration proof |
| Ship | Release safely | Ship decision + readiness |
| Learn | Fix, document, improve | Learning + standards updates |

---

## 7) Meetings (Minimal)

### Required checkpoints

| Checkpoint | When | Output |
| :---- | :---- | :---- |
| Betting | **Week 4 (for next cycle)** | Yes/No/Not Yet + time bet |
| Proof check | Week 1 | Proof exists or we cut/stop |
| Scope check | Week 2 | Cuts applied if behind |
| Ship decision | Week 3 | Ship / descope+ship / stop |
| Learning review | Week 4 | What changes next cycle |

### Forbidden by default

| Forbidden meeting | Why | Replacement |
| :---- | :---- | :---- |
| Status meetings | Pure overhead | Read the artifacts |
| Dependency syncs | Choreography | E/C/S/D + contracts |
| Platform roadmap reviews | Negotiation forums | Capability publication |
| Pre-alignment rituals | Theater | Local shaping |

---

## 8) Dependencies & Contracts (E/C/S/D in plain language)

| Option | Meaning | When to use |
| :---- | :---- | :---- |
| **E**liminate | Redesign so you don’t need the dependency | Best option; reduces coordination |
| **C**ontract | Define an interface teams can rely on | When dependency is real but can be stabilized |
| **S**tub | Use fake response to unblock proof/build | When you need progress without waiting |
| **D**efer | Remove from scope line and do later | When value is optional in this appetite |

**If you can’t choose one, the bet is “Not Yet.”**

### Contract Alignment Path (Default)

This is how teams align on a “right” contract without creating negotiation forums.

1. Consumer posts a Capability Need (1 page):
   - What problem they’re solving
   - Success criteria
   - Constraints (latency, auth, scale)

2. Platform responds with a Contract Proposal:
   - Draft contract/spec
   - Constraints and guarantees
   - Adoption notes and examples

3. Async review window (24–72h):
   - Comments happen on the artifact
   - No standing meetings

4. If still unclear:
   - One exception boundary-definition session (max 60 minutes)
   - Output must be the updated contract + decision record

5. Validate with early integration proof:
   - Thin slice proves the contract is usable
   - Changes happen via versioning, not renegotiation

---

## 9) Unplanned Work (Incidents / Urgent / Unplanned)

| Class | Definition | Rule | Who pays |
| :---- | :---- | :---- | :---- |
| Incident | Reliability/security issue | Handle immediately; learning required | Everyone: interrupts the plan |
| Urgent | Time-critical business impact | Must displace something | Leadership owns tradeoff |
| Unplanned | Small surprises | If it displaces, record it | Team pays; must be explicit |
| Not work | Requests/questions | Redirect | Nobody |

**Payment rule:** If urgent work is “critical,” something else gets displaced. This is written down.

---

## 10) Drift Detection (Smells You Can Recognize)

| Smell | What it means | Fix |
| :---- | :---- | :---- |
| “We need to align first” | Dependency theater | E/C/S/D or Not Yet |
| “We’ll integrate later” | Hidden risk | Thin slice now |
| “It’s small, we can add it” | Scope creep | Remove something now |
| “We’ll harden in Week 4” | Cooldown abuse | Cut scope; ship safely |
| New recurring syncs | Coordination creep | Delete meeting; use contracts |
| Platform requires meeting to use API | Platform gate | Publish contract + adoption guide |

---

## 11) Weekly Schedule — Simple (Week-by-week, Role-by-role)

Week 1: Decide & Prove  
Week 2: Commit or Cut  
Week 3: Harden & Ship  
Week 4: Cooldown

### Week 1 — Start Build & Prove

| Role | Required focus | Key outputs |
| :---- | :---- | :---- |
| EL | Enforce proof discipline | Proof exists; drift meetings killed |
| TDM | Enforce proof | Proof checkpoint |
| TL/DSE | Deliver thin slice | Integration proof |
| Engineers | Build smallest end-to-end path | Runnable path |
| PM/UXD | Validate proof = real value | Success criteria stable |
| PLAT | Ensure contracts usable | Contract/adoption clarity |

### Week 2 — Commit or Cut

| Role | Required focus | Key outputs |
| :---- | :---- | :---- |
| EL | Enforce scope cuts | Scope reduced if behind |
| TDM | Add/remove discipline | Cuts recorded |
| TL/DSE | Reduce risk surface | Fewer unknowns |
| Engineers | Go downhill | Stable progress |
| PM/UXD | Choose value-preserving cuts | Core value protected |
| PLAT | Maintain compatibility | No breaking changes |

### Week 3 — Harden & Ship

| Role | Required focus | Key outputs |
| :---- | :---- | :---- |
| EL | Protect ship decision | Ship happens |
| TDM | Enforce freeze + readiness | Ship decision |
| TL/DSE | Rollback/observability | Safe release |
| Engineers | Harden + ship | Delivered slice |
| PM/UXD | Validate readiness | UX correct |
| PLAT | Ship consumable capability | Adoption ready |

### Week 4 — Cooldown + Next-Cycle Betting

| Role | Required focus | Key outputs |
| :---- | :---- | :---- |
| EL | Review system health; approve bets as needed | Drift addressed; bets approved |
| TDM | Lead learning + shaping; run next-cycle betting | Learning; next-cycle bet decisions |
| TL/DSE | Standards updates; confirm each bet is technically “bettable” (proof plan defined, dependencies resolved via E/C/S/D, cut list and kill criteria present) | Updated contracts/standards; bet-ready shapes |
| Engineers | Fix debt/bugs (build team); shaping team continues shaping | Capacity restored; candidates shaped |
| PM/UXD | Frame next problems; participate in next-cycle betting | Strong frames; bet decisions supported |
| PLAT | Publish next-cycle capabilities; support bet inputs asynchronously | Capabilities publication; contract readiness |

---

## 12) Micro Examples (15 good vs bad)

| \# | Good | Bad |
| ----: | :---- | :---- |
| 1 | “Concurrency failures; success \<1% + telemetry” | “Improve reliability” |
| 2 | “Proof runs end-to-end in staging” | “Scaffolding is ready” |
| 3 | “Stub now, contract later, no waiting” | “Need team X to commit” |
| 4 | “Added A, removed B same day” | “Added a few small things” |
| 5 | “Cut scope, keep tests” | “Cut tests to ship” |
| 6 | “Week 4: fix + learn + shape + bet” | “Week 4: finish features” |
| 7 | “Contract published with versioning plan” | “Internal endpoint, don’t share” |
| 8 | “Platform capability for 2+ consumers” | “Bespoke for one team” |
| 9 | “Decision recorded in writing” | “We aligned in the call” |
| 10 | “Dependency eliminated by redesign” | “We’ll coordinate later” |
| 11 | “Mid-Week 2 still uphill → cut 50%” | “We’ll catch up next week” |
| 12 | “Feature freeze Week 3 mid-week” | “New scope in Week 3” |
| 13 | “Urgent work displaces X explicitly” | “Urgent but nothing displaced” |
| 14 | “No recurring syncs; async comments” | “Let’s meet weekly to align” |
| 15 | “Platform adoption guide included” | “Ask us in a meeting” |

Additional platform alignment example:
- Good: Consumer posts Capability Need; platform proposes contract; async review; one boundary session; proof in Week 1.
- Bad: Weekly platform sync to negotiate requirements; contract emerges late; adoption requires meetings.

---

## 13) Key Terms (Glossary)

| Term | Meaning |
| :---- | :---- |
| Bet | Approval of time only (placed in Week 4 for next cycle) |
| Shaping | Removing risk before building (continuous track) |
| Thin slice | Smallest end-to-end proof |
| E/C/S/D | Eliminate / Contract / Stub / Defer |
| Scope line | In / Out / Later boundary |
| Cooldown | Protected recovery + learning + shaping |
| Stop-the-line | Halt work to address systemic risk |

---

# PART II — DETAILED OPERATING GUIDE (Deep Dive)

## 14) Detailed schedule (Week-by-week, Role-by-role)

**Note:** Shaping runs continuously in parallel with build. Engineers assigned to shaping are **not** on the build critical path. Week 4 is when shaping outputs are finalized into bets for the next cycle.

### Week 1 (Start Build & Prove) — Detailed

| Role | Must do | Must not do | Evidence/output | Drift questions |
| :---- | :---- | :---- | :---- | :---- |
| EL | Enforce proof; kill coordination creep | Allow “we’ll integrate later” | Proof exists | “Do we have a runnable slice?” |
| TDM | Enforce proof checkpoint | Approve “Not Yet” as build work | Proof decision | “Is this work actually bet/ledger-backed?” |
| TL/DSE | Produce thin slice | Build foundations only | Proof artifact | “Can we demo end-to-end?” |
| Eng | Integrate early | Work in isolation | Running path | “Are we avoiding integration?” |
| PM/UXD | Validate value | Expand scope | Stable success criteria | “Did success change?” |
| PLAT | Publish usable contracts | Require meetings | Contract + adoption notes | “Can consumers self-serve?” |

### Week 2 (Commit or Cut) — Detailed

| Role | Must do | Must not do | Evidence/output | Drift questions |
| :---- | :---- | :---- | :---- | :---- |
| EL | Enforce cuts if still uphill | Reward “hope” | Scope reduced | “Are we still figuring out?” |
| TDM | Enforce add/remove | Let scope grow | Cuts recorded | “Did we remove as we added?” |
| TL/DSE | Reduce unknowns | Keep risky scope | Fewer risks | “What risk still unbounded?” |
| Eng | Go downhill | Start new scope | Stable progress | “Are we thrashing?” |
| PM/UXD | Choose value-preserving cuts | Re-litigate goals | Protected core | “What’s the minimum valuable slice?” |
| PLAT | Ensure compatibility | Break contracts | No breakage | “Did we ship a stable interface?” |

### Week 3 (Harden & Ship) — Detailed

| Role | Must do | Must not do | Evidence/output | Drift questions |
| :---- | :---- | :---- | :---- | :---- |
| EL | Protect ship decision | Allow “ship next week” | Ship happens | “What must be cut to ship?” |
| TDM | Enforce freeze | Allow new scope | Ship decision | “Is this shippable?” |
| TL/DSE | Rollback + observability | Trust “it works” | Safe release | “Can we roll back safely?” |
| Eng | Harden + ship | Add features | Release-ready slice | “Are we adding net-new logic?” |
| PM/UXD | Validate readiness | Add new requests | UX correct | “Is the user experience coherent?” |
| PLAT | Ship consumable capability | “Ask us later” | Adoption-ready | “Can consumers adopt without a meeting?” |

### Week 4 (Cooldown + Next-Cycle Betting) — Detailed

| Role | Must do | Must not do | Evidence/output | Drift questions |
| :---- | :---- | :---- | :---- | :---- |
| EL | Review system health; approve bets as needed | Treat cooldown as build | Drift addressed; bets approved | “Are we sneaking build work?” |
| TDM | Learning + shaping + run next-cycle betting | Start new features | Learning + bet decisions | “Are we approving time only?” |
| TL/DSE | Standards/contracts updates; finalize shaping inputs for bets | Ignore repeat issues | Standards updated; bet-ready shapes | “Did we remove risk before betting?” |
| Eng | Fix debt/bugs (build team); shaping team continues shaping | Continue feature scope | Debt reduced; shaped candidates | “Did we restore capacity?” |
| PM/UXD | Frame next problems; participate in betting | Dump requirements | Better frames; bet decisions | “Is framing problem-first?” |
| PLAT | Publish next-cycle capabilities; support betting inputs async | Negotiate roadmap | Capability publication | “Is adoption self-serve?” |

---

## 15) Framing (Deep Dive)

| Aspect | Details |
| :---- | :---- |
| What it is | A short statement of the **problem**, customer, and success criteria |
| Why it matters | Prevents solution-first thrash and re-litigation |
| Lead role | PM/UXD with TL support |
| Participants | PM/UXD + TL/DSE + (optional engineer); keep small |
| Limits | 1–2 pages max; no solution spec |
| Output | Framing doc or section in pitch |
| Drift signals | “We already know the solution”; success criteria changes mid-cycle |
| Anti-patterns | Requirement dumps; “everyone agrees” but nothing written |
| Corrective actions | Rewrite as problem + measurable success |

**Checklist**
- Problem in 1–2 sentences
- Customer clear
- 3–5 observable success criteria
- Non-goals explicit
- Top unknowns listed

---

## 16) Shaping (Deep Dive)

| Aspect | Details |
| :---- | :---- |
| What it is | Risk removal before building: scope line + E/C/S/D + proof plan |
| Why it matters | Turns uncertainty into a bettable plan |
| Lead role | TL / Architect / DSE |
| Participants | 2–4 max (PM/UXD optional) |
| Limits | No cross-team shaping by default; sync-by-exception only |
| Outputs | Scope line (In/Out/Later), proof definition, dependency resolution, cut list, kill criteria |
| Drift signals | “Need alignment”; dependencies increasing; proof vague |
| Anti-patterns | Design doc perfection; dependency theater |
| Corrective actions | Mark Not Yet; simplify; resolve deps via E/C/S/D |
| Staffing rule | **Shaping capacity is dedicated.** Engineers assigned to shaping **must not** be on the build critical path in Weeks 1–3. |
| WIP limit | Each team keeps **≤2 active shaping candidates per shaper** to avoid thrash and half-finished pitches. |

**Dependency limits**
- If you can’t choose E/C/S/D for a dependency → **Not Yet**
- “We’ll coordinate later” is invalid

---

## 17) Betting (Deep Dive)

| Aspect | Details |
| :---- | :---- |
| What it is | Approving **time** only; deciding Yes/No/Not Yet |
| When it happens | **Week 4 (Cooldown)** for the next cycle |
| Why it matters | Prevents scope promises and endless negotiation |
| Lead role | TDM |
| Participants | Decision makers only; keep small |
| Limits | 60–120 min; no follow-up alignment meetings |
| Output | Written bet decision |
| Drift signals | Decisions deferred; debating “how” instead of “whether” |
| Anti-patterns | “Yes but we’ll figure it out” |
| Corrective actions | Not Yet with explicit missing items |

---

## 18) Build & Proof (Deep Dive)

| Aspect | Details |
| :---- | :---- |
| What it is | Build the thin slice first; prove integration early |
| Why it matters | Prevents “late wiring” failure |
| Lead role | TL/DSE |
| Proof timing | Week 1 proof is mandatory; earlier is better |
| Drift signals | “Almost integrated”; foundations-only week |
| Corrective actions | Stop, produce thin slice, descope |

**Proof checklist**
- End-to-end path runs (staging acceptable)
- Interfaces exercised
- Errors observable
- If not true → cut or stop

---

## 19) Scope discipline & the “Scope Hammer” (Deep Dive)

| Aspect | Details |
| :---- | :---- |
| What it is | If still “uphill” mid-Week 2, cut at least half remaining scope |
| Why it matters | Removes hope-based planning |
| Lead role | TDM + TL |
| Trigger | Mid-Week 2 still uncertain / still integrating / risks unbounded |
| Output | Cuts recorded and communicated |
| Drift signals | “We’ll catch up later” |
| Corrective actions | Cut now; ship minimum valuable slice |

---

## 20) Week 3 Freeze & Ship Decision (Deep Dive)

| Aspect | Details |
| :---- | :---- |
| What it is | Mid-week freeze: no new scope; focus on hardening |
| Why it matters | Ensures ship stability |
| Lead role | TDM |
| Limits | No net-new logic after freeze |
| Drift signals | New features added late Week 3 |
| Corrective actions | Cut; ship smaller; move remainder to shaping |

---

## 21) Meetings (Deep Dive)

| Meeting | Purpose | Lead | Limits | Forbidden discussion | Required output |
| :---- | :---- | :---- | :---- | :---- | :---- |
| Betting | Decide time | TDM | ≤2h | How to build | Bet decision |
| Proof check | Confirm integration | TL | ≤30m | Status theater | Proof artifact |
| Scope check | Cut scope | TDM | ≤30m | Adding scope | Updated scope line |
| Ship decision | Ship or stop | TDM | ≤30m | “Ship next week” | Ship decision |
| Learning | Change system | TDM | ≤60m | Blame | Learning + updates |

---

## 22) Platform capabilities (Deep Dive)

| Aspect | Details |
| :---- | :---- |
| What it is | Publish paved roads: capability + contract + adoption guide |
| Why it matters | Prevents platform gatekeeping and negotiation |
| Lead role | PLAT |
| Output | Capability publication + contract + adoption notes |
| Limits | Platform does not require meetings for adoption |
| Drift signals | Stream teams must attend platform roadmap meetings |
| Corrective actions | Publish async; remove negotiation meetings |

---

## 23) Unplanned work (Deep Dive)

| Class | Who decides | Required action | Drift signal |
| :---- | :---- | :---- | :---- |
| Incident | TDM + EL if major | Act immediately; learning required | “We’ll handle later” |
| Urgent | Leadership | Must displace something | Nothing displaced |
| Unplanned | TDM | Log if displacing | Stealth work appears |
| Not work | Anyone | Redirect | Work starts anyway |

---

## 24) Drift detection (Deep Dive)

| Drift question | If yes | Action |
| :---- | :---- | :---- |
| Are we meeting instead of contracting? | Drift | Replace meeting with contract artifact |
| Are we integrating late? | Drift | Thin slice now |
| Are we using Week 4 to finish features? | Drift | Stop-the-line |
| Are decisions undocumented? | Drift | Write decision before work continues |

---

## 25) References (Further Reading)

- **Shape Up** — Basecamp  
- **Team Topologies** — Matthew Skelton & Manuel Pais  
- **Accelerate** — Nicole Forsgren, Jez Humble, Gene Kim  
- **Conway’s Law** — Melvin Conway  
- **API/Contract-First Design** — OpenAPI and compatibility/versioning practices  
- **The Goal** — Eliyahu Goldratt (systems thinking)

---

# EngOS Review — Gaps, Risks, and Improvement Opportunities (Separate Report)

## Gaps

1. Incident severity runbook could be expanded (P0/P1/P2 with owners and SLAs).  
2. API contract standards could be upgraded into a 2–3 page “Contract Guide” (versioning, deprecation windows, compatibility promises).  
3. Metrics dashboard not defined visually (proof rate, ship rate, scope cut rate, interrupt cost).  
4. Onboarding could be extracted into a 1-page “EngOS for New Hires.”

## Adoption risks

1. Teams will try to smuggle work as “urgent” without displacement.  
2. Week 4 will be attacked as a hidden build week.  
3. Platform teams may become a gate through “helpfulness meetings.”

## Improvement opportunities

1. Create a lightweight “artifact pack” and train TDMs on running the gates.  
2. Add a quarterly “system health review” with EL using drift smells as agenda.  
3. Later: systematize drift detection with Git + AI enforcement.

---

# ADDITIONS TO THE PLAYBOOK (NO WEAKENING)

## 26) Incident Severity Runbook (P0 / P1 / P2) — Operational

### What this is

A simple classification system so incidents are handled consistently, quickly, and without “severity debates.”

### Why it matters

Incidents are where teams revert to chaos. This runbook keeps response fast **and** feeds learning back into EngOS.

### Incident Severity Table

| Severity | Definition (plain language) | Examples | Initial Owner | Decision Authority | Target Response | Target Restore | Communication cadence |
| :---- | :---- | :---- | :---- | :---- | ----: | ----: | :---- |
| **P0** | Active outage or severe security event; many users/customers impacted OR high-risk breach | Production down, auth outage, data exposure, major performance collapse | **Incident Commander (IC)** appointed immediately (TDM or EL delegates) | **EL** (or designated on-call exec) | ≤ 15 min | ≤ 4 hrs (best effort) | Every 30–60 min |
| **P1** | Major degradation; limited or partial outage; high business impact but not full outage | Key feature broken, serious latency, high error rate | **TDM** as IC unless escalated | **TDM + EL** if cross-team impact | ≤ 30 min | ≤ 24 hrs | Every 2–4 hrs |
| **P2** | Localized defect; low/medium impact; can be scheduled but must be tracked | Single tenant issue, edge bug, minor regression | **TDM** assigns owner | **TDM** | ≤ 1 business day | ≤ 1–2 weeks | Daily async note |

### Required Incident Flow (All Severities)

| Step | What happens | Output artifact | “Done” means |
| :---- | :---- | :---- | :---- |
| 1) Classify | Choose P0/P1/P2 | `tradeoff-ledger.md` entry + `incident.md` stub | Severity recorded |
| 2) Assign IC | One owner runs it | `incident.md` includes IC + responders | IC named |
| 3) Contain | Stop bleeding | `incident.md` updates | Blast radius stabilized |
| 4) Restore | Bring service back | `incident.md` restore notes | Service restored or workaround deployed |
| 5) Communicate | Keep stakeholders informed | Status updates logged | Cadence maintained |
| 6) Learn | Root cause + prevention | `learning.md` + `standards-update.md` if needed | Prevent recurrence encoded |

### Incident Artifacts (Required)

**Create folder:** `.engos/cycles/<cycle>/incidents/<INCIDENT-ID>/`

| Artifact | Required for | Contents |
| :---- | :---- | :---- |
| `incident.md` | P0/P1/P2 | Severity, IC, timeline, impact, current status, mitigation, links |
| `tradeoff-ledger.md` | P0/P1/P2 | Time cost + displaced work (yes, even during incidents) |
| `learning.md` | P0/P1 always; P2 if repeat | Root cause + what changes |
| `standards-update.md` | when repeat or systemic | Contract/standard/test/monitor updates |

### “Who pays?” rule (incidents)

- **P0/P1** can preempt bets, but the cost must still be visible in the ledger.  
- **P2** must be scheduled or explicitly traded off.

---

## 27) API Contract Guide (2–3 page equivalent) — Contract-First, Human Readable

### What this is

A contract rulebook so teams can collaborate through **interfaces** instead of meetings.

### Why it matters

Most cross-team pain is really **unclear interfaces**. Contracts reduce coordination, protect autonomy, and prevent platform gatekeeping.

### Contract Principles

| Principle | Rule | Practical meaning |
| :---- | :---- | :---- |
| Contract is the collaboration unit | If two teams need to coordinate, define the contract | You write interface, not meeting series |
| Backward compatibility default | Don’t break consumers silently | Changes should not require synchronized rollouts |
| Versioning is explicit | Breaking changes require version bump | Consumer opt-in to new version |
| Deprecation is a promise | Deprecations require window + communication | No surprise removals |
| Adoption is part of delivery | A contract is not “done” until a consumer can use it | Include examples + migration steps |

### Contract Types (Allowed)

| Type | When to use | Stored where |
| :---- | :---- | :---- |
| OpenAPI (preferred) | HTTP APIs | `.engos/contracts/<service>/openapi.yaml` |
| JSON schema / proto | event/messages/RPC | `.engos/contracts/<service>/schema/…` |
| SDK surface / interface spec | shared libraries | `.engos/contracts/<service>/sdk/…` |

### Compatibility Rules (Non-negotiable defaults)

| Change type | Allowed in same version? | Notes |
| :---- | ----: | :---- |
| Add new optional field | ✅ Yes | Must not change behavior for old clients |
| Add new endpoint | ✅ Yes | Must be documented and tested |
| Change meaning of existing field | ❌ No | Breaking; requires new version |
| Remove field/endpoint | ❌ No | Breaking; requires deprecation and versioning |
| Tighten validation | ⚠️ Often breaking | Treat as breaking unless proven safe |
| Change auth requirements | ⚠️ Usually breaking | Requires migration plan |

### Versioning Rules (Simple)

| Rule | What it means | Example |
| :---- | :---- | :---- |
| Breaking changes → new major version | Consumers must opt-in | `/v2/...` introduced, `/v1/...` remains |
| Minor compatible changes → same major | Additive change | new optional field |
| Deprecation window required | You must give time | “Deprecated in Cycle C03, removed no earlier than C06” |

### Deprecation Policy (Required)

| Item | Requirement |
| :---- | :---- |
| Deprecation notice | Must be written in `decision.md` + contract notes |
| Deprecation window | Minimum: **2 cycles** (unless EL approves emergency) |
| Migration guide | Required: steps + examples |
| Owner | Contract owner must be named |

### Contract Collaboration (Sync-by-exception)

A meeting is allowed **only** when:

- a **new boundary** is unclear **and cannot be resolved async**  
- must be approved + recorded (per sync exception policy)  
- max 2 sessions  
- output must be: updated contract artifact + compatibility plan

### “Platform must be self-serve” rule

If a stream-aligned team needs a meeting to adopt a platform API, the platform is behaving as a gate. Fix = publish contract + adoption guide.

---

## 28) Metrics Dashboard (Defined Visually in Tables)

### What this is

A small set of metrics that tell leadership and teams whether EngOS is working.

### Why it matters

Without measurement, drift becomes invisible and “exceptions” become the norm.

### Scoreboard Metrics (Weekly Review)

| Metric | Definition | Target | If red, do this next cycle |
| :---- | :---- | ----: | :---- |
| **Proof Rate** | % of bets that produce Week 1 proof by deadline | ≥ 80% | Reduce bet load; tighten shaping; enforce proof gate harder |
| **Ship Rate** | % of bets shipped by end of Week 3 | ≥ 80% | Increase scope cutting; enforce freeze; reduce appetite |
| **Scope Cut Rate** | % of bets that cut scope (healthy sign) | ≥ 50% (normal) | If too low, teams may be overcommitting or hiding cuts |
| **Adds Without Removes** | count of violations | ~0 | Enforce add/remove; use scope hammer earlier |
| **Interrupt Cost** | % cycle time spent on urgent/unplanned | < 10% median | Escalate tradeoffs; stop smuggled urgent; reduce WIP |
| **Coordination Creep** | new recurring cross-team meetings created | 0 net-new | Cancel meetings; replace with contracts; enforce async-first |

### Lagging Metrics (Monthly/Quarterly)

| Metric | Definition | Target | Interpretation |
| :---- | :---- | ----: | :---- |
| **Repeat Incident Rate** | same incident class repeats | trending down | If flat/up → standards not updating |
| **Rework Rate** | issues reopened or rolled back | trending down | If up → proof/quality gates weak |
| **Platform Adoption Friction** | “meeting required to adopt” incidents | 0 | If >0 → platform gate behavior |

### Platform Adoption Signal
- A stream-aligned team can adopt a platform capability with **zero meetings**.  
- Exceptions are allowed only for truly new/high-risk contract boundaries, and must be recorded.

### Weekly System Health Review (EL “Dashboard Agenda”)

- Proof rate  
- Ship rate  
- Interrupt cost  
- Coordination creep  
- Top 3 drift smells observed

---

## 29) EngOS for New Hires (1 Page)

### What EngOS is (in one paragraph)

EngOS is our way of building software without falling into heavy planning and late surprises. We bet time, shape to remove risk, prove integration early, cut scope (not quality), and use cooldown time to learn and prepare.

### The 5 rules to remember

1) If it’s not tied to a bet or ledger, it isn’t real work  
2) Prove a thin slice early (Week 1)  
3) Dependencies are solved with E/C/S/D, not meetings  
4) Adds require same-day removes  
5) Week 4 is cooldown — no new feature scope

### How to succeed in your first cycle

- Ask: “What’s the bet? What’s the scope line? What’s the proof?”  
- Surface risks early (don’t hide uncertainty)  
- Prefer contracts/stubs over meetings  
- If you see drift, speak up — you can stop-the-line

### Drift smells (learn these)

- “We’ll integrate later”  
- “We need alignment first”  
- “It’s small, let’s add it”  
- “We’ll finish in Week 4”

---

## 30) Adoption Risks — Countermeasures (Make Drift Hard)

### Risk 1: Smuggling “Urgent” work without displacement

**What it looks like:** “This is critical” → work starts, but nothing gets cut.  
**Countermeasure:**

- Urgent work requires ledger entry with time cost + displaced work + approver  
- If displaced work cannot be named, urgent is not approved.

### Risk 2: Week 4 becomes a hidden build week

**What it looks like:** new feature PRs in Week 4.  
**Countermeasure:**

- STOP_LINE if Week 4 feature scope starts.  
- Week 4 allowed only: bugs, debt, learning, shaping, betting.  
- Anything new goes to next cycle framing/shaping.

### Risk 3: Platform becomes a gate through “helpfulness meetings”

**What it looks like:** “Let’s jump on a call” becomes required to adopt APIs.  
**Countermeasure:**

- Publish contract + adoption guide.  
- Make capability self-serve.  
- Allow sync only as exception; require decision record.

---

## 31) Lightweight Artifact Pack + TDM Gate Training

### Artifact Pack (Minimal Set)

This is the minimum pack required to run EngOS reliably:

| Artifact | Purpose | When used |
| :---- | :---- | :---- |
| `bet.md` | time decision + scope line + proof | Week 4 betting (for next cycle) |
| `shape.md` | risk + E/C/S/D + cut list | Continuous + Week 4 finalize |
| `integration-proof.md` | proof evidence + decision | Week 1 |
| `progress.md` | scope changes + risks | Weeks 1–3 |
| `release-readiness.md` | ship decision + readiness | Week 3 |
| `tradeoff-ledger.md` | interrupts + displacement | Always |
| `learning.md` | what changes next | Week 4 |
| `decision.md` | exceptions/major rule changes | As needed |

### TDM “Gate Training” (90 minutes)

**Goal:** Make TDMs confident at enforcing gates without being “process police.”

| Module | Time | What TDM learns |
| :---- | ----: | :---- |
| Bet gate | 20m | Decide time-only; reject Not Yet; stop follow-up alignment |
| Proof gate | 20m | Demand real thin slice; descope/stop if missing |
| Scope discipline | 20m | Add/remove; scope hammer trigger |
| Cooldown + betting protection | 10m | Protect Week 4 from feature scope; run betting cleanly |
| Tradeoff ledger | 20m | Prevent urgent smuggling; enforce displacement |

---

## 32) Quarterly System Health Review (EL) — Drift Smell Agenda

### Purpose

A quarterly reset so EngOS remains real and doesn’t decay.

### Agenda (60–90 minutes)

| Section | Questions | Inputs |
| :---- | :---- | :---- |
| Flow health | Are we proving early? Shipping by Week 3? | Proof rate, ship rate |
| Scope discipline | Are cuts happening? Are adds controlled? | Scope cut rate, add/remove violations |
| Interrupt health | Are interrupts paid for? | Interrupt cost, ledger completeness |
| Coordination creep | Are meetings creeping back? | meeting count trend, drift report |
| Platform health | Is adoption self-serve? | adoption friction incidents |
| Standards learning | Did repeats change standards? | learning.md outcomes, standards-update.md |

### Output

- Top 3 system changes to make next quarter  
- Owners + deadlines  
- Any EngOS version bump proposals (PR)

---

# UPDATED SEPARATE REPORT (Stronger)

## EngOS Review — Gaps, Risks, and Improvement Opportunities (Updated)

### Gaps (now addressed with concrete inserts above)

- ✅ Incident severity runbook (P0/P1/P2 owners + SLAs + artifacts)  
- ✅ API Contract Guide (versioning, compatibility, deprecation, promises)  
- ✅ Metrics dashboard definition (weekly scoreboard + actions when red)  
- ✅ Onboarding one-pager (new hire reset)

### Adoption risks (now with countermeasures)

- Smuggled “urgent” work → blocked by displacement requirement  
- Week 4 attacked as build week → stop-the-line + allowed-work boundaries  
- Platform gatekeeping via meetings → self-serve contracts + adoption guides + exception audit

### Improvement opportunities (now operationalized)

- Lightweight artifact pack + TDM gate training  
- Quarterly system health review agenda for EL using drift smells

---
