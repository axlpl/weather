import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWeatherStore } from '@/stores/weather'
import { useFetch, type ApiResponse } from '@/composables/useFetch'
import { ref } from 'vue'
import type { Weather } from '@/types/Weather'

vi.mock('@/composables/useFetch')

describe('weatherStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches weather data successfully', async () => {
    const mockRequest = vi.fn()
    const mockApiResponse: ApiResponse<Weather> = {
      data: ref({
        main: { temp: 20, humidity: 50 },
        wind: { speed: 5 },
        weather: [{ description: 'Clear', icon: '01d' }]
      }),
      error: ref(null),
      loading: ref(false),
      request: mockRequest
    }

    vi.mocked(useFetch).mockReturnValue(mockApiResponse)

    const weatherStore = useWeatherStore()

    await weatherStore.fetchWeather('London')

    expect(mockRequest).toHaveBeenCalledWith('get', '/weather', { q: 'London', appid: expect.any(String), units: 'metric' })
    expect(weatherStore.temperature).toBe(20)
    expect(weatherStore.humidity).toBe(50)
    expect(weatherStore.windSpeed).toBe(5)
    expect(weatherStore.description).toBe('Clear')
    expect(weatherStore.icon).toBe('01d')
  })

  it('handles fetch weather error', async () => {
    const mockRequest = vi.fn()
    const mockApiResponse: ApiResponse<Weather> = {
      data: ref(null),
      error: ref('Network Error'),
      loading: ref(false),
      request: mockRequest
    }

    vi.mocked(useFetch).mockReturnValue(mockApiResponse)

    const weatherStore = useWeatherStore()

    await weatherStore.fetchWeather('London')

    expect(mockRequest).toHaveBeenCalledWith('get', '/weather', { q: 'London', appid: expect.any(String), units: 'metric' })
    expect(weatherStore.error).toBe('Network Error')
  })
})
