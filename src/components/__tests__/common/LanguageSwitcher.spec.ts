import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'pl',
  legacy: false,
  messages: {
    en: { select_language: 'Select Language', title: 'Title' },
    pl: { select_language: 'Wybierz język', title: 'Tytuł' }
  }
})

describe('LanguageSwitcher.vue', () => {
  it('renders language button with correct initial text', () => {
    const wrapper = mount(LanguageSwitcher, {
      global: { plugins: [i18n] }
    })
    expect(wrapper.find('button').text()).toBe('EN')
  })

  it('changes language on button click', async () => {
    const wrapper = mount(LanguageSwitcher, {
      global: { plugins: [i18n] }
    })
    const button = wrapper.find('button')
    expect(button.text()).toBe('EN')

    await button.trigger('click')
    expect(wrapper.find('button').text()).toBe('PL')
  })
})
