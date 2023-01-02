import { shallowMount } from '@vue/test-utils'
import ChoosingTemplate from '@/components/ChoosingTemplate.vue'
import '@testing-library/jest-dom/extend-expect'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('ChoosingTemplate', () => {
  let props
  /** @type{ import('@vue/test-utils').VueWrapper } */
  let wrapper
  /** @type{ ReturnType< import('./dataset/talks.dataset.js').dataSetFactory> } */
  let talksDataSet
  beforeEach(() => {
    talksDataSet = dataSetFactory()
    resetProps()
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should display the templates given in props', () => {
    const inputs = wrapper.findAll('input')
    const labels = wrapper.findAll('label')

    expect(inputs[0].attributes().value).toBe('quoide9')
    expect(labels[0].text()).toBe('QUOI DE 9')
    expect(inputs[1].attributes().value).toBe('emailing')
    expect(labels[1].text()).toBe('E-MAILING')
  })
  it('should select the selected template given in props', () => {
    const inputSelectedProps = wrapper.find('input[value="quoide9"]')

    expect(inputSelectedProps.element.checked).toBe(true)
  })
  describe('when a template is NOT validated', () => {
    beforeEach(() => {
      props.visuals = [
        talksDataSet.templates.QUOI_DE_9,
        talksDataSet.templates.MEETUP
      ]
      resetWrapper()
    })
    it('should disable the template', () => {
      const inputDisabledProps = wrapper.find('input[value="meetup"]')
      expect(inputDisabledProps.element).toBeDisabled()
    })
  })
  describe('when a template is validated', () => {
    beforeEach(() => {
      props.visuals = [
        talksDataSet.templates.QUOI_DE_9,
        talksDataSet.templates.EMAILING,
        talksDataSet.templates.MEETUP
      ]
      resetWrapper()
    })
    describe('when the user pick a template', () => {
      beforeEach(async () => {
        const radioBtnUnselected = wrapper.find('input[value="emailing"]')
        await radioBtnUnselected.setChecked()
      })
      it('should select the new template', () => {
        const radioBtnSelected = wrapper.find('input[value="emailing"]')
        expect(radioBtnSelected.element.checked).toBe(true)
      })
      it('should emit the new template', () => {
        expect(wrapper.emitted('changeTemplate')).toBeTruthy()
        expect(wrapper.emitted('changeTemplate')[0][0])
          .toStrictEqual(talksDataSet.templates.EMAILING)
      })
    })
  })

  function resetProps () {
    props = {
      visuals: [
        talksDataSet.templates.QUOI_DE_9,
        talksDataSet.templates.EMAILING
      ],
      selected: talksDataSet.templates.QUOI_DE_9
    }
  }

  function resetWrapper () {
    wrapper = shallowMount(ChoosingTemplate, {
      props
    })
  }
})
