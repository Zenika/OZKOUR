const dateUtils = require('../../../src/utils/dateUtils')
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
    describe('Date and Duration to Date Interval', () => {
      it('should return a date at a format similar to "le [day] [month]", given a date and a duration equal to 1', () => {
        const res = dateUtils.convDateAndDurationToDateIntervalInLetter('11/03/2022', 1)
        expect(res).toBe('le 11 mars')
      })
      it('should return a date at a format similar to "les [day] et [day] [month]", given a date, a duration equal to 2 and the dates of the interval are from the same month', () => {
        const res = dateUtils.convDateAndDurationToDateIntervalInLetter('11/03/2022', 2)
        expect(res).toBe('les 11 et 12 mars')
      })
      it('should return a date at a format similar to "du [day] [month] au [day] [month]", given a date and a duration equal or superior to 2', () => {
        const res = dateUtils.convDateAndDurationToDateIntervalInLetter('31/03/2022', 2)
        expect(res).toBe('du 31 mars au 1er avril')
      })
    })
  })
})
