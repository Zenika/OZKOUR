import EventArrayLoader from '@/components/EventArrayLoader.vue'
import { shallowMount } from '@vue/test-utils'

describe('EventArrayLoader', () => {
  let wrapper
  beforeEach(() => {
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should display a title as "Pas de [slot] entre les dates recherchées"', () => {
    const loader = wrapper.find('div[class="loading-container"]')
    expect(loader.exists()).toBe(true)
  })

  function resetWrapper () {
    wrapper = shallowMount(EventArrayLoader, {
      slots: {
        default: slotsDefault
      }
    })
  }
})

const slotsDefault = 'talks'
