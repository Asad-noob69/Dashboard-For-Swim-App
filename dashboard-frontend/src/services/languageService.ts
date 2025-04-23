import apiClient from './apiClient';
import { createContext } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
  isDefault?: boolean;
}

export interface Translation {
  [key: string]: string | Translation;
}

class LanguageService {
  private translations: {[lang: string]: Translation} = {};
  private currentLanguage: string = 'en';
  private availableLanguages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', isRTL: false, isDefault: true },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', isRTL: true },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRTL: true },
  ];
  
  constructor() {
    // Try to load language preference from localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      this.currentLanguage = savedLang;
    }
  }
  
  // Get list of available languages
  getAvailableLanguages(): Language[] {
    return this.availableLanguages;
  }
  
  // Get current language code
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
  
  // Get current language details
  getCurrentLanguageDetails(): Language | undefined {
    return this.availableLanguages.find(lang => lang.code === this.currentLanguage);
  }
  
  // Check if current language is RTL
  isCurrentLanguageRTL(): boolean {
    const lang = this.getCurrentLanguageDetails();
    return lang?.isRTL || false;
  }
  
  // Set current language
  async setLanguage(langCode: string): Promise<void> {
    // Validate if language is available
    const isValidLang = this.availableLanguages.some(lang => lang.code === langCode);
    
    if (!isValidLang) {
      throw new Error(`Language ${langCode} is not supported`);
    }
    
    // Load translations if not already loaded
    if (!this.translations[langCode]) {
      await this.loadTranslations(langCode);
    }
    
    // Set as current language
    this.currentLanguage = langCode;
    localStorage.setItem('preferredLanguage', langCode);
    
    // Update document direction for RTL support
    const isRTL = this.isCurrentLanguageRTL();
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
    
    // Dispatch event for components to update
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: langCode } }));
  }
  
  // Load translations from the server or local files
  private async loadTranslations(langCode: string): Promise<void> {
    try {
      // In a real app, this would fetch from the server
      // const response = await apiClient.get(`/translations/${langCode}`);
      // this.translations[langCode] = response.data;
      
      // For now, we'll use import() for demo purposes
      const translationModule = await import(`../locales/${langCode}.json`);
      this.translations[langCode] = translationModule.default;
    } catch (error) {
      console.error(`Failed to load translations for ${langCode}:`, error);
      // Fallback to empty translations
      this.translations[langCode] = {};
    }
  }
  
  // Get translation for a key
  translate(key: string, params?: { [key: string]: string | number }): string {
    // If translations for current language are not loaded yet, return the key
    if (!this.translations[this.currentLanguage]) {
      return key;
    }
    
    // Split the key by dots to navigate nested objects
    const keys = key.split('.');
    let result: any = this.translations[this.currentLanguage];
    
    // Navigate through the translations object
    for (const k of keys) {
      if (result[k] === undefined) {
        return key; // Key not found, return the original key
      }
      result = result[k];
    }
    
    // If result is not a string, return the key
    if (typeof result !== 'string') {
      return key;
    }
    
    // Replace parameters in the translation
    if (params) {
      return Object.entries(params).reduce((str, [param, value]) => {
        return str.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      }, result);
    }
    
    return result;
  }
  
  // Shorthand for translate
  t(key: string, params?: { [key: string]: string | number }): string {
    return this.translate(key, params);
  }
}

// Create a singleton instance
const languageService = new LanguageService();

// Create React context for language service
export const LanguageContext = createContext<{
  languageService: LanguageService;
  currentLanguage: string;
  setLanguage: (langCode: string) => Promise<void>;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}>({
  languageService,
  currentLanguage: languageService.getCurrentLanguage(),
  setLanguage: languageService.setLanguage.bind(languageService),
  t: languageService.t.bind(languageService),
});

export default languageService;