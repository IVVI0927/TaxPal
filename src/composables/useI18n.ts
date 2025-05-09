import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const LANGUAGE_KEY = 'taxpal_language'

export function useI18nWithPersistence() {
  const { locale, t } = useI18n()
  const currentLocale = ref(localStorage.getItem(LANGUAGE_KEY) || 'en')

  // 初始化时设置语言
  locale.value = currentLocale.value

  // 监听语言变化并持久化
  watch(currentLocale, (newLocale) => {
    locale.value = newLocale
    localStorage.setItem(LANGUAGE_KEY, newLocale)
  })

  const switchLanguage = (lang: string) => {
    currentLocale.value = lang
  }

  return {
    currentLocale,
    switchLanguage,
    t
  }
}