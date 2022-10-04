const dateUtils = require('../src/Utils/dateUtils')
describe('dateUtils', () => {
  describe('Test on date', () => {
    it('should return true when the year is between two dates', () => {
      // lower bound
      expect(dateUtils.isYearBetweenDates('2021', '2021-03-21', '2022-03-21')).toBeTruthy()
      // upper bound
      expect(dateUtils.isYearBetweenDates('2022', '2021-03-21', '2022-03-21')).toBeTruthy()
    })
    it('should return false when the year is not between two dates', () => {
      // lower bound
      expect(dateUtils.isYearBetweenDates('2020', '2021-03-21', '2022-03-21')).toBeFalsy()
      // upper bound
      expect(dateUtils.isYearBetweenDates('2023', '2021-03-21', '2022-03-21')).toBeFalsy()
    })
    it('should return the year of a date', () => {
      expect(dateUtils.getYear('11/03/2022')).toBe('2022')
    })
  })
  describe('Display date as words', () => {
    it('should return a month as words, given a month in number format', () => {
      expect(dateUtils.convDateToMonthInLetter('11/03/2021')).toBe('Mars')
    })
    it('should return a date as words, given a month in number format', () => {
      expect(dateUtils.displayFullDateWithWords('11/03/2021')).toBe('11 mars 2021')
    })
  })
})
