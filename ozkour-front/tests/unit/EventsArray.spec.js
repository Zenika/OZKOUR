import { shallowMount } from '@vue/test-utils'
import EventArray from '@/components/EventArray.vue'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('EventArray', () => {
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

  describe('when the events are being retrieved', () => {
    beforeEach(() => {
      props.retrieving = true
      resetWrapper()
    })
    it('should display the loader', () => {
      const loader = wrapper.find('.event-array-loader')
      expect(loader.exists()).toBe(true)
    })
  })

  describe('when the events have been retrieved', () => {
    beforeEach(() => {
      props.retrieving = false
      resetWrapper()
    })
    it('should not display the loader', () => {
      const loader = wrapper.find('.event-array-loader')
      expect(loader.exists()).toBe(false)
    })
    describe('when no events is given in props', () => {
      beforeEach(() => {
        props.events = []
        resetWrapper()
      })
      it('should display the EventArrayEmpty component', () => {
        const emptyEventArray = wrapper.find('.event-array-empty')
        expect(emptyEventArray.exists()).toBe(true)
        expect(emptyEventArray.text()).toBe(slotsDefault)
      })
      it('should not display the EventArrayContent component', () => {
        const contentEventArray = wrapper.find('.event-array-content')
        expect(contentEventArray.exists()).toBe(false)
      })
    })
    describe('when at least one event is given in props', () => {
      beforeEach(() => {
        props.events = talksDataSet.allTalks
        resetWrapper()
      })
      it('should display the EventArrayContent component', () => {
        const contentEventArray = wrapper.find('.event-array-content')
        expect(contentEventArray.exists()).toBe(true)
        expect(contentEventArray.text()).toBe(slotsDefault)
      })
      it('should not display the EventArrayEmpty component', () => {
        const emptyEventArray = wrapper.find('.event-array-empty')
        expect(emptyEventArray.exists()).toBe(false)
      })
      it('should set the columns and a talk to the EventLine components', () => {
        const contentEventArray = wrapper.findComponent('.event-array-content')
        expect(contentEventArray.props('columns')).toEqual(talksDataSet.columns)
        expect(contentEventArray.props('events')).toEqual(talksDataSet.allTalks)
      })
      describe('when the EventArrayContent emits "newSort" event', () => {
        let valueEmitted
        beforeEach(() => {
          valueEmitted = { selectedColumnKey: talksDataSet.columns[1].key, orderIsAscending: true, events: talksDataSet.allTalks }
          const contentEventArray = wrapper.findComponent('.event-array-content')
          contentEventArray.vm.$emit('newSort', valueEmitted)
        })
        it('should emit "newSort"', () => {
          expect(wrapper.emitted('newSort')).toBeTruthy()
          expect(wrapper.emitted('newSort').length).toBe(1)
          expect(wrapper.emitted('newSort')[0][0]).toStrictEqual(valueEmitted)
        })
      })
      describe('when the EventArrayContent emits "newSelectionChange" event', () => {
        const valueEmitted = {
          date: '25/01/2021',
          universe: 'univers 1',
          eventType: 'NightClazz',
          eventName: 'RemoteClazz Nodejs',
          talkTitle: 'Techniques minimalistes pour Node.js',
          speakers: 'Anne Imal',
          checked: true
        }
        beforeEach(() => {
          const contentEventArray = wrapper.findComponent('.event-array-content')
          contentEventArray.vm.$emit('newSelectionChange', valueEmitted)
        })
        it('should emit "newSelectionChange"', () => {
          expect(wrapper.emitted('newSelectionChange')).toBeDefined()
          expect(wrapper.emitted('newSelectionChange').length).toBe(1)
          expect(wrapper.emitted('newSelectionChange')[0][0]).toStrictEqual(valueEmitted)
        })
      })
    })
  })

  function resetProps () {
    props = {
      events: [],
      retrieving: false,
      columns: talksDataSet.columns
    }
  }

  function resetWrapper () {
    wrapper = shallowMount(EventArray, {
      slots: {
        default: slotsDefault
      },
      props,
      global: {
        stubs: {
          EventArrayLoader: eventArrayLoaderStub,
          EventArrayEmpty: eventArrayEmptyStub,
          EventArrayContent: eventArrayContentStub
        }
      }
    })
  }
})

const slotsDefault = 'talks'

const eventArrayLoaderStub = {
  template: `
    <div class = "event-array-loader">
    </div>`
}

const eventArrayEmptyStub = {
  template: `
    <div class = "event-array-empty">
      <slot/>
    </div>`
}

const eventArrayContentStub = {
  template: `
    <div class = "event-array-content">
      <slot/>
    </div>`,
  props: ['events', 'columns']
}
