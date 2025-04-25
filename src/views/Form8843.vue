<template>
    <div class="max-w-xl mx-auto mt-10 space-y-6">
      <h1 class="text-2xl font-bold text-center text-blue-700">{{ $t('formTitle') }}</h1>
  
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block font-semibold">{{ $t('name') }}</label>
          <input v-model="form.name" type="text" class="w-full border p-2 rounded" />
        </div>
  
        <div>
          <label class="block font-semibold">{{ $t('sevis') }}</label>
          <input v-model="form.sevis" type="text" class="w-full border p-2 rounded" />
        </div>
  
        <div>
          <label class="block font-semibold">{{ $t('school') }}</label>
          <input v-model="form.school" type="text" class="w-full border p-2 rounded" />
        </div>
  
        <div>
          <label class="block font-semibold">{{ $t('entryDate') }}</label>
          <input v-model="form.entryDate" type="date" class="w-full border p-2 rounded" />
        </div>
  
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {{ $t('submit') }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const form = ref({
    name: '',
    sevis: '',
    school: '',
    entryDate: ''
  })
  
  const handleSubmit = () => {
    console.log('填写信息：', form.value)
    alert('接下来将生成 PDF 表格（功能开发中）')
  }
  </script>