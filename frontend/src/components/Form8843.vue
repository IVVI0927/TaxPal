<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">{{ $t('formTitle') }}</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Personal Information Section -->
      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">{{ $t('personalInfo') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label for="name" class="block text-sm font-medium text-gray-700">{{ $t('name') }}</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              :class="['mt-1 block w-full rounded-md shadow-sm', errors.name ? 'border-red-500' : 'border-gray-300']"
              @input="updateField('name', $event.target.value)"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <div class="form-group">
            <label for="passport" class="block text-sm font-medium text-gray-700">{{ $t('passport') }}</label>
            <input
              id="passport"
              v-model="formData.passport"
              type="text"
              :class="['mt-1 block w-full rounded-md shadow-sm', errors.passport ? 'border-red-500' : 'border-gray-300']"
              @input="updateField('passport', $event.target.value)"
            />
            <p v-if="errors.passport" class="mt-1 text-sm text-red-600">{{ errors.passport }}</p>
          </div>

          <div class="form-group">
            <label for="citizenship" class="block text-sm font-medium text-gray-700">{{ $t('citizenship') }}</label>
            <select
              id="citizenship"
              v-model="formData.citizenship"
              :class="['mt-1 block w-full rounded-md shadow-sm', errors.citizenship ? 'border-red-500' : 'border-gray-300']"
              @change="updateField('citizenship', $event.target.value)"
            >
              <option value="">{{ $t('selectCountry') }}</option>
              <option v-for="country in countries" :key="country.code" :value="country.code">
                {{ country.name }}
              </option>
            </select>
            <p v-if="errors.citizenship" class="mt-1 text-sm text-red-600">{{ errors.citizenship }}</p>
          </div>

          <div class="form-group">
            <label for="usAddress" class="block text-sm font-medium text-gray-700">{{ $t('usAddress') }}</label>
            <input
              id="usAddress"
              v-model="formData.usAddress"
              type="text"
              :class="['mt-1 block w-full rounded-md shadow-sm', errors.usAddress ? 'border-red-500' : 'border-gray-300']"
              @input="updateField('usAddress', $event.target.value)"
            />
            <p v-if="errors.usAddress" class="mt-1 text-sm text-red-600">{{ errors.usAddress }}</p>
          </div>

          <div class="form-group">
            <label for="entryDate" class="block text-sm font-medium text-gray-700">{{ $t('entryDate') }}</label>
            <input
              id="entryDate"
              v-model="formData.entryDate"
              type="date"
              class="mt-1 block w-full rounded-md shadow-sm border-gray-300"
              @input="updateField('entryDate', $event.target.value)"
            />
          </div>

          <div class="form-group">
            <label for="visaType" class="block text-sm font-medium text-gray-700">{{ $t('visaType') }}</label>
            <select
              id="visaType"
              v-model="formData.visaType"
              class="mt-1 block w-full rounded-md shadow-sm border-gray-300"
              @change="updateField('visaType', $event.target.value)"
            >
              <option value="">{{ $t('selectVisaType') }}</option>
              <option value="F1">{{ $t('visaF1') }}</option>
              <option value="J1">{{ $t('visaJ1') }}</option>
              <option value="M1">{{ $t('visaM1') }}</option>
            </select>
          </div>
        </div>
      </section>

      <!-- School Information Section -->
      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">{{ $t('schoolInfo') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label for="sevis" class="block text-sm font-medium text-gray-700">{{ $t('sevis') }}</label>
            <input
              id="sevis"
              v-model="formData.sevis"
              type="text"
              :class="['mt-1 block w-full rounded-md shadow-sm', errors.sevis ? 'border-red-500' : 'border-gray-300']"
              @input="updateField('sevis', $event.target.value)"
            />
            <p v-if="errors.sevis" class="mt-1 text-sm text-red-600">{{ errors.sevis }}</p>
          </div>

          <div class="form-group">
            <label for="school" class="block text-sm font-medium text-gray-700">{{ $t('school') }}</label>
            <input
              id="school"
              v-model="formData.school"
              type="text"
              :class="['mt-1 block w-full rounded-md shadow-sm', errors.school ? 'border-red-500' : 'border-gray-300']"
              @input="updateField('school', $event.target.value)"
            />
            <p v-if="errors.school" class="mt-1 text-sm text-red-600">{{ errors.school }}</p>
          </div>

          <div class="form-group md:col-span-2">
            <label for="schoolAddress" class="block text-sm font-medium text-gray-700">{{ $t('schoolAddress') }}</label>
            <input
              id="schoolAddress"
              v-model="formData.schoolAddress"
              type="text"
              class="mt-1 block w-full rounded-md shadow-sm border-gray-300"
              @input="updateField('schoolAddress', $event.target.value)"
            />
          </div>
        </div>
      </section>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="isSubmitting || hasErrors"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="mr-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ isSubmitting ? $t('generating') : $t('submit') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import { countries } from '@/config/countries'

const store = useFormStore()
const { formData, errors, isSubmitting, hasErrors } = storeToRefs(store)
const { updateField, submitForm } = store

const handleSubmit = () => {
  submitForm()
}
</script>

<style scoped>
.form-group {
  @apply space-y-1;
}

input, select {
  @apply focus:ring-blue-500 focus:border-blue-500;
}
</style> 