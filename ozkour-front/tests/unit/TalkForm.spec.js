import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TalkForm from '@/views/TalkForm'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('TalkForm', () => {
  /** @type{ import('@vue/test-utils').VueWrapper } */
  let wrapper
  /** @type{ ReturnType< import('./dataset/talks.dataset.js').dataSetFactory> } */
  let talksDataSet
  beforeEach(() => {
    talksDataSet = dataSetFactory()
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })
  describe('when the template is selected', () => {
    beforeEach(() => {
      const [choosingTemplate] = wrapper.findAllComponents('.choosing-template')
      choosingTemplate.vm.$emit('changeTemplate', talksDataSet.templates.EMAILING)
    })
    it('should update the props of the choosing date component', () => {
      const [choosingDate] = wrapper.findAllComponents('.choosing-date')
      const expectedProps = talksDataSet.templates.EMAILING
      expect(choosingDate.props('chosenTemplate')).toStrictEqual(expectedProps)
    })
  })

  describe('when the period is selected', () => {
    beforeEach(async () => {
      const choosingDate = wrapper.findComponent('.choosing-date')

      await choosingDate.trigger('onSearchEvent', [new Date('2022-11-21'), new Date('2022-11-25')])
      const piniaSetup = {
        initialState: {
          talk: { retrieved: talksDataSet.allTalks }
        }
      }
      resetWrapper({ piniaSetup })
    })
    it('should update the props of the arrayEventComponent', () => {
      const [arrayEvents] = wrapper.findAllComponents('.event-array')
      expect(arrayEvents.props('events')).toStrictEqual(talksDataSet.allTalks)
    })
  })
  xdescribe('when the user changed the selected talks', () => {
    // To do when the store is removed
    const valueEmitted = {
      date: '25/01/2021',
      universe: 'univers 1',
      eventType: 'NightClazz',
      eventName: 'RemoteClazz Nodejs',
      talkTitle: 'Techniques minimalistes pour Node.js',
      speakers: 'Anne Imal',
      checked: false
    }
    beforeEach(() => {
      const eventArray = wrapper.findComponent('.event-array')
      eventArray.vm.$emit('newSelectionChange', valueEmitted)
    })
    it('should update the props of the eventArrayComponent', () => {
      const eventArray = wrapper.findComponent('.event-array')
      expect(eventArray.props('events')).toEqual(true)
    })
  })

  describe('when the template, the period, the talks have been set', () => {
    let dataInRecapModal
    beforeEach(() => {
      dataInRecapModal = {
        chosenTemplate: talksDataSet.templates.EMAILING,
        period: {
          start: '2022-12-01',
          end: '2022-12-31'
        },
        talks: talksDataSet.allTalks.map(talk => talk.talkTitle)

      }
      resetWrapper({
        data: dataInRecapModal
      })
    })
    describe('when the user clicks on the generate button', () => {
      beforeEach(async () => {
        const [primaryBtn] = wrapper.findAllComponents('.primary-btn')
        await primaryBtn.trigger('click')
      })
      xit('should reveal the recap modal component', () => {
        const [modal] = wrapper.findAllComponents('.recap-modal')
        expect(modal).toBeDefined()

        expect(modal.props('template')).toBe(dataInRecapModal.chosenTemplate.label)
        expect(modal.props('dates')).toStrictEqual(dataInRecapModal.period)
        // To do when the store is removed
        expect(modal.props('eventsTitle')).toBe(dataInRecapModal.talks)
      })
      it('should blur the body except for the recap modal component', () => {
        const body = wrapper.find('main')
        expect(body.attributes('class')).toContain('container--blured')
        const [modal] = wrapper.findAllComponents('.recap-modal')
        expect(modal.attributes('class')).toContain('non-blurable')
      })
      describe('when the user clicks on the close button of the modal', () => {
        beforeEach(() => {
          const [modal] = wrapper.findAllComponents('.recap-modal')
          modal.vm.$emit('close')
        })
        it('should close the recap modal component', () => {
          const [modal] = wrapper.findAllComponents('.recap-modal')
          expect(modal).toBeUndefined()
        })
        it('should unblur the body', () => {
          const body = wrapper.find('main')
          expect(body.attributes('class')).not.toContain('container--blured')
        })
      })
      describe('when the user clicks on the validate button of the modal', () => {
        beforeEach(() => {
          const [modal] = wrapper.findAllComponents('.recap-modal')
          modal.vm.$emit('submit')
        })
        it('should close the recap modal component', () => {
          const [modal] = wrapper.findAllComponents('.recap-modal')
          expect(modal).toBeUndefined()
        })
        it('should reveal the pop up', () => {
          const [popUp] = wrapper.findAllComponents('.pop-up')
          expect(popUp).toBeDefined()
        })
        it('should blur the body except for the pop up component', () => {
          const body = wrapper.find('main')
          expect(body.attributes('class')).toContain('container--blured')
          const [popUp] = wrapper.findAllComponents('.pop-up')
          expect(popUp.attributes('class')).toContain('non-blurable')
        })
        xdescribe('when the result of the request is an error', () => {
          // To do when the store is removed
          beforeEach(() => {

          })
          it('should change the props of the pop up', () => {

          })
        })
        xdescribe('when the result of the request is a normal message', () => {
          // To do when the store is removed
          beforeEach(() => {

          })
          it('should change the props of the pop up', () => {

          })
        })
        describe('when the user clicks on the close or validate button of the pop up', () => {
          beforeEach(() => {
            const [popUp] = wrapper.findAllComponents('.pop-up')
            popUp.vm.$emit('close')
          })
          it('should close the pop up', () => {
            const [popUp] = wrapper.findAllComponents('.pop-up')
            expect(popUp).toBeUndefined()
          })
          it('should unblur the body', () => {
            const body = wrapper.find('main')
            expect(body.attributes('class')).not.toContain('container--blured')
          })
        })
      })
    })
  })

  function resetWrapper (options = {}) {
    const { data } = options
    const { piniaSetup } = options
    wrapper = shallowMount(TalkForm, {
      data () {
        return data
      },
      global: {
        plugins: [createTestingPinia(piniaSetup)],
        stubs: {
          ChoosingTemplate: choosingTemplateStub,
          ChoosingDate: choosingDateStub,
          PrimaryBtn: primaryBtnStub,
          RecapModal: recapModalStub,
          PopUp: popUpStub,
          EventArray: EventArrayStub
        }
      }
    })
  }
})

const choosingTemplateStub = {
  template: `
  <div class = "choosing-template">
      <slot></slot>
  </div>`,
  props: ['visuals', 'selected']
}
const choosingDateStub = {
  template: `
  <div class = "choosing-date">
      <slot></slot>
  </div>`,
  props: ['chosenTemplate']
}
const primaryBtnStub = {
  template: `
  <div class = "primary-btn">
      <slot></slot>
  </div>`,
  props: ['disabled']
}
const recapModalStub = {
  template: `
  <div class = "recap-modal">
      <slot></slot>
  </div>`,
  props: ['eventsTitle', 'dates', 'template']
}
const popUpStub = {
  template: `
  <div class = "pop-up">
      <slot></slot>
  </div>`,
  props: ['error', 'title']
}
const EventArrayStub = {
  template: `
  <div class = "event-array">
      <slot></slot>
  </div>`,
  props: ['events', 'retrieving', 'columns']
}
