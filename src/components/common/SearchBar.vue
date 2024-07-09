<template>
  <div class="search-bar">
    <TextInput
      id="city-input"
      :label="t('enter_city_name')"
      v-model="city"
      :placeholder="t('enter_city_name')"
      :error="getError('city')"
      :disabled="weatherStore.loading"
    />
    <UiButton @click="search" aria-label="Search" :disabled="weatherStore.loading">
      {{ t('search') }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import { useI18n } from 'vue-i18n'
import { useFormError, type ValidationRule } from '@/composables/useFormError'

import TextInput from '@/components/common/TextInput.vue'
import UiButton from '@/components/common/UiButton.vue'

const city = ref<string>('')
const { getError, validateField } = useFormError<string>()
const weatherStore = useWeatherStore()
const { t } = useI18n()

const cityRules: ValidationRule<string>[] = [value => (!value.trim() ? t('enter_city_name') : null)]

const search = async (): Promise<void> => {
  if (validateField('city', city.value, cityRules)) {
    await weatherStore.fetchWeather(city.value)
  }
}
</script>

<style scoped lang="scss">
.search-bar {
  @media (min-width: #{$desktop-width}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }
}
</style>
