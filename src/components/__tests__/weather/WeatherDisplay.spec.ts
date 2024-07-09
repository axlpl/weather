// src/components/__tests__/weather/WeatherDisplay.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherDisplay from '@/components/weather/WeatherDisplay.vue'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      temperature: 'Temperature',
      humidity: 'Humidity',
      wind_speed: 'Wind Speed',
      description: 'Description'
    }
  }
})

describe('WeatherDisplay.vue', () => {
  it('renders weather information', () => {
    const wrapper = mount(WeatherDisplay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              weather: {
                data: {
                  main: { temp: 20, humidity: 50 },
                  wind: { speed: 5 },
                  weather: [{ description: 'Clear', icon: '01d' }]
                }
              }
            }
          }),
          i18n
        ]
      }
    })
    expect(wrapper.text()).toContain('Temperature: 20 °C')
    expect(wrapper.text()).toContain('Humidity: 50 %')
    expect(wrapper.text()).toContain('Wind Speed: 5 m/s')
    expect(wrapper.text()).toContain('Description: Clear')
  })
})
