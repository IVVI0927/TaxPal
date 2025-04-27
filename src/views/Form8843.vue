<template>
  <div class="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-md rounded-lg space-y-6">
    <h1 class="text-3xl font-extrabold text-center text-blue-700 mb-8">{{ $t('formTitle') }}</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('name') }}</label>
          <input v-model="form.name" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('passport') }}</label>
          <input v-model="form.passport" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <p v-if="errors.passport" class="text-red-500 text-xs mt-1">{{ errors.passport }}</p>
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('citizenship') }}</label>
          <input v-model="form.citizenship" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <p v-if="errors.citizenship" class="text-red-500 text-xs mt-1">{{ errors.citizenship }}</p>
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('usAddress') }}</label>
          <input v-model="form.usAddress" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <p v-if="errors.usAddress" class="text-red-500 text-xs mt-1">{{ errors.usAddress }}</p>
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('entryDate') }}</label>
          <input v-model="form.entryDate" type="date" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('visaType') }}</label>
          <input v-model="form.visaType" type="text" disabled class="w-full border border-gray-300 p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('sevis') }}</label>
          <input v-model="form.sevis" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <p v-if="errors.sevis" class="text-red-500 text-xs mt-1">{{ errors.sevis }}</p>
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('school') }}</label>
          <input v-model="form.school" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <p v-if="errors.school" class="text-red-500 text-xs mt-1">{{ errors.school }}</p>
        </div>
      </div>

      <div>
        <div class="space-y-1">
          <label class="block font-semibold">{{ $t('schoolAddress') }}</label>
          <input v-model="form.schoolAddress" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        </div>
      </div>

      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
        {{ $t('submit') }}
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const { t } = useI18n()

// 表单数据
const form = ref({
  name: '',
  passport: '',
  citizenship: '',
  usAddress: '',
  entryDate: '',
  visaType: 'F-1',
  sevis: '',
  school: '',
  schoolAddress: ''
})

// 表单错误对象
const errors = ref({
  name: '',
  passport: '',
  citizenship: '',
  usAddress: '',
  sevis: '',
  school: ''
})

// 校验函数
const validateForm = () => {
  let valid = true
  errors.value = {
    name: '',
    passport: '',
    citizenship: '',
    usAddress: '',
    sevis: '',
    school: ''
  }
  if (!form.value.name) {
    errors.value.name = t('errorName')
    valid = false
  }
  if (!form.value.passport) {
    errors.value.passport = t('errorPassport')
    valid = false
  }
  if (!form.value.citizenship) {
    errors.value.citizenship = t('errorCitizenship')
    valid = false
  }
  if (!form.value.usAddress) {
    errors.value.usAddress = t('errorUSAddress')
    valid = false
  }
  if (!form.value.sevis) {
    errors.value.sevis = t('errorSEVIS')
    valid = false
  }
  if (!form.value.school) {
    errors.value.school = t('errorSchool')
    valid = false
  }
  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  // 校验通过，生成 PDF！
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([612, 792])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  page.drawText('Form 8843 - Statement for Exempt Individuals', {
    x: 50,
    y: 750,
    size: 18,
    font,
    color: rgb(0, 0, 0.7)
  })

  const fields = [
    { label: t('name'), value: form.value.name },
    { label: t('passport'), value: form.value.passport },
    { label: t('citizenship'), value: form.value.citizenship },
    { label: t('usAddress'), value: form.value.usAddress },
    { label: t('entryDate'), value: form.value.entryDate },
    { label: t('visaType'), value: form.value.visaType },
    { label: t('sevis'), value: form.value.sevis },
    { label: t('school'), value: form.value.school },
    { label: t('schoolAddress'), value: form.value.schoolAddress }
  ]

  let startY = 700

  fields.forEach(({ label, value }) => {
    page.drawText(`${label}: ${value}`, {
      x: 50,
      y: startY,
      size: 12,
      font
    })
    startY -= 30
  })

  // 写入生成日期
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  page.drawText(`Date of PDF generation: ${formattedDate}`, {
    x: 50,
    y: startY - 20,
    size: 12,
    font
  })

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'form8843.pdf'
  link.click()
  URL.revokeObjectURL(url)

  // 清空表单
  form.value = {
    name: '',
    passport: '',
    citizenship: '',
    usAddress: '',
    entryDate: '',
    visaType: 'F-1',
    sevis: '',
    school: '',
    schoolAddress: ''
  }

  // 成功提示
  alert('✅ PDF生成成功！表单已重置。')
}
</script>