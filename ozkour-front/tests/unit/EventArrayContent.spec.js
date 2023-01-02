import EventArrayContent from '@/components/EventArrayContent.vue'
import { shallowMount } from '@vue/test-utils'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('EventArrayContent', () => {
  /** @type{ ReturnType< import('./dataset/talks.dataset.js').dataSetFactory> } */
  let talksDataSet
  let props
  let wrapper
  beforeEach(() => {
    talksDataSet = dataSetFactory()
    resetProps()
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should display a title as "Liste des [slot] sélectionnés"', () => {
    const title = wrapper.find('h2')
    expect(title.text()).toBe('Liste des ' + slotsDefault + ' sélectionnés')
  })
  it('should set the columns to the EventHeader component', () => {
    const eventHeader = wrapper.findComponent('.event-header')
    expect(eventHeader.props('columns')).toEqual(talksDataSet.columns)
  })
  it('should set the columns and a talk to the EventLine components', () => {
    const eventLines = wrapper.findAllComponents('.event-line')
    eventLines.forEach((eventLine, index) => {
      expect(eventLine.props('columns')).toEqual(talksDataSet.columns)
      expect(eventLine.props('value')).toEqual(talksDataSet.allTalks[index])
    })
  })
  it('should display the right amount of events', () => {
    const nbRows = wrapper.findAll('.event-line')
    expect(nbRows).toHaveLength(talksDataSet.allTalks.length)
  })

  describe('when the eventHeader component emit "sort"', () => {
    let valueEmitted
    beforeEach(() => {
      valueEmitted = { selectedColumnKey: talksDataSet.columns[1].key, orderIsAscending: true }
      const eventHeader = wrapper.findComponent('.event-header')
      eventHeader.vm.$emit('sort', valueEmitted)
    })
    it('should emit "newSort"', () => {
      expect(wrapper.emitted('newSort')).toBeDefined()
      expect(wrapper.emitted('newSort').length).toBe(1)
      expect(wrapper.emitted('newSort')[0][0]).toStrictEqual({ ...valueEmitted, events: talksDataSet.allTalks })
    })
  })
  describe('when an eventLine component emit "change"', () => {
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
      const eventLine = wrapper.findAllComponents('.event-line')[0]
      eventLine.vm.$emit('change', valueEmitted)
    })
    it('should emit "newSelectionChange"', () => {
      expect(wrapper.emitted('newSelectionChange')).toBeDefined()
      expect(wrapper.emitted('newSelectionChange').length).toBe(1)
      expect(wrapper.emitted('newSelectionChange')[0][0]).toStrictEqual(valueEmitted)
    })
  })

  function resetProps () {
    props = {
      events: talksDataSet.allTalks,
      columns: talksDataSet.columns
    }
  }
  function resetWrapper () {
    wrapper = shallowMount(EventArrayContent, {
      slots: {
        default: slotsDefault
      },
      props,
      global: {
        stubs: {
          EventHeader: eventHeaderStub,
          EventLine: eventLineStub
        }
      }
    })
  }
})

const slotsDefault = 'talks'

const eventHeaderStub = {
  template: `
    <div class = "event-header">
    </div>`,
  props: ['columns']
}

const eventLineStub = {
  template: `
    <div class = "event-line">
    </div>`,
  props: ['columns', 'value']
}
