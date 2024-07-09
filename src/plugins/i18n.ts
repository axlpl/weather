import { createI18n } from 'vue-i18n'
import en from '@/locale/en.json'
import pl from '@/locale/pl.json'

const messages = {
  en,
  pl
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
