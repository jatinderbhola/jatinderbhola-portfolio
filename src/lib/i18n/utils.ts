import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import { currentLanguage } from './store';
import type { Language } from './config';

// Create a store for translations to make them reactive
export const translationsStore = writable<Record<Language, any>>({
  en: {},
  zh: {},
  hi: {},
  fr: {},
  es: {}
});

// Flag to track if translations are initialized
let isInitialized = false;

export async function loadTranslations(lang: Language) {
  try {
    const module = await import(`./translations/${lang}.json`);
    translationsStore.update(store => ({
      ...store,
      [lang]: module.default
    }));
    console.log(`Loaded translations for ${lang}:`, module.default);
  } catch (e) {
    console.error(`Failed to load translations for ${lang}:`, e);
  }
}

export function t(key: string, params: Record<string, string> = {}): string {
  const lang = get(currentLanguage);
  const translations = get(translationsStore);
  
  // If translations aren't loaded yet, return the key
  if (!translations[lang] || Object.keys(translations[lang]).length === 0) {
    console.warn(`Translations not loaded for ${lang}, returning key: ${key}`);
    return key;
  }

  const keys = key.split('.');
  let value = translations[lang];

  for (const k of keys) {
    if (!value || typeof value !== 'object') {
      console.warn(`Translation key "${key}" not found for language "${lang}"`);
      return key;
    }
    value = value[k];
  }

  if (typeof value !== 'string') {
    console.warn(`Translation key "${key}" not found for language "${lang}"`);
    return key;
  }

  return value.replace(/\{(\w+)\}/g, (_, key) => params[key] || `{${key}}`);
}

// Load translations for all languages
export async function initializeTranslations() {
  if (isInitialized) {
    console.log('Translations already initialized');
    return;
  }

  console.log('Initializing translations...');
  try {
    await Promise.all([
      loadTranslations('en'),
      loadTranslations('zh'),
      loadTranslations('hi'),
      loadTranslations('fr'),
      loadTranslations('es')
    ]);
    isInitialized = true;
    console.log('Translations initialized successfully');
  } catch (e) {
    console.error('Failed to initialize translations:', e);
  }
}

export function formatDate(date: string | Date, format: 'short' | 'long' = 'long'): string {
  const d = new Date(date);
  const lang = get(currentLanguage) as Language;
  
  return d.toLocaleDateString(lang, {
    year: 'numeric',
    month: format === 'long' ? 'long' : 'short',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  const lang = get(currentLanguage) as Language;
  return new Intl.NumberFormat(lang).format(num);
} 