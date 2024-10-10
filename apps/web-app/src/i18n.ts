import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './public/locales/en.json';
import heTranslation from './public/locales/he.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    he: {
      translation: heTranslation,
    },
  },
  lng: 'he',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
