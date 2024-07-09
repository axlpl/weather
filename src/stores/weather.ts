import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Weather } from '@/types/Weather'
import { useFetch } from '@/composables/useFetch'

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const useWeatherStore = defineStore('weather', () => {
  const { data, error, loading, request } = useFetch<Weather>(WEATHER_API_URL)
  const cityName = ref<string | null>(null)

  const fetchWeather = async (city: string): Promise<void> => {
    cityName.value = city
    await request('get', '/weather', { q: city, appid: WEATHER_API_KEY, units: 'metric' })
  }

  const temperature = computed(() => data.value?.main.temp ?? null)
  const humidity = computed(() => data.value?.main.humidity ?? null)
  const windSpeed = computed(() => data.value?.wind.speed ?? null)
  const description = computed(() => data.value?.weather[0].description ?? null)
  const icon = computed(() => data.value?.weather[0].icon ?? null)

  const clearWeatherData = () => {
    data.value = null
    cityName.value = null
  }

  return {
    data,
    loading,
    cityName,
    error,
    fetchWeather,
    clearWeatherData,
    temperature,
    humidity,
    windSpeed,
    description,
    icon
  }
})
