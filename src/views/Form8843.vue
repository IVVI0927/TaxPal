<template>
  <div class="max-w-2xl mx-auto mt-10 space-y-6">
    <h1 class="text-2xl font-bold text-center text-blue-700">{{ $t('formTitle') }}</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">

      <div>
        <label class="block font-semibold">{{ $t('name') }}</label>
        <input v-model="form.name" type="text" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block font-semibold">{{ $t('passport') }}</label>
        <input v-model="form.passport" type="text" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block font-semibold">{{ $t('citizenship') }}</label>
        <input v-model="form.citizenship" type="text" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block font-semibold">{{ $t('usAddress') }}</label>
        <input v-model="form.usAddress" type="text" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block font-semibold">{{ $t('entryDate') }}</label>
        <input v-model="form.entryDate" type="date" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block font-semibold">{{ $t('visaType') }}</label>
        <input v-model="form.visaType" type="text" disabled class="w-full border p-2 rounded bg-gray-100" />
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
        <label class="block font-semibold">{{ $t('schoolAddress') }}</label>
        <input v-model="form.schoolAddress" type="text" class="w-full border p-2 rounded" />
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
  passport: '',
  citizenship: '',
  usAddress: '',
  entryDate: '',
  visaType: 'F-1',   // 固定是F-1
  sevis: '',
  school: '',
  schoolAddress: ''
})

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const handleSubmit = async () => {
  // 表单校验
  if (!form.value.name) {
    alert('请填写姓名！')
    return
  }
  if (!form.value.passport) {
    alert('请填写护照号码！')
    return
  }
  if (!form.value.citizenship) {
    alert('请填写国籍！')
    return
  }
  if (!form.value.usAddress) {
    alert('请填写美国地址！')
    return
  }
  if (!form.value.sevis) {
    alert('请填写SEVIS编号！')
    return
  }
  if (!form.value.school) {
    alert('请填写学校名称！')
    return
  }

  // 如果校验通过，生成 PDF！
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

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  page.drawText(`Date of PDF generation: ${formattedDate}`, {
    x: 50,
    y: startY - 20,
    size: 12,
    font
  });

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  window.open(url)
}
</script>