import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Form8843 from '@/components/Form8843.vue'
import { useFormStore } from '@/stores/form'

describe('Form8843', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    wrapper = mount(Form8843, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        mocks: {
          $t: (key: string) => key
        }
      }
    })
    store = useFormStore()
  })

  it('renders properly', () => {
    expect(wrapper.find('h1').text()).toBe('formTitle')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('updates form field value', async () => {
    const nameInput = wrapper.find('#name')
    await nameInput.setValue('John Doe')
    expect(store.updateField).toHaveBeenCalledWith('name', 'John Doe')
  })

  it('shows error message when field is invalid', async () => {
    store.errors.name = 'errorName'
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#name').classes()).toContain('border-red-500')
    expect(wrapper.find('.text-red-600').text()).toBe('errorName')
  })

  it('disables submit button when form is submitting', async () => {
    store.isSubmitting = true
    await wrapper.vm.$nextTick()
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('disables submit button when form has errors', async () => {
    store.hasErrors = true
    await wrapper.vm.$nextTick()
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('calls submitForm when form is submitted', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    expect(store.submitForm).toHaveBeenCalled()
  })
}) 