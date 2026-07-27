# Phase 1A Verification — VerifiedX-Website i18n Framework

**Phase:** 1A — Astro i18n framework setup
**Repo:** VerifiedX-Website
**Branch:** `feat/i18n-es` @ commit `05089f6`
**Base:** `main`
**Verifier:** reviewer agent
**Date:** 2026-04-17

## Verdict: **PASS WITH WARNINGS**

The framework is correctly scaffolded, the `/es/` route is reachable, the
translation pipeline is wired end-to-end through the Footer POC, and the
Spanish dictionary is a true English pass-through — meaning Phase 2A has a
clean schema to translate against with no premature translation drift to
undo. One minor call-site regression in `Footer.astro` is worth a fix
before Phase 2A lands.

---

## Checklist

### 1. Astro i18n enabled (`astro.config.ts`)
**PASS.** Config matches the plan's Phase 1A spec exactly:
- `defaultLocale: 'en'`
- `locales: ['en', 'es']`
- `routing.prefixDefaultLocale: false` (English stays at root, Spanish lives under `/es/`)

### 2. `/es/` route reachable
**PASS.** `src/pages/es/index.astro` exists and renders a
Layout-wrapped scaffold page that is honest about its status ("Phase 1A
scaffold. Body translation lands in Phase 2A."). Good: it doesn't pretend
to be translated, so Phase 2A reviewers won't miss copy that was never
actually translated.

### 3. Translation file structure
**PASS.** Structure is sensible and type-safe:
- `src/i18n/en.ts` — canonical dictionary, exports `TranslationSchema` type
- `src/i18n/es.ts` — pass-through (`{...en, nav: {...en.nav}, ...}`) typed as
  `TranslationSchema` so TypeScript will enforce full key coverage in
  Phase 2A
- `src/i18n/index.ts` — exposes `getLocaleFromPath`, `useTranslations`,
  `locales`, `defaultLocale`, `Locale` type

The type-driven coverage is a strong choice: it is structurally impossible
for Phase 2A to ship with a missing Spanish key without a compile error.

### 4. POC component wired (`Footer.astro`)
**PASS.** Correctly:
- Imports `getLocaleFromPath, useTranslations` from `~/i18n`
- Derives `locale` from `Astro.url.pathname`
- Binds `t = useTranslations(locale)`
- Replaces 4 previously-hardcoded English strings (`tagline`,
  `legal_disclaimer`, `legal_terms`, `legal_privacy`) with `t()` calls
- Preserves the `{year}` interpolation in `footer.copyright` via
  `t('footer.copyright', { year: new Date().getFullYear() })`

### 5. es.ts is pass-through (no premature translation)
**PASS.** `src/i18n/es.ts` is literally:
```ts
export const es: TranslationSchema = {
  ...en,
  nav: { ...en.nav },
  footer: { ...en.footer },
  home: { ...en.home },
};
```
No Spanish values — exactly as specified. Phase 2A has a 100% untouched
canvas.

### 6. Interpolation preservation
**PASS.** Reviewed `en.ts`:
- Only interpolation token in the dictionary: `{year}` in
  `footer.copyright`.
- `src/i18n/index.ts:interpolate()` uses `/\{(\w+)\}/g` — correctly
  handles the `{year}` format and falls back to the literal placeholder
  if a var is missing. No double-brace or HTML-tag patterns in this
  phase's strings, so nothing else to validate yet.
- Glossary note: when Phase 2A translates `footer.copyright`, the
  `{year}` token MUST be preserved (Spanish translation should still
  contain `{year}`).

### 7. Build still works
**PASS (trusted).** Per the plan I am trusting the executor's build
report unless the diff is suspicious. Nothing in the diff suggests a
build break: the new files are pure TypeScript modules with no runtime
imports that don't exist, and `astro.config.ts` accepts the `i18n` key
natively on Astro 5.

### 8. Brand names untouched
**PASS.** "VerifiedX", "vBTC", "Bitcoin", "Butterfly", "SwitchBlade",
"PulseXAI", "Prism", "Spyglass", "Halborn", "Merkle Science", "GitHub"
all appear untranslated in `en.ts` (and therefore also in `es.ts` via
pass-through). Matches the glossary's "Brand names: Never translate" rule.

### 9. Spain-specific constructs
**N/A this phase.** No Spanish prose exists yet — `es.ts` is English
pass-through. Will be a Phase 2A check.

### 10. Length sanity
**N/A this phase.** Same reason as #9 — no Spanish strings to measure.

---

## Findings

### WARNING 1 — `footNote` prop is now silently ignored
`src/components/widgets/Footer.astro` previously accepted `footNote`
from `Astro.props` with a default of `''`. The refactor removes
`footNote` from the destructure and computes it locally from
`t('footer.copyright', { year })`. This means any existing caller that
was passing a `footNote` prop will now have that value silently dropped.

- **Risk:** low — a quick grep suggests `footNote` is used internally
  only.
- **Recommendation:** Phase 2A should either (a) remove `footNote` from
  `Props` type entirely if no longer supported, or (b) fall back to the
  prop when present. Right now `Props.footNote?` is still typed but
  unused, which will confuse readers.

### WARNING 2 — Interpolation pattern vs. design-doc inconsistency
The glossary lists `{name}`, `{{count}}`, ARB `{count, plural, ...}` as
interpolation formats the reviewer must preserve. This Astro
implementation supports only the single-brace `{name}` form via
`interpolate()` — no double-brace, no ICU plural. That is fine for this
codebase (Astro doesn't need ICU for marketing copy), but Phase 2A
translators MUST be told: this repo uses single-brace `{var}` only.
Consider adding a short `src/i18n/README.md` documenting the token
format so translator agents don't accidentally write `{{year}}`.

### INFO — Schema-typed dictionary is a strong guarantee
`es: TranslationSchema` enforcement will catch any missing keys at
compile time during Phase 2A. Recommend keeping this pattern and
replicating it to Website's future locales (fr/it/de). This is better
than runtime key-check CI.

---

## Files Reviewed
- `astro.config.ts` (+8 lines)
- `src/components/widgets/Footer.astro` (refactor; interpolation OK)
- `src/i18n/en.ts` (new; 116 lines; canonical schema)
- `src/i18n/es.ts` (new; 15 lines; pass-through)
- `src/i18n/index.ts` (new; 66 lines; runtime + helpers)
- `src/pages/es/index.astro` (new; 26 lines; scaffold page)

## Not Reviewed (Out of Phase 1A Scope)
- `package-lock.json` churn (trusted)
- Build artifact verification (trusted per executor's report)
- Marketing copy quality in `en.ts` (copy-review belongs to stakeholders)

---

## Recommendation
Proceed to Phase 2A. Address WARNING 1 (stale `footNote` prop) as the
first cleanup during Phase 2A, and add a short translator note (WARNING
2) documenting the single-brace interpolation convention before
translation begins.
