import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '@/components/common/SearchBar.vue'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'
import { useWeatherStore } from '@/stores/weather'

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en: { enter_city_name: 'Enter city name', search: 'Search' }
  }
})

describe('SearchBar.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input and button', () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false
          }),
          i18n
        ]
      }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter city name')
    expect(wrapper.find('button').text()).toBe('Search')
  })

  it('triggers search on button click', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false
          }),
          i18n
        ]
      }
    })
    const weatherStore = useWeatherStore()
    vi.spyOn(weatherStore, 'fetchWeather').mockResolvedValue()
    
    await wrapper.find('input').setValue('London')
    await wrapper.find('button').trigger('click')

    expect(weatherStore.fetchWeather).toHaveBeenCalled()
  })
})
