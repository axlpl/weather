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
        coord: { lon: 21.0118, lat: 52.2298 },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
        base: 'stations',
        main: {
          temp: 25.8,
          feels_like: 25.64,
          temp_min: 24.84,
          temp_max: 26.61,
          pressure: 1021,
          humidity: 46,
          sea_level: 1021,
          grnd_level: 1010
        },
        visibility: 10000,
        wind: { speed: 5.81, deg: 130, gust: 0 },
        clouds: { all: 4 },
        dt: 1720554295,
        sys: {
          type: 2,
          id: 2032856,
          country: 'PL',
          sunrise: 1720491967,
          sunset: 1720551354
        },
        timezone: 7200,
        id: 756135,
        name: 'Warsaw',
        cod: 200
      }),
      error: ref(null),
      loading: ref(false),
      request: mockRequest
    }

    vi.mocked(useFetch).mockReturnValue(mockApiResponse)

    const weatherStore = useWeatherStore()

    await weatherStore.fetchWeather('Warsaw')

    expect(mockRequest).toHaveBeenCalledWith('get', '/weather', {
      q: 'Warsaw',
      appid: expect.any(String),
      units: 'metric'
    })
    expect(weatherStore.temperature).toBe(25.8)
    expect(weatherStore.humidity).toBe(46)
    expect(weatherStore.windSpeed).toBe(5.81)
    expect(weatherStore.description).toBe('clear sky')
    expect(weatherStore.icon).toBe('01n')
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

    await weatherStore.fetchWeather('Warsaw')

    expect(mockRequest).toHaveBeenCalledWith('get', '/weather', {
      q: 'Warsaw',
      appid: expect.any(String),
      units: 'metric'
    })
    expect(weatherStore.error).toBe('Network Error')
  })
})
