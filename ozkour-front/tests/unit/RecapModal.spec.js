import { shallowMount } from '@vue/test-utils'
import RecapModal from '@/components/RecapModal.vue'
import '@testing-library/jest-dom/extend-expect'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('RecapModal', () => {
  /** @type{ ReturnType< import('./dataset/talks.dataset.js').dataSetFactory> } */
  let talksDataSet
  let props
  /** @type{ import('@vue/test-utils').VueWrapper } */
  let wrapper
  beforeEach(() => {
    talksDataSet = dataSetFactory()
    resetProps()
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should display the template given in props', () => {
    const templateDisplayed = wrapper.find('p[ data-test="template-detail"]')

    expect(templateDisplayed.text()).toBe('Visuel : ' + props.template)
  })
  it('should display the period given in props', () => {
    const periodDisplayed = wrapper.find('p[ data-test="date-detail"]')

    expect(periodDisplayed.text()).toBe('Dates : ' + props.dates.start + ' au ' + props.dates.end)
  })
  it('should display the events titles given in props', () => {
    const eventsList = wrapper.find('ul[class="events"]').findAll('li')

    props.eventsTitle.forEach((eventTitle, i) => {
      expect(eventsList[i].text()).toBe(eventTitle)
    })
  })

  describe('when at least one of the events titles given in props is undefined', () => {
    beforeEach(() => {
      props.eventsTitle = [
        undefined,
        ...props.eventsTitle
      ]
      resetWrapper()
    })
    it('should display the undefined event title as "non renseigné"', () => {
      const eventsList = wrapper.find('ul[class="events"]').findAll('li')

      props.eventsTitle.forEach((eventTitle, i) => {
        expect(eventsList[i].text()).toBe(eventTitle || 'non renseigné')
      })
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
      const validateButton = wrapper.find('primary-btn-stub')
      await validateButton.trigger('click')
    })
    it('should emit the event "submit" once', () => {
      expect(wrapper.emitted('submit')).toBeTruthy()
      expect(wrapper.emitted('submit').length).toBe(1)
    })
    it('should enable the loading animation', () => {
      const loader = wrapper.find('div[class="loading-container"]')
      expect(loader.exists()).toBe(true)
    })
    it('should disable the validate button', () => {
      const validateButton = wrapper.find('primary-btn-stub')
      expect(validateButton.element).toBeDisabled()
    })
  })

  function resetProps () {
    props = {
      eventsTitle: talksDataSet.allTalks.map(talk => talk.talkTitle),
      dates: {
        start: '2022-12-01',
        end: '2022-12-31'
      },
      template: talksDataSet.templates.EMAILING.id
    }
  }

  function resetWrapper () {
    wrapper = shallowMount(RecapModal, {
      props
    })
  }
})
