import EventLine from '@/components/EventLine.vue'
import { shallowMount } from '@vue/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('EventLine', () => {
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
  it('should display the right number of columns', () => {
    const columnsDisplayed = wrapper.findAll('td')
    expect(columnsDisplayed).toHaveLength(talksDataSet.columns.length + 1)
  })
  let n = 0
  it('should display the checkbox in the first cell of the line', () => {
    const allCells = wrapper.findAll('td')
    const firstCellElement = allCells[n].find('input[type="checkbox"]')

    expect(firstCellElement.exists()).toBe(true)
    n++
  })
  test.each(dataSetFactory().columns)('should display the $key in the right column',
    ({ key }) => {
      const expectedValue = talksDataSet.allTalks[0][key]
      const allCells = wrapper.findAll('td')
      expect(allCells[n].text()).toBe(expectedValue)
      n++
    }
  )

  describe('when the event is checked', () => {
    beforeEach(() => {
      props.value = {
        ...talksDataSet.allTalks[0],
        checked: true
      }
      resetWrapper()
    })
    it('the checkbox should be checked', () => {
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox).toBeDefined()

      expect(checkbox.element).toBeChecked()
    })
    describe('when the user clicks on the checkbox', () => {
      beforeEach(async () => {
        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.trigger('click')
      })
      it('should emit "change"', () => {
        expect(wrapper.emitted('change')).toBeDefined()
        expect(wrapper.emitted('change')).toHaveLength(1)
        expect(wrapper.emitted('change')[0][0]).toStrictEqual(talksDataSet.allTalks[0])
      })
      it('the checkbox should not be checked', () => {
        const checkbox = wrapper.find('input[type="checkbox"]')
        expect(checkbox).toBeDefined()

        expect(checkbox.element).not.toBeChecked()
      })
    })
  })

  describe('when the event is unchecked', () => {
    beforeEach(() => {
      props.value = {
        ...talksDataSet.allTalks[0],
        checked: false
      }
      resetWrapper()
    })
    it('the checkbox should not be checked', () => {
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox).toBeDefined()

      expect(checkbox.element).not.toBeChecked()
    })
    describe('when the user clicks on the checkbox', () => {
      beforeEach(async () => {
        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.trigger('click')
      })
      it('the checkbox should be checked', () => {
        const checkbox = wrapper.find('input[type="checkbox"]')
        expect(checkbox).toBeDefined()

        expect(checkbox.element).toBeChecked()
      })
      it('should emit "change"', () => {
        expect(wrapper.emitted('change')).toBeDefined()
        expect(wrapper.emitted('change')).toHaveLength(1)
        const expectedTalk = {
          ...talksDataSet.allTalks[0],
          checked: false
        }
        expect(wrapper.emitted('change')[0][0]).toStrictEqual(expectedTalk)
      })
    })
  })

  function resetProps () {
    props = {
      value: talksDataSet.allTalks[0],
      columns: talksDataSet.columns
    }
  }
  function resetWrapper () {
    wrapper = shallowMount(EventLine, {
      props
    })
  }
})
