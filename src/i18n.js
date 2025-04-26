import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

const i18n = createI18n({
  legacy: false,   // ✅ 重点！关闭 legacy 模式
  locale: 'zh',    // 默认语言
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

export default i18n