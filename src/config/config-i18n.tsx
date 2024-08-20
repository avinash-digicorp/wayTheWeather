import {initReactI18next} from 'react-i18next'
import i18n, {Namespace, TypeOptions} from 'i18next'
import en from '../locales/en.json'
import es from '../locales/es.json'

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: en
    },
    es: {
      translation: es
    }
  }
})

export type ItxType = Namespace

export default i18n
