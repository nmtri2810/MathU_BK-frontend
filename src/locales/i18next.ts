import i18n from 'i18next';
import global_en from '@/locales/en/global.json';
import global_vi from '@/locales/vi/global.json';
import { AppLanguages, I18nNamespaces } from '@/constants';

i18n.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('language') || AppLanguages.VIETNAMESE,
  resources: {
    en: {
      global: global_en
    },
    vi: {
      global: global_vi
    }
  },
  ns: [I18nNamespaces.GLOBAL],
  defaultNS: I18nNamespaces.GLOBAL
});

export default i18n;
