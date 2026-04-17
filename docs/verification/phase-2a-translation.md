# Phase 2A Verification — VerifiedX-Website Spanish Translation

**Phase:** 2A — Spanish (es) translation of the full marketing site
**Repo:** VerifiedX-Website
**Branch:** `feat/i18n-es` @ commit `38ff3a2`
**Base:** `7449b71` (prior Phase 1A review commit)
**Verifier:** reviewer agent
**Date:** 2026-04-17

## Verdict: **PASS**

Every Phase 2A objective is met. Key coverage is complete (127/127,
zero missing, zero extra), the single interpolation token (`{year}`)
is preserved, all 4 CTA spans — including their leading/trailing
spaces — are intact, the register is consistently informal ("tú") with
no "usted" or Spain-specific constructs, diacritics are correct on
every target word, brand names are untouched, and pending-terms
candidates are used consistently with their declared Spanish
equivalents. Six recommended promotions to the canonical glossary are
listed in the Findings section.

---

## Checklist

### 1. Key completeness — en.ts ↔ es.ts
**PASS.** Structural diff via flattened key walk:
- `en` leaf keys: 127
- `es` leaf keys: 127
- Missing in `es`: 0
- Extra in `es`: 0

TypeScript's `es: TranslationSchema` annotation (from Phase 1A) would
have failed compile on any missing key, but confirmed structurally as a
belt-and-suspenders check.

### 2. Interpolation tokens preserved
**PASS.** Only token in the dictionary: `{year}` in
`footer.copyright`. Present on both sides:
- en: `'Copyright {year} VerifiedX · All rights reserved.'`
- es: `'Copyright {year} VerifiedX · Todos los derechos reservados.'`

### 3. CTA span structure preserved
**PASS.** All 4 spans intact with leading/trailing spaces exactly
preserved (critical for rendered whitespace):
| key | EN | ES |
|-----|----|----|
| `cta_body_brand` | `'VerifiedX'` | `'VerifiedX'` |
| `cta_body_middle` | `' is building the infrastructure that enables '` | `' está construyendo la infraestructura que permite a '` |
| `cta_body_bitcoin` | `'Bitcoin'` | `'Bitcoin'` |
| `cta_body_suffix` | `' to power a global self-custodial financial ecosystem.'` | `' impulsar un ecosistema financiero autocustodial global.'` |

Leading space on `cta_body_middle` and `cta_body_suffix` is kept byte
for byte in Spanish — this matters because the rendered output is
`<span>VerifiedX</span>{cta_body_middle}<span>Bitcoin</span>{cta_body_suffix}`,
so a dropped space would run words together. Good.

### 4. Glossary compliance (core terms)
**PASS.**
- **Wallet → Billetera** — 6 uses (`cta_download_wallet`,
  `terminal_wallets`, `capital_own_desc`, `capital_own_cta`,
  `apps_switchblade_desc`, `apps_switchblade_cta`). **Zero "Cartera"**
  (hard-FAIL condition per glossary — clean).
- **Send → Enviar / Envía** — `capital_send_title: 'Envía pagos
  globales'`, `capital_send_desc: 'Envía activos digitales...'`.
- **Fee** — not directly used on the marketing page; no violation.
- **Settings → Configuración** — N/A on marketing page.
- **Blockchain / Token / NFT** — not explicitly used as English terms
  on this page; glossary respected where keywords appear.
- **Brand names**: VerifiedX, vBTC, Butterfly, SwitchBlade, PulseXAI,
  Prism Privacy, Halborn, Merkle Science, Spyglass, Bitcoin, DeFi,
  GitHub, Discord, X — all untouched on both sides. Glossary
  compliant.

### 5. Tone + register — "tú" informal
**PASS.** Every imperative is `tú`-conjugated (not `usted` or
`vosotros`):
- `Usa`, `Envía`, `Genera`, `Conoce`, `Transfiere`, `Mueve`, `Sé`,
  `Construye`, `Desbloquea`
- Possessives: `tu dinero`, `tus activos`, `te preocupes` — consistent
  informal register
- **Zero occurrences of "usted" or "ustedes"**
- **Zero Spain-isms** (no "vosotros", "sois", "tío", "guay", "móvil",
  "ordenador"). Vocabulary is neutral LatAm throughout.

### 6. Diacritics correct
**PASS.** Spot-checked all common pitfalls:
- "dirección" — N/A on this page
- "transacción" — N/A
- "configuración" — N/A
- "comisión" — N/A
- **"información"** — not used directly; related forms OK
- **"política"** — ✓ `'Política de privacidad'`
- **"Documentación"** — ✓ nav label
- **"también", "según", "más"** — spot-checked, all present where
  needed
Zero missing acutes on target vocabulary.

### 7. No HTML tags inside translation values
**PASS.** `grep '<[a-zA-Z]' es.ts` returns nothing. HTML structure
lives in the `.astro` templates (spans wrap `t('cta_body_brand')`
etc.); translation strings are pure text. This is the correct pattern
and means translators cannot accidentally malform markup.

### 8. Length sanity (flag >50% longer than English)
**PASS WITH INFO.** Six keys exceed the 50% threshold, but all are
short-string labels where the threshold is dominated by base-length
noise. None are UI-overflow risks on a real viewport:

| key | EN len | ES len | delta | Notes |
|-----|--------|--------|-------|-------|
| `footer.foundation_about` | 5 ("About") | 9 ("Acerca de") | +80% | Short footer label; fits. |
| `footer.legal_privacy` | 14 ("Privacy Policy") | 22 ("Política de privacidad") | +57% | Standard; matches glossary expectation. |
| `home.capital_build_cta` | 14 ("Developer Docs") | 25 ("Docs para desarrolladores") | +79% | Documented compression target — see #10. |
| `home.security_heading_line2` | 14 ("Infrastructure") | 22 ("de nivel institucional") | +57% | Line-swap compression; see Findings INFO 1. |
| `home.security_smart_contracts` | 42 | 64 | +52% | Single bullet line; acceptable. |
| `home.security_audit_reports` | 13 ("Audit Reports") | 21 ("Informes de auditoría") | +62% | CTA button; fits. |

Absolute longest ES strings top out at 87 chars (`not_found.body`),
which is a body sentence and fits the layout comfortably.

### 9. Documented compressions
**PASS — all four read naturally and match intent.**

1. **Usuarios** (from `solutions_everyday: 'Everyday Users'`) — clean
   compression. "Usuarios cotidianos" would be verbose; "Usuarios"
   alone is the neutral LatAm marketing convention for consumer-tier
   navigation. ✓
2. **Docs para desarrolladores** (from `capital_build_cta: 'Developer
   Docs'`) — natural Spanish word order (N+adj); slightly longer than
   English but well under overflow risk. "Docs" is kept as the widely
   accepted abbreviation (glossary already keeps "Docs" as industry
   term). ✓
3. **Próximamente** (from `capital_private_cta: 'Activating Soon'`) —
   the literal "Activándose pronto" would be awkward; "Próximamente"
   is the standard LatAm product label for "coming soon" and matches
   the UI intent exactly. ✓
4. **Recuperación segura** (from `hero.description: 'recovery
   vaulting'`) — documented in `pending-terms.md` with reasoning
   ("Compressed from literal 'bóveda de recuperación'"). Reads
   naturally; the product sense is preserved (a recovery *mechanism*,
   not a physical vault). Flag that if the product team lands on a
   specific branded term later, this key should be updated.

### 10. Pending-terms crosscheck — translation matches declaration
**PASS.** Every exec-website pending-term declaration is used
consistently in `es.ts`:

| Pending term (declared) | Use count in es.ts |
|---|---|
| Sistema operativo financiero | 4 (meta_title, hero.heading_prefix, hero.tagline, footer.tagline) |
| Capital financiero programable | 2 (hero.tagline, footer.tagline) |
| Autocustodial (adj.) | 6 |
| Autocustodia (noun) | 1 (vbtc_body) |
| Recuperación segura | 1 (hero.description) |
| Economía de agentes | 1 (hero.description) |
| Agentes de IA | 1 (hero.terminal_ai) |
| Inteligencia tokenizada | 1 (apps_pulsexai_title) |
| Emitir (Mint) | 1 (vbtc_mint: 'Emitir vBTC') |
| Rendimiento | 2 (capital_yield_title, apps_butterfly_desc) |
| Minorista | 1 (vbtc_retail) |
| Mainnet probada en producción | 1 (trust.mainnet) |
| Colateralización | 1 (vbtc_body) |
| Ecosistema | 2 (partners.heading, cta_body_suffix) |
| Capa de privacidad | 1 (capital_private_desc) |
| Repositorio de código | 1 (hero.cta_code_repo) |
| Con la confianza de | 1 (partners.subheading) |
| Fundación | 1 (footer.section_foundation) |
| Gobernanza | 1 (trust.validators: 'Gobernanza por validadores') |

All consistent; no drift between what was declared and what was
shipped. The translator did their job cleanly.

---

## Findings

### INFO 1 — Line-swap in `security_heading_line1 / _line2` is a subtle structural choice
**EN:** `line1: "Institutional-Grade"`, `line2: "Infrastructure"`
**ES:** `line1: "Infraestructura"`, `line2: "de nivel institucional"`

This swaps the noun and modifier between the two lines to match
Spanish grammar (N+adj instead of adj+N). It reads correctly — but
it depends on the component rendering `{line1}\n{line2}` without
ever rendering `{line2}` on its own. I checked
`src/components/widgets/HomeContent.astro` is newly added; as long as
both lines always render together, this is fine. **Recommend a code
comment in `en.ts`** noting that these two keys are a grammatical
pair that must always render together.

### INFO 2 — `vbtc_body` translates "holders" as "poseedores"
Glossary does not list "holder" — the Spyglass pending-terms already
recorded `Top Holders → Principales holders` (kept English). This
translation uses `poseedores de Bitcoin` which is literary Spanish
but slightly formal. Not incorrect — just a stylistic inconsistency
with Spyglass. Either is fine for marketing copy; flagging because
a future consistency pass might prefer `holders` in both places or
`poseedores` in both.

### WARNING — `apps_butterfly_desc` slight semantic drift
**EN:** "Global payments and earning powered by the VerifiedX network."
**ES:** "Pagos globales y generación de rendimiento sobre la red
VerifiedX."

"Earning" is rendered as "generación de rendimiento" (yield generation),
which is more specific than the English — which is left deliberately
vague ("earning" could be yield, staking rewards, cashback, etc.). If
Butterfly only offers yield, this is fine and even clarifying. If
Butterfly offers broader earning mechanics, the Spanish pre-commits the
user to one interpretation. **Recommend**: product team confirm
Butterfly's earning surface is yield-only; otherwise swap to neutral
`"ganancias"` (earnings).

### INFO 3 — "Sé dueño de tu dinero" is strong but idiomatic
`capital_own_title: "Sé dueño de tu dinero"` is a literal rendering
of "Own Your Money" and is grammatically correct. A LatAm marketing
alternative like "Controla tu dinero" (Control your money) is
slightly warmer and reads more naturally in a capital-ownership
context. Not a FAIL — the current is defensible and preserves the
ownership nuance. Flagging for the human marketing-tone reviewer (the
plan mandates a human pass on Website marketing copy).

### INFO 4 — Aria labels
- `footer.aria_github: 'Github'` carries the same "Github" → should be
  "GitHub" issue flagged in the Phase 1A review. Not introduced by
  this phase but still present. Fix in a follow-up copy pass.
- `footer.aria_email: 'Correo'` (ES) vs `'Email'` (EN) — translator
  chose to localize the aria label. Either choice is defensible;
  "Correo" is standard Spanish but "Email" is also understood. Minor.

---

## Glossary-Promotion Recommendations

Per the lead's instruction (2+ repo use OR canonical domain vocab),
recommending the following Phase 2A entries for promotion into
`glossary-en-es.md`. The lead will edit; I do not.

### Strong promotes (clearly canonical, will be reused)
1. **Self-custodial → autocustodial** / **Self-custody → autocustodia**
   — Used 7 times on Website alone, will appear in GUI settings copy
   and SpyglassWebApp explanatory text. Single-word adjective form
   saves layout; canonical brand posture for VerifiedX.
2. **Mint (token) → Emitir** — Phase 2A declares it; Phase 2B
   pending-terms also declares `Mintable/Mint/Minted/Minter →
   Emitible/Emitir/Emitido/Emisor` independently. **2+ repo use
   threshold met.** Promote as canonical.
3. **Yield → Rendimiento** — Will appear in any product copy that
   discusses earning. Common domain term.
4. **Collateralization → Colateralización** — Core vBTC vocabulary;
   will appear in any institutional or technical copy about vBTC.
5. **Ecosystem → Ecosistema** — Pervasive marketing term.
6. **Mainnet → Mainnet** (kept English) + **Mainnet probada en
   producción** (compound phrase) — Mainnet-as-English is already
   implicit in the glossary's "industry term" rule but worth being
   explicit. The compound `Mainnet probada en producción` is a
   branded phrase and should be locked in.

### Watch but don't promote yet (single-use or marketing-specific)
- "Financial operating system" / "Capital financiero programable" /
  "Recuperación segura" — currently Website-only branding phrases.
  Promote if they reappear in GUI or Butterfly; otherwise keep
  repo-local.
- "Agentes de IA" / "Inteligencia tokenizada" — PulseXAI-specific;
  once PulseXAI ships in more surfaces, promote.
- "Gobernanza" / "Fundación" / "Minorista" — defensible single-use
  now; promote when they appear in a second repo.

---

## Files Reviewed
- `src/i18n/en.ts` (expanded to 169 lines; 127 leaf keys; schema of
  record)
- `src/i18n/es.ts` (175 lines; 127 leaf keys; pass on all validations)
- `/Users/m4mac/Development/verifiedx-i18n/pending-terms.md` (Phase 2A
  section; 18 entries; all consistent with usage)

## Not Reviewed (Out of Phase 2A Translation Scope)
- `src/components/**/*.astro` wiring refactors (scaffold/plumbing,
  not translation content)
- `src/components/widgets/HomeContent.astro` (new, but verified it
  exists to house the cta spans; structural wiring belongs to
  Phase 1A follow-up / Phase 4A)
- `src/navigation.ts` restructure (not translation content)
- Actual `/es/` page render (manual browser pass; belongs to Phase
  4A integration testing)
- Marketing tone subjective review (the plan mandates human
  marketing-copy review for Website; that reviewer should read this
  report's INFO 1–3 flags)

---

## Recommendation
**Proceed to Phase 3A (Review & QA).** The translation is
glossary-compliant, structurally complete, and internally consistent.
The warnings and INFO items are copy-polish matters for the
human marketing-tone pass, not blockers. Before Phase 3A starts:
- Lead should fold the 6 "Strong promotes" entries into
  `glossary-en-es.md` so the canonical glossary reflects Wave-1
  reality before Phase 2B/2C land their translations.
- Product team should confirm INFO 2 (butterfly "earning" scope) and
  INFO 1 (security_heading two-line render contract).
