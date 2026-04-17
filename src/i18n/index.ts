import { en, type TranslationSchema } from './en';
import { es } from './es';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, TranslationSchema> = { en, es };

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/**
 * Detect the active locale from an Astro URL pathname.
 * `/es/...` → 'es', everything else → 'en'.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return isLocale(seg) ? seg : defaultLocale;
}

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K;
}[keyof T & string];

export type TranslationKey = NestedKeyOf<TranslationSchema>;

function lookup(dict: TranslationSchema, key: string): string {
  const parts = key.split('.');
  let node: unknown = dict;
  for (const part of parts) {
    if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof node === 'string' ? node : key;
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    name in vars ? String(vars[name]) : `{${name}}`
  );
}

/**
 * Returns a translator bound to `locale`. Falls back to English if the key
 * is missing in the target locale.
 *
 *   const t = useTranslations('es');
 *   t('nav.products');
 *   t('footer.copyright', { year: 2026 });
 */
export function useTranslations(locale: Locale | string | undefined) {
  const active: Locale = isLocale(locale) ? locale : defaultLocale;
  const dict = dictionaries[active];
  const fallback = dictionaries[defaultLocale];
  return (key: TranslationKey, vars?: Record<string, string | number>): string => {
    const primary = lookup(dict, key);
    const value = primary === key ? lookup(fallback, key) : primary;
    return interpolate(value, vars);
  };
}
