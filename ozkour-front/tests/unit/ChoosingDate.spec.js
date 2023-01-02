import { shallowMount } from '@vue/test-utils'
import ChoosingDate from '@/components/ChoosingDate.vue'
import { freeze, reset } from 'timekeeper'
import { DateTime } from 'luxon'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('ChoosingDate', () => {
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
  afterEach(() => {
    reset()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('when the period is selected with a template', () => {
    describe('and the selected template has a weekly frequency', () => {
      beforeEach(() => {
        props.chosenTemplate =
        {
          ...props.chosenTemplate,
          frequency: 'week'
        }
        resetWrapper()
      })
      it('should display the period input and the date picker', () => {
        const periodInput = wrapper.findComponent('.period-input')
        const datePicker = wrapper.findComponent('.date-picker')
        expect(periodInput).toBeDefined()
        expect(datePicker).toBeDefined()
        expect(periodInput).toHaveProperty('wrapperElement')
        expect(datePicker).toHaveProperty('wrapperElement')
      })
      describe('and today is monday', () => {
        beforeEach(() => {
          freeze(new Date('2022-11-14'))// monday
          resetWrapper()
        })
        it('should select the current week', () => {
          const periodInput = wrapper.findComponent('.period-input')
          const datePicker = wrapper.findComponent('.date-picker')

          const expectedStartDate = new Date('2022-11-14')
          const expectedEndDate = new Date('2022-11-20')

          expect(periodInput.props('period')).toEqual([expectedStartDate, expectedEndDate])

          const periodDatePicker = datePicker.attributes().modelvalue.split(',')
            .map(dateString => new Date(dateString))
          expect(periodDatePicker).toEqual([expectedStartDate, expectedEndDate])
        })
        it('should emit the new period', () => {
          expect(wrapper.emitted('onSearchEvent')).toBeTruthy()
          expect(wrapper.emitted('onSearchEvent').length).toBe(1)

          const expectedDateStart = DateTime.fromJSDate(new Date('2022-11-14')).toFormat('yyyy-MM-dd')
          const expectedDateEnd = DateTime.fromJSDate(new Date('2022-11-20')).toFormat('yyyy-MM-dd')
          const expectedEmit = { dateStart: expectedDateStart, dateEnd: expectedDateEnd }

          const lastIndexEmit = wrapper.emitted('onSearchEvent').length - 1
          const receivedEmit = wrapper.emitted('onSearchEvent')[lastIndexEmit][0]

          expect(receivedEmit).toStrictEqual(expectedEmit)
        })
      })

      describe('and today is NOT monday', () => {
        beforeEach(() => {
          freeze(new Date('2022-11-15'))// tuesday
          resetWrapper()
        })
        it('should select the next week', () => {
          const periodInput = wrapper.findComponent('.period-input')
          const datePicker = wrapper.findComponent('.date-picker')

          const expectedStartDate = new Date('2022-11-21')
          const expectedEndDate = new Date('2022-11-27')

          expect(periodInput.props('period')).toEqual([expectedStartDate, expectedEndDate])

          const periodDatePicker = datePicker.attributes().modelvalue.split(',')
            .map(dateString => new Date(dateString))
          expect(periodDatePicker).toEqual([expectedStartDate, expectedEndDate])
        })
        it('should emit the new period', () => {
          expect(wrapper.emitted('onSearchEvent')).toBeTruthy()
          expect(wrapper.emitted('onSearchEvent').length).toBe(1)

          const expectedDateStart = DateTime.fromJSDate(new Date('2022-11-21')).toFormat('yyyy-MM-dd')
          const expectedDateEnd = DateTime.fromJSDate(new Date('2022-11-27')).toFormat('yyyy-MM-dd')
          const expectedEmit = { dateStart: expectedDateStart, dateEnd: expectedDateEnd }

          const lastIndexEmit = wrapper.emitted('onSearchEvent').length - 1
          const receivedEmit = wrapper.emitted('onSearchEvent')[lastIndexEmit][0]

          expect(receivedEmit).toStrictEqual(expectedEmit)
        })
      })
    })

    describe('and the selected template has a monthly frequency', () => {
      beforeEach(() => {
        props.chosenTemplate =
        props.chosenTemplate =
        {
          ...props.chosenTemplate,
          frequency: 'month'
        }
        resetWrapper()
      })
      it('should display the period input and the date picker', () => {
        const periodInput = wrapper.findComponent('.period-input')
        const datePicker = wrapper.findComponent('.date-picker')
        expect(periodInput).toBeDefined()
        expect(datePicker).toBeDefined()
      })
      describe('and we are in the first week of the month', () => {
        beforeEach(() => {
          freeze(new Date('2022-11-02'))
          resetWrapper()
        })
        it('should select the current month starting today', () => {
          const periodInput = wrapper.findComponent('.period-input')
          const datePicker = wrapper.findComponent('.date-picker')

          const expectedStartDate = DateTime.fromJSDate(new Date('2022-11-02')).toFormat('yyyy-MM-dd')
          const expectedEndDate = DateTime.fromJSDate(new Date('2022-11-30')).toFormat('yyyy-MM-dd')

          const propsPeriodInput = periodInput.props('period')
            .map(date => DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'))
          expect(propsPeriodInput)
            .toEqual([expectedStartDate, expectedEndDate])

          const periodDatePicker = datePicker.attributes().modelvalue
            .split(',')
            .map(dateString => DateTime.fromJSDate(new Date(dateString)).toFormat('yyyy-MM-dd'))
          expect(periodDatePicker).toEqual([expectedStartDate, expectedEndDate])
        })
        it('should emit the new period', () => {
          expect(wrapper.emitted('onSearchEvent')).toBeTruthy()
          expect(wrapper.emitted('onSearchEvent').length).toBe(1)

          const expectedDateStart = DateTime.fromJSDate(new Date('2022-11-02')).toFormat('yyyy-MM-dd')
          const expectedDateEnd = DateTime.fromJSDate(new Date('2022-11-30')).toFormat('yyyy-MM-dd')
          const expectedEmit = { dateStart: expectedDateStart, dateEnd: expectedDateEnd }

          const lastIndexEmit = wrapper.emitted('onSearchEvent').length - 1
          const receivedEmit = wrapper.emitted('onSearchEvent')[lastIndexEmit][0]

          expect(receivedEmit).toStrictEqual(expectedEmit)
        })
      })
      describe('and we are NOT in the first week of the month', () => {
        beforeEach(() => {
          freeze(new Date('2022-11-13'))
          resetWrapper()
        })
        it('should select the current month starting today', () => {
          const periodInput = wrapper.findComponent('.period-input')
          const datePicker = wrapper.findComponent('.date-picker')

          const expectedStartDate = DateTime.fromJSDate(new Date('2022-12-01')).toFormat('yyyy-MM-dd')
          const expectedEndDate = DateTime.fromJSDate(new Date('2022-12-31')).toFormat('yyyy-MM-dd')

          const propsPeriodInput = periodInput.props('period')
            .map(date => DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'))
          expect(propsPeriodInput)
            .toEqual([expectedStartDate, expectedEndDate])

          const periodDatePicker = datePicker.attributes().modelvalue
            .split(',')
            .map(dateString => DateTime.fromJSDate(new Date(dateString)).toFormat('yyyy-MM-dd'))
          expect(periodDatePicker).toEqual([expectedStartDate, expectedEndDate])
        })
        it('should emit the new period', () => {
          expect(wrapper.emitted('onSearchEvent')).toBeTruthy()
          expect(wrapper.emitted('onSearchEvent').length).toBe(1)

          const expectedDateStart = DateTime.fromJSDate(new Date('2022-12-01')).toFormat('yyyy-MM-dd')
          const expectedDateEnd = DateTime.fromJSDate(new Date('2022-12-31')).toFormat('yyyy-MM-dd')
          const expectedEmit = { dateStart: expectedDateStart, dateEnd: expectedDateEnd }

          const lastIndexEmit = wrapper.emitted('onSearchEvent').length - 1
          const receivedEmit = wrapper.emitted('onSearchEvent')[lastIndexEmit][0]

          expect(receivedEmit).toStrictEqual(expectedEmit)
        })
      })
    })
  })

  describe('when one of the child component change the period', () => {
    describe('when the period input change the period', () => {
      beforeEach(() => {
        const periodInput = wrapper.findComponent('.period-input')
        periodInput.vm.$emit('change', [new Date('2022-11-21'), new Date('2022-11-25')])
      })
      it('should emit the new period', () => {
        expect(wrapper.emitted('onSearchEvent')).toBeTruthy()
        // when the component is mounted it emits so when the
        // period input change it emits another time
        expect(wrapper.emitted('onSearchEvent').length).toBe(2)

        const expectedDateStart = DateTime.fromJSDate(new Date('2022-11-21')).toFormat('yyyy-MM-dd')
        const expectedDateEnd = DateTime.fromJSDate(new Date('2022-11-25')).toFormat('yyyy-MM-dd')
        const expectedEmit = { dateStart: expectedDateStart, dateEnd: expectedDateEnd }

        const lastIndexEmit = wrapper.emitted('onSearchEvent').length - 1
        const receivedEmit = wrapper.emitted('onSearchEvent')[lastIndexEmit][0]

        expect(receivedEmit).toStrictEqual(expectedEmit)
      })
      it('should set the date picker to the same date', () => {
        const datePicker = wrapper.findComponent('.date-picker')

        const expectedStartDate = new Date('2022-11-21')
        const expectedEndDate = new Date('2022-11-25')

        const periodDatePicker = datePicker.attributes().modelvalue
          .split(',')
          .map(dateString => new Date(dateString))
        expect(periodDatePicker).toEqual([expectedStartDate, expectedEndDate])
      })
    })

    describe('when the date picker change the period', () => {
      beforeEach(async () => {
        const datePicker = wrapper.findComponent('.date-picker')
        await datePicker.setValue([new Date('2022-11-21'), new Date('2022-11-25')])
      })
      it('should emit the new period', () => {
        expect(wrapper.emitted('onSearchEvent')).toBeTruthy()
        // when the component is mounted it emits so when the
        // date change it emits another time
        expect(wrapper.emitted('onSearchEvent').length).toBe(2)

        const expectedDateStart = DateTime.fromJSDate(new Date('2022-11-21')).toFormat('yyyy-MM-dd')
        const expectedDateEnd = DateTime.fromJSDate(new Date('2022-11-25')).toFormat('yyyy-MM-dd')
        const expectedEmit = { dateStart: expectedDateStart, dateEnd: expectedDateEnd }

        const lastIndexEmit = wrapper.emitted('onSearchEvent').length - 1
        const receivedEmit = wrapper.emitted('onSearchEvent')[lastIndexEmit][0]

        expect(receivedEmit).toStrictEqual(expectedEmit)
      })
      it('should set the period input to the same date', () => {
        const periodInput = wrapper.findComponent('.period-input')

        const expectedStartDate = new Date('2022-11-21')
        const expectedEndDate = new Date('2022-11-25')

        expect(periodInput.props('period')).toEqual([expectedStartDate, expectedEndDate])
      })
    })
  })

  function resetProps () {
    props = {
      chosenTemplate: talksDataSet.templates.QUOI_DE_9

    }
  }

  function resetWrapper () {
    wrapper = shallowMount(ChoosingDate, {
      props,
      global: {
        stubs: {
          PeriodInput: periodInputStub,
          Datepicker: datePickerStub
        }
      }
    })
  }
})

const periodInputStub = {
  template: `
    <div class = "period-input">
    </div>`,
  props: ['period']
}

const datePickerStub = {
  template: `
    <div class = "date-picker">
    </div>`
}
