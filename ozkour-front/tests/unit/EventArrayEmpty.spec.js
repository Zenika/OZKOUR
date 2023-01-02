import EventArrayEmpty from '@/components/EventArrayEmpty.vue'
import { shallowMount } from '@vue/test-utils'

describe('EventArrayEmpty', () => {
  let wrapper
  beforeEach(() => {
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should display a title as "Pas de [slot] entre les dates recherchées"', () => {
    const title = wrapper.find('h2')
    expect(title.text()).toBe('Pas de ' + slotsDefault + ' entre les dates recherchées')
  })

  function resetWrapper () {
    wrapper = shallowMount(EventArrayEmpty, {
      slots: {
        default: slotsDefault
      }
    })
  }
})

const slotsDefault = 'talks'
