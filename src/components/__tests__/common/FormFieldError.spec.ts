import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormFieldError from '@/components/common/FormFieldError.vue'

describe('FormFieldError.vue', () => {
  it('renders error message when error is present', () => {
    const wrapper = mount(FormFieldError, {
      props: { error: 'Error message' }
    })
    expect(wrapper.text()).toContain('Error message')
  })

  it('does not render anything when error is null', () => {
    const wrapper = mount(FormFieldError, {
      props: { error: null }
    })
    expect(wrapper.find('.form-field-error').exists()).toBe(false)
  })
})
