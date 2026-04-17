import type { TranslationSchema } from './en';
import { en } from './en';

/**
 * Spanish (es) — neutral Latin American.
 * Phase 1A scaffold: English pass-through placeholders only.
 * Phase 2A will replace every value with a glossary-compliant translation.
 * Keep keys identical to en.ts; preserve interpolation tokens ({year}) and HTML.
 */
export const es: TranslationSchema = {
  ...en,
  nav: { ...en.nav },
  footer: { ...en.footer },
  home: { ...en.home },
};
