import EventHeader from '@/components/EventHeader.vue'
import { shallowMount } from '@vue/test-utils'
import { dataSetFactory } from './dataset/talks.dataset.js'

describe('EventHeader', () => {
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
  it('should display the right amount of columns', () => {
    const columnsDisplayed = wrapper.findAll('th')
    expect(columnsDisplayed).toHaveLength(talksDataSet.columns.length + 1)
  })
  let n = 0
  it('should let the first column empty', () => { // because this column will contain the checkboxes
    const allCells = wrapper.findAll('th')
    expect(allCells[n].element.childNodes.length).toBe(0)
    n++
  })
  test.each(dataSetFactory().columns)('should display the $key in the right column',
    ({ label }) => {
      const expectedValue = label
      const allCells = wrapper.findAll('th')
      expect(allCells[n].text()).toBe(expectedValue)
      n++
    }
  )
  it('should make all the columns selectable but the first one', () => {
    const allCells = wrapper.findAll('th')
    expect(allCells[0].attributes('class')).toBeUndefined()
    talksDataSet.columns.forEach((element, index) => {
      expect(allCells[index + 1].attributes('class')).toContain('selectable')
    })
  })

  it('should select the second column', () => {
    const allCells = wrapper.findAll('th')
    expect(allCells[1].attributes('class')).toContain('columnSelected')

    const arrow = allCells[1].find('icon-arrow-stub')
    expect(arrow).toBeDefined()
    expect(arrow.attributes('class')).toBe('arrow_down')
  })

  it('should emit to sort by this column', () => {
    expect(wrapper.emitted('sort')).toBeTruthy()

    const expectedEmit = { selectedColumnKey: talksDataSet.columns[0].key, orderIsAscending: true }
    expect(wrapper.emitted('sort')[0][0]).toStrictEqual(expectedEmit)
  })

  describe('when the user clicks on another column', () => {
    const selectedColumn = 3
    beforeEach(async () => {
      const thirdCell = wrapper.findAll('th')[selectedColumn]
      await thirdCell.trigger('click')
    })
    it('should select this column ascendingly', () => {
      const allCells = wrapper.findAll('th')
      expect(allCells[selectedColumn].attributes('class')).toContain('columnSelected')

      const arrow = allCells[selectedColumn].find('icon-arrow-stub')
      expect(arrow).toBeDefined()
      expect(arrow.attributes('class')).toBe('arrow_down')
    })
    it('should emit to sort by this column ascendingly', () => {
      expect(wrapper.emitted('sort')).toBeTruthy()

      const expectedEmit = { selectedColumnKey: talksDataSet.columns[selectedColumn - 1].key, orderIsAscending: true }
      expect(wrapper.emitted('sort')[1][0]).toStrictEqual(expectedEmit)
    })
  })

  describe('when the user clicks on the selected column that sorts ascendingly', () => {
    beforeEach(async () => {
      const selectedColumn = wrapper.find('th[class="selectable columnSelected"]')
      await selectedColumn.trigger('click')
    })
    it('should select this column descendingly', () => {
      const selectedColumn = wrapper.find('th[class="selectable columnSelected"]')
      expect(selectedColumn.attributes('class')).toContain('columnSelected')

      const arrow = selectedColumn.find('icon-arrow-stub')
      expect(arrow).toBeDefined()
      expect(arrow.attributes('class')).toBe('')
    })
    it('should emit to sort by this column descendingly', () => {
      expect(wrapper.emitted('sort')).toBeTruthy()

      const selectedColumn = wrapper.find('th[class="selectable columnSelected"]')
      const selecedKey = talksDataSet.columns.find((column) => column.label === selectedColumn.text()).key

      const expectedEmit = { selectedColumnKey: selecedKey, orderIsAscending: false }
      expect(wrapper.emitted('sort')[1][0]).toStrictEqual(expectedEmit)
    })
  })
  describe('when the user clicks on the selected column that sorts descendingly', () => {
    let nbEmit = 1
    beforeEach(async () => {
      const selectedColumn = wrapper.find('th[class="selectable columnSelected"]')
      const isSortedAscendingly = selectedColumn.find('icon-arrow-stub').attributes('class') === 'arrow_down'
      if (isSortedAscendingly) {
        await selectedColumn.trigger('click')
        nbEmit = 2
      }
      await selectedColumn.trigger('click')
    })
    it('should select this column ascendingly', () => {
      const selectedColumn = wrapper.find('th[class="selectable columnSelected"]')
      expect(selectedColumn.attributes('class')).toContain('columnSelected')

      const arrow = selectedColumn.find('icon-arrow-stub')
      expect(arrow).toBeDefined()
      expect(arrow.attributes('class')).toBe('arrow_down')
    })
    it('should emit to sort by this column ascendingly', () => {
      expect(wrapper.emitted('sort')).toBeTruthy()

      const selectedColumn = wrapper.find('th[class="selectable columnSelected"]')
      const selecedKey = talksDataSet.columns.find((column) => column.label === selectedColumn.text()).key

      const expectedEmit = { selectedColumnKey: selecedKey, orderIsAscending: true }
      expect(wrapper.emitted('sort')[nbEmit][0]).toStrictEqual(expectedEmit)
    })
  })

  function resetProps () {
    props = {
      columns: talksDataSet.columns
    }
  }
  function resetWrapper () {
    wrapper = shallowMount(EventHeader, {
      props
    })
  }
})
