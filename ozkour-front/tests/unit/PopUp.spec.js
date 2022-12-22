import { shallowMount } from '@vue/test-utils'
import PopUp from '@/components/PopUp.vue'
import '@testing-library/jest-dom/extend-expect'

describe('PopUp', () => {
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

  it('should display the title given in props', () => {
    const title = wrapper.find('h2')
    expect(title.text()).toBe('Résultat')
  })

  describe('when the pop up is used to display an error', () => {
    beforeEach(async () => {
      props.error = true
      resetWrapper()
    })
    it('should displayed the error picture', () => {
      const errorImg = wrapper.find('img')
      expect(errorImg.exists()).toBe(true)
    })
  })

  describe('when the pop up is NOT used to display an error', () => {
    beforeEach(async () => {
      props.error = false
      resetWrapper()
    })
    it('should displayed the error picture', () => {
      const errorImg = wrapper.find('img')
      expect(errorImg.exists()).toBe(false)
    })
  })

  describe('when the user clicks on the close button', () => {
    beforeEach(async () => {
      const closeButton = wrapper.find('button[class="close-btn"]')
      await closeButton.trigger('click')
    })
    it('should emit the event "close" once', () => {
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('close').length).toBe(1)
    })
  })

  describe('when the user clicks on the validate button', () => {
    beforeEach(async () => {
      const closeButton = wrapper.find('primary-btn-stub')
      await closeButton.trigger('click')
    })
    it('should emit the event "close" once', () => {
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('close').length).toBe(1)
    })
  })

  function resetProps () {
    props = {
      error: false,
      title: 'Résultat'
    }
  }

  function resetWrapper () {
    wrapper = shallowMount(PopUp, {
      props
    })
  }
})
