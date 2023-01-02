import { shallowMount } from '@vue/test-utils'
import '@testing-library/jest-dom/extend-expect'
import PrimaryBtn from '@/components/Buttons/PrimaryBtn'

describe('PrimaryBtn', () => {
  let props
  /** @type{ import('@vue/test-utils').VueWrapper } */
  let wrapper
  beforeEach(() => {
    resetProps()
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('when the disabled props is false', () => {
    beforeEach(() => {
      props.disabled = false
      resetWrapper()
    })
    it('should enable the button', () => {
      expect(wrapper.find('button').element).toBeEnabled()
    })

    it('should change the class of the button to primary-btn__disabled', () => {
      const button = wrapper.find('button')
      expect(button.element).toHaveClass('primary-btn')
    })
  })

  describe('when the disabled props is true', () => {
    beforeEach(() => {
      props.disabled = true
      resetWrapper()
    })
    it('should disable the button', () => {
      const button = wrapper.find('button')
      expect(button.element).toBeDisabled()
    })

    it('should change the class of the button to primary-btn__disabled', () => {
      const button = wrapper.find('button')
      expect(button.element).toHaveClass('primary-btn__disabled')
    })
  })
  function resetProps () {
    props = {
      disabled: false
    }
  }

  function resetWrapper () {
    wrapper = shallowMount(PrimaryBtn, {
      props
    })
  }
})
