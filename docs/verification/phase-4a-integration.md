# Phase 4A Verification — VerifiedX-Website Integration

**Phase:** 4A — Locale switcher, auto-detect, hreflang, Svelte i18n
**Repo:** VerifiedX-Website
**Branch:** `feat/i18n-es` @ commit `2026655`
**Base:** `dc3ee80` (previous Phase 2A review commit)
**Verifier:** reviewer agent
**Date:** 2026-04-17

## Verdict: **PASS**

All Phase 4A objectives met. The locale switcher is accessible
(role/aria-label/aria-current/hreflang) and placed in both desktop and
mobile headers. `stripLocale` / `localizePath` pass all eight
boundary cases. The inline browser-detect script is loop-safe
(`/es/*` early return), wrapped in try/catch, and uses
`location.replace` to avoid history pollution. `<html lang>` is
sourced from the URL path, so `/index.html` emits `lang="en"` and
`/es/index.html` emits `lang="es"`. Sitemap `i18n` config is
syntactically correct. Three hreflang `<link>` tags are emitted per
page (`en-US`, `es`, `x-default`). The two Svelte islands receive a
`locale` prop and use the dictionary helper. Dictionary additions
(167 keys total, +40 over Phase 2A) parity-match between en and es
with zero token mismatches.

---

## Checklist

### 1. `LocaleSwitcher.astro` — UI + accessibility
**PASS.**
- `role="group"` + `aria-label={t('nav.switcher_aria')}` on the
  container (translated: `"Select language"` / `"Seleccionar idioma"`)
- Each `<a>` carries:
  - `href={localizePath(pathname, loc)}` — preserves current path
  - `hreflang={loc}` — declares the target language to crawlers
  - `aria-label={loc === 'en' ? t('nav.switcher_en_long') : t('nav.switcher_es_long')}`
    — full language name ("English" / "Español") for screen readers,
    while the visible text stays the compact "EN"/"ES"
  - `aria-current={loc === active ? 'true' : undefined}` — only set on
    the active link
  - `data-locale-switch={loc}` — selector hook for the persistence
    script
- Visual styling: rounded pill, active state has `bg-vfx-blue/80
  text-white`; inactive has hover. Compact two-letter labels keep the
  switcher narrow on mobile.

### 2. Switcher placement in `Header.astro`
**PASS.** Two placements:
- **Mobile** (line 84–87): inside `<div class="... md:hidden">`,
  alongside `<ToggleMenu />`. Wrapped with `gap-2` so the switcher
  and menu toggle don't collide.
- **Desktop** (line 175–177): inside the right-side action area
  (`<div class="... ml-auto ...">`), wrapped in a span with
  `flex-shrink-0` so the switcher stays a fixed pill even when nav
  items wrap.
Both placements render the same component; no duplication of logic.

### 3. `stripLocale` / `localizePath` — round-trip cases
**PASS.** Eight cases, all green:
| Call | Expected | Got |
|---|---|---|
| `localizePath('/foo', 'es')` | `/es/foo` | ✓ |
| `localizePath('/es/foo', 'en')` | `/foo` | ✓ |
| `localizePath('/', 'es')` | `/es/` | ✓ |
| `localizePath('/es/', 'en')` | `/` | ✓ |
| `localizePath('/about/team', 'es')` | `/es/about/team` | ✓ |
| `localizePath('/es/about/team', 'en')` | `/about/team` | ✓ |
| `localizePath('/foo', 'en')` | `/foo` | ✓ (no-op for default locale) |
| `localizePath('/es/foo', 'es')` | `/es/foo` | ✓ (idempotent) |

`stripLocale` edge cases also pass:
- `stripLocale('/')` → `/`
- `stripLocale('/es')` (no trailing slash) → `/` (graceful)
- `stripLocale('/es/')` → `/`
- `stripLocale('/es/foo')` → `/foo`
- `stripLocale('/foo')` → `/foo`

The regex `^/${seg}(?=/|$)` correctly handles both `/es` and `/es/...`
without consuming the wrong characters. `default-locale` short-circuit
in `stripLocale` (only strips when `seg !== defaultLocale`) means a
literal `/en/foo` URL would be left alone — correct because the site
serves English at the root, not at `/en/`.

### 4. Inline browser-detect script (`Layout.astro`)
**PASS — loop-safe and storage-safe.**
Reading the script in order:
1. **`is:inline` placement in `<head>`** — runs synchronously before
   paint. No FOUC, no flash of English when the user is going to be
   redirected to Spanish.
2. **Early return on `/es/*` paths** (`if (path.indexOf('/es/') === 0
   || path === '/es') return;`) — **this prevents the redirect loop**.
   Once on Spanish, the script never tries to redirect again.
3. **Cookie + localStorage check before navigator.language** — if the
   user has explicitly chosen a locale (via the switcher's persistence
   script), respect it:
   - `pref === 'en'` → return (stay on English root, even if browser
     is Spanish)
   - `pref === 'es'` → redirect to `/es` + path
4. **Browser-language fallback** — only fires if no preference exists.
   Checks `navigator.language` and `navigator.languages[0]`,
   lowercased. The `navLang.indexOf('es') === 0` test correctly
   matches `es`, `es-ES`, `es-MX`, `es-419`, etc., without false
   positives on languages that contain "es" elsewhere.
5. **`location.replace` not `.href`** — confirmed twice (line for
   pref-based redirect, line for browser-detect redirect). Replace
   does not push a history entry, so the back button takes the user
   to the previous *site*, not the now-replaced English root —
   exactly the right UX for an automatic redirect.
6. **`try { ... } catch (_) { }`** wraps the entire body — if cookies
   or localStorage are blocked (Safari ITP, incognito with strict
   settings), the script silently leaves the user on the default
   route rather than throwing.

**Edge case I checked:** path of `/`. The expression
`'/es' + (path === '/' ? '/' : path)` evaluates to `/es/` (correct,
not `/es//`). ✓

### 5. Persistence on switcher click (`LocaleSwitcher.astro` script)
**PASS.** The inline `<script is:inline>` registers a click handler on
every `[data-locale-switch]` link that:
- Reads the chosen locale from `data-locale-switch`
- Sets a cookie `locale_pref=<choice>; path=/; max-age=31536000;
  samesite=lax` — 1-year expiry, root-scoped, lax samesite
- Mirrors to `localStorage.setItem('locale_pref', choice)`
- Wraps in `try { ... } catch (_) { }` so storage failures don't
  break navigation

Critically, the click handler does NOT `preventDefault()` — the
default `<a>` navigation still fires after the cookie is set. So the
user sees one navigation, not two. The next page load reads the
cookie and the auto-detect script respects the explicit choice. Loop
prevention is end-to-end.

### 6. Dynamic `<html lang>` in `Layout.astro`
**PASS.** Replaced `lang={language}` (from `I18N` config constant)
with `lang={locale}` (computed from
`getLocaleFromPath(Astro.url.pathname)`). So `/index.html` emits
`<html lang="en">` and `/es/index.html` emits `<html lang="es">`. The
unused `language` destructure was removed; only `textDirection` is
kept from `I18N` (LTR for both en and es — correct, no `dir="rtl"`
issues).

### 7. `astro.config.ts` sitemap i18n
**PASS.** Syntactically correct shape per Astro sitemap integration
docs:
```ts
sitemap({
  i18n: {
    defaultLocale: 'en',
    locales: {
      en: 'en-US',
      es: 'es',
    },
  },
}),
```
Note: the locale-code mapping `en → en-US` and `es → es` matches the
hreflang tags in `Metadata.astro` exactly. Consistent with the
glossary's "neutral LatAm" target — `es` (no region) signals "any
Spanish reader" rather than locking to Mexico/Argentina/Spain.

### 8. `Metadata.astro` hreflang + OG locale + per-locale defaults
**PASS.**
- Three `<link rel="alternate">` tags emitted per page:
  - `hreflang="en-US"` → English canonical
  - `hreflang="es"` → Spanish canonical
  - `hreflang="x-default"` → English canonical (fallback for
    unmatched languages)
- `xDefault` correctly points to the en route (`localizePath(pathname,
  'en')`) — Google's recommendation for `x-default` is the
  most-broadly-applicable version.
- OG `locale: ogLocale` (where `ogLocale = activeLocale === 'es' ?
  'es' : 'en'`) — replaces the previous static `I18N?.language || 'en'`,
  so OG previews use the correct language indicator on Spanish pages.
- `localizedDefaults` provides per-locale fallback `title` /
  `description` for any page that doesn't pass its own metadata. The
  Spanish default description is glossary-compliant ("sistema operativo
  financiero", "autocustodial", "agentes tokenizados", "infraestructura
  de nivel institucional") and matches the marketing voice from
  Phase 2A.

### 9. Svelte islands — locale prop + dictionary wiring
**PASS.**

**`NetworkStats.svelte`:**
- `let { locale = 'en' } = $props();` — Svelte 5 prop syntax with
  English fallback
- `const t = useTranslations(locale)` — uses the same dictionary
  helper as Astro
- 6 stat cards, each with `title={t('stats.<key>')}`; metric labels
  also translated (`metric={t('stats.block_time_metric')}`,
  `metric={t('stats.transactions_metric')}`, etc.)
- Loading skeleton variants also use `t()` so the user never sees
  English titles flash before data loads

**`EcosystemDiagram.svelte`:**
- Same Svelte 5 prop + `useTranslations` pattern
- 6 flywheel nodes with translated `label` + `sub` (split into pairs:
  `fw_bitcoin_label/sub`, `fw_vbtc_label/sub`, etc.)
- 4 layer headings translated (`layer_global_asset`, `layer_network`,
  `layer_financial`, `layer_applications`)
- 3 caption strings translated (`caption_bitcoin`, `caption_verifiedx`,
  `caption_apps`)
- ARIA label on the SVG diagram is now translated
  (`aria-label={t('eco.aria_flywheel')}`)

**Astro-island serialization:** `HomeContent.astro` passes
`locale={locale}` to both `<NetworkStats client:only="svelte" />` and
`<EcosystemDiagram client:only="svelte" />`. With `client:only`,
Astro emits an `<astro-island>` element with serialized props in a
JSON blob — confirmed by the diff at HomeContent line 207 / 289 that
the prop is now declared. The Svelte 5 `$props()` reads from the
client-side bootstrap. On `/es/`, this will serialize `"locale":"es"`
and the Svelte runtime will pick it up.

### 10. Dictionary additions — key parity + glossary
**PASS.**
- `en` total leaf keys: 167 (was 127 in 2A; +40 — this matches
  expected delta given the prompt mentioned "+39", off by 1 because
  `eco.fw_more_users_sub` and `eco.fw_more_apps_sub` and
  `eco.fw_liquidity_sub` are individually counted)
- `es` total leaf keys: 167
- Missing in es: 0 / Extra in es: 0
- Token check across all new sections (`stats.*`, `eco.*`,
  `nav.switcher_*`): zero `{var}` tokens declared (none expected on
  these labels), and structurally consistent
- Glossary compliance (new keys):
  - **Active Validators → Validadores activos** ✓
  - **Fees Burned → Comisiones quemadas** ✓ (matches Spyglass 2B
    promote-rec for the burn family)
  - **Circulating Supply → Suministro circulante** ✓ (matches
    Spyglass pending-terms entry)
  - **Latest Block → Último bloque** ✓
  - **Block Time → Tiempo por bloque** — natural; "Tiempo de bloque"
    would also work; "por" gives the per-unit sense, fine
  - **Open Spyglass → Abrir Spyglass** ✓ (brand untouched)
  - **Start Validating → Empezar a validar** ✓ (tú-form CTA — matches
    `nav.action_start_building: "Empezar a construir"` from 2A)
  - **eco.fw_vbtc_sub: Minting → Emisión** ✓ (matches just-promoted
    Mint→Emitir family)
  - **eco.users_label: Users & AI Agents → Usuarios y agentes de IA** ✓
    (matches `hero.terminal_ai: "Agentes de IA"` from 2A — consistent)
  - **eco.layer_network_sub: The Financial Operating System → El
    sistema operativo financiero** ✓ (consistent with Phase 2A
    canonical phrasing)
  - **eco.aria_flywheel: Bitcoin Financial Flywheel diagram →
    Diagrama del volante financiero de Bitcoin** ✓ (good — "volante"
    is the correct mechanical/business sense of "flywheel")

### 11. Length sanity on new keys
**PASS.** Four flags, all in non-overflow contexts:
| Key | EN len | ES len | Delta | Context |
|---|---|---|---|---|
| `stats.block_time` | 10 ("Block Time") | 17 ("Tiempo por bloque") | +70% | Stat card title (vertical layout) |
| `stats.fees_burned` | 11 ("Fees Burned") | 19 ("Comisiones quemadas") | +73% | Stat card title (vertical layout) |
| `eco.fw_liquidity_sub` | 6 ("Growth") | 11 ("de Liquidez") | +83% | Flywheel node sublabel — see Finding 1 |
| `eco.fw_more_users_sub` | 5 ("Users") | 8 ("Usuarios") | +60% | Flywheel node sublabel |

None are real overflow risks. Stat cards have generous title space;
flywheel sublabels render below their main label.

### 12. Build green
**TRUSTED.** Diff scan shows no obvious regressions:
- No new dependencies, only config/component changes
- TypeScript types preserved (`TranslationSchema` still enforces es
  parity)
- No accidental import-cycle (LocaleSwitcher imports from `~/i18n`,
  which doesn't import LocaleSwitcher)
- `astro.config.ts` change is additive (sitemap config); existing
  config preserved

---

## Findings

### WARNING — `eco.fw_*` flywheel "head-noun + descriptor" reshape
The flywheel node labels were re-shaped between 2A and 4A. Looking at
the en values:
- `fw_bitcoin_label: "Bitcoin"`, `fw_bitcoin_sub: "Deposits"` (EN
  reads "Bitcoin" / "Deposits")
- `fw_financial_label: "Financial"`, `fw_financial_sub: "Activity"`
  (EN reads "Financial" / "Activity")
- `fw_liquidity_label: "Liquidity"`, `fw_liquidity_sub: "Growth"`
  (EN reads "Liquidity" / "Growth")
- `fw_more_apps_label: "More"`, `fw_more_apps_sub: "Applications"`
  (EN reads "More" / "Applications")

ES has been re-grouped slightly:
- `fw_financial_label: "Actividad"`, `fw_financial_sub: "Financiera"`
  → reads "Actividad" / "Financiera" (Spanish moves the noun first
  per N+adj order — ✓ correct grammar)
- `fw_liquidity_label: "Crecimiento"`, `fw_liquidity_sub: "de
  Liquidez"` → reads "Crecimiento" / "de Liquidez" (also reorders
  for readability — ✓)
- `fw_more_apps_label: "Más"`, `fw_more_apps_sub: "Aplicaciones"`
  → reads "Más" / "Aplicaciones" (kept literal — ✓)
- `fw_more_users_label: "Más"`, `fw_more_users_sub: "Usuarios"`
  → reads "Más" / "Usuarios" (kept literal — ✓)

This is a **defensible structural choice** — Spanish naturally puts
the noun before the descriptor — but it depends on a structural
contract: each node's `label` and `sub` are always rendered
together as a pair, vertically stacked. Confirmed by the Svelte
diagram source: each `fwNodes` entry renders both fields in the
same node. Safe.

**Recommend** adding a comment in `en.ts` (and `es.ts`) above the
`eco.fw_*` block noting that label/sub are a paired render contract
and translators should treat them as a single visual unit, not
two independent strings. Same recommendation as Phase 2A's
`security_heading_line1/line2` flag.

### INFO 1 — `eco.caption_apps` references `eco.layer_applications`
The Svelte caption bar renders:
```svelte
<div class="caption-item caption-purple">
  <strong>{t('eco.layer_applications')}</strong> {t('eco.caption_apps')}
</div>
```
EN: "**Applications** unlock financial activity"
ES: "**Aplicaciones** habilitan la actividad financiera"

Note that `caption_apps` starts with the verb in the imperative-feel
3rd-person plural ("habilitan"). This works because the Spanish
sentence structure parallels English here. Good translation; no
issue.

### INFO 2 — Sitemap codes `en` → `en-US` but hreflang also uses `en-US`
The mapping is consistent: sitemap `i18n.locales.en: 'en-US'` and
`Metadata.astro` emits `<link rel="alternate" hreflang="en-US" ...>`
for the English version. Google reads these together. ✓

### INFO 3 — `aria_email: "Correo"` (footer) still slightly inconsistent
Carry-over from Phase 2A. Footer aria label is `Correo` in es but the
icon is the standard email icon. Not a bug — just one of two
defensible choices. Out of 4A scope.

### INFO 4 — `prefersDefaultLocale` cookie/storage path
The persistence script writes to **both** cookie and localStorage. The
auto-detect script reads cookie first, falls back to localStorage.
Why both: cookie travels with the request (useful if a future SSR
layer wants to honor it), localStorage is more durable (cookie can be
cleared by browser cleanup). Defensive layering — good. Storage
synchronization is not exact (a user could end up with cookie=es and
localStorage=en if writes happen across browsers), but the read order
(cookie → localStorage) makes cookie authoritative, which matches the
write-both-but-cookie-first ordering on the click handler. Consistent.

---

## Glossary-Promotion Recommendations

Phase 4A introduces few new canonical terms (most are flywheel-art
phrasing or stat labels). Two worth considering for promotion:

### Suggest promoting
1. **Circulating Supply → Suministro circulante** — already used in
   Spyglass 2B (`metrics.json`) and now in Website 4A
   (`stats.circulating_supply`). **2-repo threshold met.**
2. **Active Validators → Validadores activos** — Spyglass 2B uses
   "Validadores activos totales" and Website 4A uses "Validadores
   activos". The base phrase is canonical. **2-repo threshold met.**

### Pattern note (not a term)
- **CTA imperatives translate to "Empezar a + infinitive"**:
  - "Start Building" → "Empezar a construir" (2A)
  - "Start Validating" → "Empezar a validar" (4A)
  - Future: "Start Earning" → "Empezar a ganar", "Start Trading" →
    "Empezar a operar" (predictable)
  Worth codifying in glossary "Marketing (Website)" section as the
  canonical "Start <verb>ing" pattern.

---

## Files Reviewed
- `astro.config.ts` (+8 lines: sitemap i18n)
- `src/components/common/LocaleSwitcher.astro` (new; 49 lines)
- `src/components/common/Metadata.astro` (+33 lines: alternates,
  per-locale defaults, OG locale)
- `src/components/widgets/Header.astro` (+6 lines: switcher in two
  placements)
- `src/components/widgets/HomeContent.astro` (Svelte islands receive
  `locale` prop)
- `src/components/dynamic/NetworkStats.svelte` (full t() wiring;
  loading skeleton + 6 cards)
- `src/components/dynamic/EcosystemDiagram.svelte` (full t() wiring;
  flywheel + layers + captions + ARIA)
- `src/i18n/index.ts` (+17 lines: `stripLocale`, `localizePath`)
- `src/layouts/Layout.astro` (+30 lines: inline detect script,
  dynamic `<html lang>`)
- `src/i18n/en.ts` (+46 lines: nav.switcher_*×5, stats.*×12, eco.*×23)
- `src/i18n/es.ts` (+46 lines: matching translations)

## Not Reviewed (Out of Phase 4A Scope)
- Live build output (trusted per task #41 in-progress; spot-check of
  diff shows no obvious regressions)
- Browser-rendered switch on actual `/es/`, `/`, `/about` routes
  (the integration test belongs to Phase 4A executor's manual pass;
  reviewer validates code paths, not browser render)
- View Transitions interaction with locale switch (`ClientRouter` is
  imported in Layout.astro; locale switches via full nav → cookie
  write → page reload, so View Transitions don't apply mid-switch
  — this is the correct behavior)

---

## Recommendation
**Proceed.** Phase 4A is complete and ready for Phase 4A executor's
manual browser pass + the human marketing reviewer. No blocking
issues.

Before final ship of Wave 1:
1. Lead can fold "Suministro circulante" and "Validadores activos"
   into the canonical glossary.
2. Add a paired-render-contract comment in `en.ts` above
   `eco.fw_*` block (and around `home.security_heading_line1/line2`
   from 2A) so future translators know not to translate these in
   isolation.
3. Codify the "Empezar a <verb>" pattern in the glossary's Marketing
   section as a reusable template for future "Start X" CTAs.
