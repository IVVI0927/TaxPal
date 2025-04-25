<template>
  <div class="p-4">
    <button @click="switchLang('en')" class="mr-4 text-sm">🇺🇸 English</button>
    <button @click="switchLang('zh')" class="text-sm">🇨🇳 中文</button>
    <Form8843 />
  </div>
</template>

<script setup>
import Form8843 from './views/Form8843.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const switchLang = (lang) => {
  locale.value = lang
}
</script>