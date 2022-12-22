import { shallowMount } from '@vue/test-utils'
import DateInput from '../../src/components/DateInput.vue'
import { freeze, reset } from 'timekeeper'
import { DateTime } from 'luxon'

describe('DateInput', () => {
  let props
  /** @type{ import('@vue/test-utils').VueWrapper } */
  let wrapper
  beforeEach(() => {
    freeze(new Date('2022-11-13'))
    resetProps()
    resetWrapper()
  })
  afterEach(() => {
    reset()
  })

  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should display the date given in props', () => {
    const dateInput = wrapper.find('input')
    expect(dateInput).toBeDefined()

    expect(dateInput.element.value)
      .toStrictEqual(DateTime.fromJSDate(props.date).toFormat('yyyy-MM-dd'))
  })

  describe('when user change the date', () => {
    beforeEach(async () => {
      const input = wrapper.find('input')
      await input.setValue('2021-02-13')
    })
    it('should dislay and emit the new date', () => {
      const input = wrapper.find('input')
      expect(input.element.value).toBe('2021-02-13')

      expect(wrapper.emitted().change).toBeTruthy()
      expect(wrapper.emitted('change')[0][0])
        .toEqual(new Date('2021-02-13T00:00:00.000'))
    })
  })

  function resetProps () {
    props = {
      date: new Date()
    }
  }

  function resetWrapper () {
    wrapper = shallowMount(DateInput, {
      props
    })
  }
})
