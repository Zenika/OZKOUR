import { shallowMount } from '@vue/test-utils'
import PeriodInput from '../../src/components/PeriodInput.vue'
import { freeze, reset } from 'timekeeper'

describe('PeriodInput', () => {
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

  describe('when start date is before end date', () => {
    beforeEach(() => {
      props.period[0] = new Date()
      props.period[1] = new Date()
    })
    it('should display the period', () => {
      const [startDate, endDate] = wrapper.findAllComponents('.date-input')
      expect(startDate).toBeDefined()
      expect(endDate).toBeDefined()

      expect(startDate.props('date')).toStrictEqual(props.period[0])
      expect(endDate.props('date')).toStrictEqual(props.period[1])
    })
    describe('then user put end date before start date', () => {
      describe('using the props', () => {
        beforeEach(() => {
          wrapper.setProps({
            period: [new Date('2022-11-31'), new Date('2022-11-30')]
          })
          resetWrapper()
        })
        it('should set the end date to the start date', () => {
          const [startDate, endDate] = wrapper.findAllComponents('.date-input')
          expect(startDate).toBeDefined()
          expect(endDate).toBeDefined()

          expect(startDate.props('date')).toStrictEqual(props.period[0])
          expect(endDate.props('date')).toStrictEqual(props.period[1])
          expect(endDate.props('date')).toStrictEqual(props.period[0])
        })
      })
      describe('using the start date input', () => {
        beforeEach(() => {
          const [startDate] = wrapper.findAllComponents('.date-input')
          startDate.vm.$emit('change', new Date('2022-11-30'))
        })
        it('should set the end date to the start date and emit the period', () => {
          expect(wrapper.emitted().change).toBeTruthy()
          expect(wrapper.emitted('change')[0][0]._value)
            .toEqual([new Date('2022-11-30'), new Date('2022-11-30')])
        })
      })
      describe('using the end date input', () => {
        beforeEach(() => {
          // eslint-disable-next-line no-unused-vars
          const [_, endDate] = wrapper.findAllComponents('.date-input')
          //   await endDate.trigger('change', new Date('2022-11-10'))
          endDate.vm.$emit('change', new Date('2022-11-10'))
        })
        it('should set the start date to the end date and emit the period', () => {
          expect(wrapper.emitted().change).toBeTruthy()
          expect(wrapper.emitted('change')[0][0]._value)
            .toEqual([new Date('2022-11-10'), new Date('2022-11-10')])
        })
      })
    })
  })

  function resetProps () {
    props = {
      period: [new Date(), new Date()]
    }
  }

  function resetWrapper () {
    wrapper = shallowMount(PeriodInput, {
      props,
      global: {
        stubs: { DateInput: dateInputStub }
      }
    })
  }
})

const dateInputStub = {
  template: `
    <div class = "date-input">
        <slot></slot>
    </div>`,
  props: ['date']
}
