function isArrayAscending (arr) {
  return arr.every(function (x, i) {
    return i === 0 || x >= arr[i - 1]
  })
}
function isArrayDescending (arr) {
  return arr.every(function (x, i) {
    return i === 0 || x <= arr[i - 1]
  })
}

const arrayUtils = require('../../../src/Utils/arrayUtils')
describe('arrayUtils', () => {
  describe('compareByKey', () => {
    const a = { key1: 10, key2: 2, key3: 3 }
    const b = { key1: 1, key2: 20, key3: 3 }
    let key
    describe('when a is bigger than b', () => {
      beforeEach(() => {
        key = 'key1'
      })
      it('should return 1', () => {
        const res = arrayUtils.compareByKey(a, b, key)
        expect(res).toBe(1)
      })
    })
    describe('when a is smaller than b', () => {
      beforeEach(() => {
        key = 'key2'
      })
      it('should return 1', () => {
        const res = arrayUtils.compareByKey(a, b, key)
        expect(res).toBe(-1)
      })
    })
    describe('when a is equal to b', () => {
      beforeEach(() => {
        key = 'key3'
      })
      it('should return 1', () => {
        const res = arrayUtils.compareByKey(a, b, key)
        expect(res).toBe(0)
      })
    })
  })
  describe('sortArrayByKeyAndOrder', () => {
    const arrayToOrder = [
      { key: 2 },
      { key: 5 },
      { key: 11 },
      { key: 7 },
      { key: 3 }
    ]
    const key = 'key'
    let isAscending
    describe('when it is asked to order ascendingly', () => {
      beforeEach(() => {
        isAscending = true
      })
      it('should return an array ordered ascendingly by a key', () => {
        const res = arrayUtils.sortArrayByKeyAndOrder(arrayToOrder, key, isAscending)
        const keyResArray = res.map((element) => element.key)
        expect(isArrayAscending(keyResArray)).toBe(true)
      })
    })
    describe('when it is asked to order descendingly', () => {
      beforeEach(() => {
        isAscending = false
      })
      it('should return an array ordered descendingly by a key', () => {
        const res = arrayUtils.sortArrayByKeyAndOrder(arrayToOrder, key, isAscending)
        const keyResArray = res.map((element) => element.key)
        expect(isArrayDescending(keyResArray)).toBe(true)
      })
    })
  })
})
