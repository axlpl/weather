import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DataWrapper from '@/components/common/DataWrapper.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en: { loading: 'Loading...' }
  }
})

describe('DataWrapper.vue', () => {
  it('renders loading message when loading', () => {
    const wrapper = mount(DataWrapper, {
      props: { loading: true, error: null },
      global: { plugins: [i18n] }
    })
    expect(wrapper.text()).toContain('Loading...')
  })

  it('renders error message when there is an error', () => {
    const wrapper = mount(DataWrapper, {
      props: { loading: false, error: 'Error message' },
      global: { plugins: [i18n] }
    })
    expect(wrapper.text()).toContain('Error message')
  })

  it('renders slot content when not loading and no error', () => {
    const wrapper = mount(DataWrapper, {
      props: { loading: false, error: null },
      slots: { default: '<div>Content</div>' },
      global: { plugins: [i18n] }
    })
    expect(wrapper.html()).toContain('<div>Content</div>')
  })
})
