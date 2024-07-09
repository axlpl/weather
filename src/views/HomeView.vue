<template>
  <div class="container">
    <h1 class="container__title">{{ t('checkWeather') }}</h1>
    <SearchBar aria-labelledby="check-weather-title" />
    <WeatherDisplay aria-labelledby="check-weather-title" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SearchBar from '@/components/common/SearchBar.vue'
import WeatherDisplay from '@/components/weather/WeatherDisplay.vue'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.container {
  &__title {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  @media (min-width: #{$desktop-width}) {
    display: flex;
    position: relative;
    flex-direction: column;
  }
}
</style>
