import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FormData, FormErrors } from '@/types/form'
import { useFormValidation } from '@/composables/useFormValidation'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { generatePDF } from '@/services/pdf'

export const useFormStore = defineStore('form', () => {
  const { t } = useI18n()
  const toast = useToast()
  const { errors, validateForm, validateField, focusFirstError } = useFormValidation()

  const formData = ref<FormData>({
    name: '',
    passport: '',
    citizenship: '',
    usAddress: '',
    entryDate: '',
    visaType: '',
    sevis: '',
    school: '',
    schoolAddress: ''
  })

  const isSubmitting = ref(false)
  const isDirty = ref(false)

  const hasErrors = computed(() => {
    return Object.values(errors.value).some(error => error !== '')
  })

  const updateField = (field: keyof FormData, value: string) => {
    formData.value[field] = value
    validateField(field, value)
    isDirty.value = true
  }

  const resetForm = () => {
    formData.value = {
      name: '',
      passport: '',
      citizenship: '',
      usAddress: '',
      entryDate: '',
      visaType: '',
      sevis: '',
      school: '',
      schoolAddress: ''
    }
    isDirty.value = false
  }

  const submitForm = async () => {
    if (!validateForm(formData.value)) {
      focusFirstError()
      return
    }

    try {
      isSubmitting.value = true
      const pdfBlob = await generatePDF(formData.value)
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `form8843_${formData.value.name}_${new Date().toISOString()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success(t('success'))
      resetForm()
    } catch (error) {
      toast.error(t('errorGeneratingPDF'))
      console.error('Error generating PDF:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    isDirty,
    hasErrors,
    updateField,
    resetForm,
    submitForm
  }
}) 