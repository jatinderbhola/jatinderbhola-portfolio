import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Language } from './config';
import { languages } from './config';
import { loadTranslations } from './utils';

// Get initial language from localStorage or browser, default to English
const getInitialLanguage = (): Language => {
  if (browser) {
    const saved = localStorage.getItem('language');
    if (saved && saved in languages) return saved as Language;
    
    const browserLang = navigator.language.split('-')[0];
    if (browserLang in languages) return browserLang as Language;
  }
  return 'en';
};

// Create the store
export const currentLanguage = writable<Language>(getInitialLanguage());

// Subscribe to changes
if (browser) {
  currentLanguage.subscribe(async (lang) => {
    try {
      // Save to localStorage
      localStorage.setItem('language', lang);
      
      // Update document attributes
      document.documentElement.lang = lang;
      document.documentElement.dir = languages[lang].direction;
      
      // Reload translations
      await loadTranslations(lang);
    } catch (e) {
      console.error('Failed to update language:', e);
    }
  });
} 