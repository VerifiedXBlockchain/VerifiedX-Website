# VFX Website — Update Notes (March 2026)

Organized from Jay's review notes. Each section maps to a page section top-to-bottom.

---

## 1. Top Bar (Announcement Strip)

- [ ] Remove GitHub stars badge
- [ ] Remove "Read Whitepaper" link
- [ ] Replace both with **"Current Block Height: _____"** in ice blue (live data, similar to NetworkStats)

## 2. Header / Navigation

### Product Dropdown — Color-coded links (no underline)
- [ ] PulseXAI → orange text, remove underline
- [ ] Butterfly → green text
- [ ] SwitchBlade Wallet → blue text
- [ ] vBTC → orange text

### Solutions Dropdown
- [ ] Add **"Everyday Users"** link → docs site video tutorials section

### Resources Dropdown
- [ ] **Security** → link to audit documents
- [ ] Remove **Blog** link
- [ ] Add **GitHub** link → VerifiedX organization

### Link Updates
- [ ] Solutions > Institutions → upcoming "Institutional" section of docs site
- [ ] Solutions > Developers → integrations page on docs site

## 3. Hero

- [ ] Under Developers, replace **"Documentation"** button with **"Code Repository"** → GitHub

## 4. Ecosystem Partners

- [ ] Flatten into a single row of logos — no category headers/sections (match current live site style)
- [ ] Add **x402** logo
- [ ] Add **Stripe** logo

## 5. Use Bitcoin as Financial Capital

### Existing Cards
- [ ] **Send Global Payments**: remove "using Butterfly" from description → "Send digital assets instantly anywhere in the world."
- [ ] **Send Global Payments**: button text → **"Launch Application"** (link to upcoming wallet docs page)

### New Card
- [ ] Add **"Transfer Bitcoin Privately"** card
  - Description: "Move funds via a consensus embedded privacy layer."
  - Button: **"Activating Soon"** (disabled/muted style)
  - Icon: use the current `tabler:shield-lock` (from "Own Your Money")

### Icon Change
- [ ] **Own Your Money** needs a new icon (shield-lock is now used by Transfer Bitcoin Privately)

## 6. vBTC / Unlock Section

- [ ] Update body copy — add "and is non-synthetic" to end: *"...Each vBTC is backed 1:1 by Bitcoin and is non-synthetic."*
- [ ] Console diagram: replace **"FROST MPC Validators"** with **"FROST MPC Threshold Signatures"**
- [ ] Console diagram: update last line to **"DeFi / Payments / Tokenized Agents / Agentic Markets"**

## 7. Self-Custodial Financial Applications

### PulseXAI Card
- [ ] Title → **"PulseXAI: Tokenized Intelligence"**
- [ ] Description → "Tokenized AI agents and markets executing strategies with generative intelligence."

## 8. How It All Connects (Ecosystem Diagram)

### Center Badge
- [ ] Remove "VFX Ecosystem" label from flywheel center

### Left Stack — Reorder
- [ ] **Bitcoin** → move to top, subtitle: "Global Asset"
- [ ] **VerifiedX Network** → second, add subtitle: "The Financial Operating System"
- [ ] **Financial Layer** → third
- [ ] **Applications** → fourth
- [ ] **Users & AI Agents** → bottom

### Bug Fix
- [ ] Flywheel traveling dot doesn't always appear (e.g., refreshing mid-page). Likely a `client:visible` / IntersectionObserver timing issue — animation may not start if component mounts while already in viewport.

## 9. Institutional-Grade Infrastructure

- [ ] Add bullet **before** "Validator consensus": **"Consensus embedded smart contract features"**

## 10. Network Activity

- [ ] Add ice blue button below stats: **"Launch Spyglass Explorer"**

## 11. Closing CTA (The Future of Self-Custodial Finance)

- [ ] Style "VerifiedX" in **ice blue** and "Bitcoin" in **orange** in the body text
- [ ] Change "Open Butterfly" button to **"Applications"** → link to upcoming wallet docs page

## 12. Footer

- [ ] Style the "X" in "VerifiedX" in **ice blue**
- [ ] Add vBTC animation video between the subtitle and copyright
- [ ] Update nav links to match header changes

## 13. Global / Cross-cutting

### PulseXAI Buttons (~3 across site)
- [ ] All PulseXAI action buttons should show a **toast notification**: "Activating Soon"

---

## Questions / Needs Clarification

1. **x402 and Stripe logos** — Do we have these assets, or do they need to be sourced/created?
=> Sourced - u can use a fake path for now
2. **"Own Your Money" new icon** — Any preference on what icon to use? (`tabler:lock`, `tabler:wallet`, `tabler:fingerprint`, etc.)
=> fingerprint sounds cool
3. **"Launch Application" link** — What's the URL for the upcoming wallet docs page? (placeholder `#` for now?)
=> placeholder for now
4. **"Activating Soon" button style** — Should this be a disabled-looking button, or a normal button that triggers the toast on click?
=> for the ones that don't say activating soon, normal button: triggers a nice toast. For the one that actually says "activating soon" -> we can just make that a disabled button
5. **"Everyday Users" docs link** — What's the URL for the video tutorials section?
=>https://docs.verifiedx.io/docs/tutorials/video-tutorials/
6. **Audit documents link** — Do we have a URL for Security > audit reports?
=>https://docs.verifiedx.io/docs/documents/
7. **GitHub organization link** — Confirm: `https://github.com/VerifiedXBlockchain`?
=> correct
8. **Institutions docs link** — URL for the upcoming institutional section?
=> "#" for now
9. **Developers/integrations docs link** — URL for the integrations page?
=> https://docs.verifiedx.io/docs/integration/
10. **vBTC animation video for footer** — Is this an existing asset? What format (mp4, gif, Lottie)?
=> mp4 file that we will loop / playsinline. will need to be scaled down. here is the asset "public/vbtc.mp4"
11. **Current block height in top bar** — Should this use the same API endpoint as NetworkStats (`data.verifiedx.io/api/metrics/`)?
=> yes
12. **Flywheel dot bug** — Should we switch from `client:visible` to `client:load` to ensure the animation always initializes?
=> Sure

---

## Out of Scope (Docs Site)

These items were noted but belong to the docs site, not the marketing site:

- After video tutorials, add an **"Ecosystem"** tab with: Institutional Overview + Interactive Console (ecosystem map)
- Add a docs page for all wallet download buttons + Snapshot + Butterfly
