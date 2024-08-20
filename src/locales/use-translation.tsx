import i18n from 'i18next'
import 'config/config-i18n'

export const setLocale = (locale: string) => {
  i18n.changeLanguage(locale)
}

export default (title: string, options = {}) => {
  return i18n.t(title, {...options})
}
