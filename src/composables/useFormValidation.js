import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useFormValidation() {
  const { t } = useI18n()
  const errors = ref({
    name: '',
    passport: '',
    citizenship: '',
    usAddress: '',
    sevis: '',
    school: ''
  })

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        errors.value.name = !value ? t('errorName') : ''
        break
      case 'passport':
        errors.value.passport = !value ? t('errorPassport') : ''
        break
      case 'citizenship':
        errors.value.citizenship = !value ? t('errorCitizenship') : ''
        break
      case 'usAddress':
        errors.value.usAddress = !value ? t('errorUsAddress') : ''
        break
      case 'sevis':
        errors.value.sevis = !value ? t('errorSevis') : ''
        break
      case 'school':
        errors.value.school = !value ? t('errorSchool') : ''
        break
    }
  }

  const validateForm = (form) => {
    let valid = true
    errors.value = {
      name: '',
      passport: '',
      citizenship: '',
      usAddress: '',
      sevis: '',
      school: ''
    }
    if (!form.name) {
      errors.value.name = t('errorName')
      valid = false
    }
    if (!form.passport) {
      errors.value.passport = t('errorPassport')
      valid = false
    }
    if (!form.citizenship) {
      errors.value.citizenship = t('errorCitizenship')
      valid = false
    }
    if (!form.usAddress) {
      errors.value.usAddress = t('errorUsAddress')
      valid = false
    }
    if (!form.sevis) {
      errors.value.sevis = t('errorSevis')
      valid = false
    }
    if (!form.school) {
      errors.value.school = t('errorSchool')
      valid = false
    }
    return valid
  }

  const focusFirstError = () => {
    const errorFields = Object.keys(errors.value).filter(key => errors.value[key])
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0]
      const input = document.querySelector(`[name="${firstErrorField}"]`)
      if (input) input.focus()
    }
  }

  return {
    errors,
    validateForm,
    validateField,
    focusFirstError
  }
} 