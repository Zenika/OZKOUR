const dateUtils = require('../Utils/dateUtils')
describe('dateUtils', () => {
  describe('Display date as words', () => {
    it('should return a month as words, given a month in number format', () => {
      expect(dateUtils.convDateToMonthInLetter('11/03/2021')).toBe('mars')
    })
    it('should return a date as words, given a month in number format', () => {
      expect(dateUtils.displayFullDateWithWords('11/03/2021')).toBe('11 mars 2021')
    })
  })
})
