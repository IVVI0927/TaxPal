<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 py-12 px-4">
    <div v-if="showSuccess" class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-center transition">
      ✅ PDF生成成功！表单已重置。
    </div>
    <div class="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-md rounded-lg space-y-6">
      <div class="text-center flex flex-col items-center space-y-2">
        <img src="/taxpal-logo.png" alt="TaxPal Logo" class="w-16 h-16 animate-bounce" />
        <h1 class="text-4xl font-extrabold text-blue-700">TaxPal 留学生报税助手</h1>
        <p class="text-gray-600 text-lg">快速填写 Form 8843，生成官方报税文件</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <PersonalInfo :form="form" :errors="errors" :validateField="validateField" />
        <SchoolInfo :form="form" :errors="errors" :validateField="validateField" />
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition" :disabled="isLoading">
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ $t('generating') }}
          </span>
          <span v-else>{{ $t('submit') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import PersonalInfo from '../components/PersonalInfo.vue'
import SchoolInfo from '../components/SchoolInfo.vue'
import { useFormValidation } from '../composables/useFormValidation'

const { t } = useI18n()
const { errors, validateForm, validateField, focusFirstError } = useFormValidation()

// 表单数据
const form = ref({
  name: '',
  passport: '',
  citizenship: '',
  usAddress: '',
  entryDate: '',
  visaType: 'F-1',
  sevis: '',
  school: 'University of California, Irvine',
  schoolAddress: '501 Aldrich Hall, Irvine, CA 92697-4975'
})

const showSuccess = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!validateForm(form.value)) {
    focusFirstError()
    return
  }
  isLoading.value = true
  // PDF 生成逻辑
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  page.drawText('Form 8843', { x: 50, y: height - 50, size: 20, font, color: rgb(0, 0, 0) })
  page.drawText(`Name: ${form.value.name}`, { x: 50, y: height - 100, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`Passport: ${form.value.passport}`, { x: 50, y: height - 120, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`Citizenship: ${form.value.citizenship}`, { x: 50, y: height - 140, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`US Address: ${form.value.usAddress}`, { x: 50, y: height - 160, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`Entry Date: ${form.value.entryDate}`, { x: 50, y: height - 180, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`Visa Type: ${form.value.visaType}`, { x: 50, y: height - 200, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`SEVIS: ${form.value.sevis}`, { x: 50, y: height - 220, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`School: ${form.value.school}`, { x: 50, y: height - 240, size: 12, font, color: rgb(0, 0, 0) })
  page.drawText(`School Address: ${form.value.schoolAddress}`, { x: 50, y: height - 260, size: 12, font, color: rgb(0, 0, 0) })
  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'form8843.pdf'
  a.click()
  URL.revokeObjectURL(url)
  showSuccess.value = true
  isLoading.value = false
  setTimeout(() => {
    showSuccess.value = false
    form.value = {
      name: '',
      passport: '',
      citizenship: '',
      usAddress: '',
      entryDate: '',
      visaType: 'F-1',
      sevis: '',
      school: 'University of California, Irvine',
      schoolAddress: '501 Aldrich Hall, Irvine, CA 92697-4975'
    }
  }, 3000)
}
</script>

<style scoped>
@media (max-width: 640px) {
  .max-w-2xl {
    margin-top: 0;
    padding: 1rem;
  }
  .text-4xl {
    font-size: 1.5rem;
  }
  .text-lg {
    font-size: 1rem;
  }
}
</style>