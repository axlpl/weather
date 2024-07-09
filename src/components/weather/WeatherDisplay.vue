<template>
  <DataWrapper :loading="weatherStore.loading" :error="weatherStore.error">
    <Transition>
      <div class="weather-info__wrapper" v-if="weatherStore.data">
        <section
          class="weather-info"
          aria-live="polite"
          role="region"
          :aria-labelledby="'weather-city'"
          :aria-describedby="'weather-description'"
        >
          <CloseButton @click="weatherStore.clearWeatherData" />
          <h3 class="weather-info__city">{{ weatherStore.cityName }}</h3>
          <p class="weather-info__item">
            {{ t('temperature') }}: {{ weatherStore.temperature }} °C
          </p>
          <p class="weather-info__item">{{ t('humidity') }}: {{ weatherStore.humidity }} %</p>
          <p class="weather-info__item">{{ t('wind_speed') }}: {{ weatherStore.windSpeed }} m/s</p>
          <p class="weather-info__item">{{ t('description') }}: {{ weatherStore.description }}</p>
          <WeatherIcon v-if="weatherStore.icon" :icon="weatherStore.icon" />
        </section>
      </div>
    </Transition>
  </DataWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useWeatherStore } from '@/stores/weather'

import WeatherIcon from '@/components/weather/WeatherIcon.vue'
import DataWrapper from '@/components/common/DataWrapper.vue'
import CloseButton from '@/components/common/CloseButton.vue'

const weatherStore = useWeatherStore()
const { t } = useI18n()
</script>

<style scoped lang="scss">
.weather-info {
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;

  &__item {
    margin-bottom: 0.5rem;
  }

  &__city {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__wrapper {
    position: relative;
    margin-top: 1rem;
    width: 100%;
  }

  @media (min-width: #{$desktop-width}) {
    width: 20rem;

    &__wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 0;
    }
  }
}
</style>
