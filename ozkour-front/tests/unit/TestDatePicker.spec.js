import { mount, shallowMount } from '@vue/test-utils'
import ChoosingDate from '@/components/ChoosingDate.vue'

describe('ChoosingDate Component', () => {
  describe('week day estimation', () => {
    it('should return 1 when howManyDaysUntilNextMonday is called and we are sunday', async () => {
      const wrapper = shallowMount(ChoosingDate, {
        propsData: {
          chosenTemplate: {
            name: 'quoiDeNeuf',
            frequency: 'week'
          }
        }
      })
      const res = wrapper.vm.howManyDaysUntilNextMonday(new Date('2020-02-23'))
      expect(res).toBe(1)
    })
    it('should return 7 when howManyDaysUntilNextMonday is called and we are monday', async () => {
      const wrapper = shallowMount(ChoosingDate, {
        propsData: {
          chosenTemplate: {
            name: 'quoiDeNeuf',
            frequency: 'week'
          }
        }
      })
      const res = wrapper.vm.howManyDaysUntilNextMonday(new Date('2020-02-24'))
      expect(res).toBe(7)
    })
  })

  describe('Date Picker Component', () => {
    it('Select Start Date from input', async () => {
      const wrapper = mount(ChoosingDate, {
        propsData: {
          chosenTemplate: {
            name: 'quoiDeNeuf',
            frequency: 'week'
          }
        }
      })
      const input = wrapper.find('[id="start"]')
      await input.setValue('2021-01-01')

      expect(input.element.value).toBe('2021-01-01')
    })

    it('Select End Date from input', async () => {
      const wrapper = mount(ChoosingDate, {
        propsData: {
          chosenTemplate: {
            name: 'quoiDeNeuf',
            frequency: 'week'
          }
        }
      })
      const input = wrapper.find('[id="end"]')
      await input.setValue('2021-02-01')

      expect(input.element.value).toBe('2021-02-01')
    })

    it('change the inputs update the date picker', async () => {
      const wrapper = mount(ChoosingDate, {
        propsData: {
          chosenTemplate: {
            name: 'quoiDeNeuf',
            frequency: 'week'
          }
        }
      })

      const inputStart = wrapper.find('[id="start"]')
      await inputStart.setValue('2021-01-01')
      const inputEnd = wrapper.find('[id="end"]')
      await inputEnd.setValue('2021-02-01')

      const datePicker = wrapper.findComponent('[data-test="test"]')
      expect(datePicker.componentVM.modelValue).toStrictEqual([
        '2021-01-01',
        '2021-02-01'
      ])
    })

    it('change the datePicker update the inputs', async () => {
      const wrapper = mount(ChoosingDate, {
        propsData: {
          chosenTemplate: {
            name: 'quoiDeNeuf',
            frequency: 'week'
          }
        }
      })

      const datePicker = wrapper.findComponent('[data-test="test"]')
      await datePicker.setValue(['2021-01-01', '2021-02-01'])
      const inputStart = wrapper.find('[id="start"]')
      const inputEnd = wrapper.find('[id="end"]')

      expect(inputStart.element.value).toStrictEqual('2021-01-01')
      expect(inputEnd.element.value).toStrictEqual('2021-02-01')
    })

    it('date begining is before date end', async () => {
      const wrapper = mount(ChoosingDate, {
        propsData: {
          chosenTemplate: {
            name: 'quoiDeNeuf',
            frequency: 'week'
          }
        }
      })

      const inputStart = wrapper.find('[id="start"]')
      await inputStart.setValue('2021-01-01')
      const inputEnd = wrapper.find('[id="end"]')
      await inputEnd.setValue('2021-02-01')
      await inputStart.setValue('2021-02-03')

      expect(inputStart.element.value).toStrictEqual('2021-02-01')

      await inputEnd.setValue('2021-01-01')

      expect(inputEnd.element.value).toStrictEqual('2021-02-01')
    })
  })
})
