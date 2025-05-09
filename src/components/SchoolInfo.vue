<template>
  <div class="space-y-4">
    <h3 class="text-xl font-semibold text-gray-700 border-b pb-1">{{ $t('schoolInfo') }}</h3>
    <div>
      <div class="space-y-1">
        <label class="block font-semibold">{{ $t('sevis') }}</label>
        <input v-model="form.sevis" @input="validateField('sevis', form.sevis)" name="sevis" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <p v-if="errors.sevis" class="text-red-500 text-xs mt-1">{{ errors.sevis }}</p>
      </div>
    </div>
    <div>
      <div class="space-y-1">
        <label class="block font-semibold">{{ $t('school') }}</label>
        <input v-model="form.school" @input="validateField('school', form.school)" name="school" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <p v-if="errors.school" class="text-red-500 text-xs mt-1">{{ errors.school }}</p>
      </div>
    </div>
    <div>
      <div class="space-y-1">
        <label class="block font-semibold">{{ $t('schoolAddress') }}</label>
        <input v-model="form.schoolAddress" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    required: true
  },
  validateField: {
    type: Function,
    required: true
  }
})
</script> 