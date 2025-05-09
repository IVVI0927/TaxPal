<template>
  <div class="space-y-4">
    <h3 class="text-xl font-semibold text-gray-700 border-b pb-1">{{ $t('personalInfo') }}</h3>
    <div>
      <div class="space-y-1">
        <label class="block font-semibold">{{ $t('name') }}</label>
        <input v-model="form.name" @input="validateField('name', form.name)" name="name" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
      </div>
    </div>
    <div>
      <div class="space-y-1">
        <label class="block font-semibold">{{ $t('passport') }}</label>
        <input v-model="form.passport" @input="validateField('passport', form.passport)" name="passport" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <p v-if="errors.passport" class="text-red-500 text-xs mt-1">{{ errors.passport }}</p>
      </div>
    </div>
    <div>
      <div class="relative space-y-1">
        <label class="block font-semibold">{{ $t('citizenship') }}</label>
        <input
          v-model="form.citizenship"
          @input="searchQuery = form.citizenship; validateField('citizenship', form.citizenship)"
          name="citizenship"
          type="text"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          autocomplete="off"
          placeholder="Type to search country"
        />
        <p v-if="errors.citizenship" class="text-red-500 text-xs mt-1">{{ errors.citizenship }}</p>
        <ul v-if="filteredCountries.length" class="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-auto shadow-md list-none p-2 space-y-2">
          <li
            v-for="country in filteredCountries"
            :key="country"
            @click="selectCountry(country)"
            class="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded cursor-pointer transition"
          >
            <span v-if="country === 'China'">🇨🇳</span>
            <span v-else-if="country === 'United States'">🇺🇸</span>
            <span v-else-if="country === 'Canada'">🇨🇦</span>
            <span v-else-if="country === 'United Kingdom'">🇬🇧</span>
            <span v-else-if="country === 'Australia'">🇦🇺</span>
            <span v-else-if="country === 'Germany'">🇩🇪</span>
            <span v-else-if="country === 'France'">🇫🇷</span>
            <span v-else-if="country === 'Japan'">🇯🇵</span>
            <span v-else-if="country === 'South Korea'">🇰🇷</span>
            <span v-else-if="country === 'Singapore'">🇸🇬</span>
            <span v-else-if="country === 'India'">🇮🇳</span>
            <span v-else-if="country === 'Mexico'">🇲🇽</span>
            {{ country }}
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="space-y-1">
        <label class="block font-semibold">{{ $t('usAddress') }}</label>
        <input v-model="form.usAddress" @input="validateField('usAddress', form.usAddress)" name="usAddress" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { countryOptions } from '../config/countries'

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

const searchQuery = ref('')
const filteredCountries = computed(() => {
  if (!searchQuery.value) return []
  return countryOptions.filter(c =>
    c.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectCountry = (country) => {
  props.form.citizenship = country
  searchQuery.value = ''
  props.validateField('citizenship', country)
}
</script> 