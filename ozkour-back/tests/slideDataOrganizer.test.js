const slide = require('../google-api/slideDataOrganizer')
const simpleTalk = require('./dataset/talk1.json')
const talksWithOverflowDate = require('./dataset/talk1.json')
const talksWithOverflowEvent = require('./dataset/talk2.json')
const talksWithOverflowEventByFar = require('./dataset/talk2.json')
describe('DataOrganizer', () => {
  describe('data concistency', () => {
    it('check clustering by date and by EventName', () => {
      expect(slide.clusterByDate(simpleTalk)).toMatchSnapshot()
    })
  })
  describe('write on another slide when it overflows', () => {
    it('displays additional date on another slide ', () => {
      expect(slide.clusterByDate(talksWithOverflowDate)).toMatchSnapshot()
    })
    it('displays additional date on another slides ', () => {
      expect(slide.clusterByDate(talksWithOverflowEventByFar)).toMatchSnapshot()
    })
    it('displays additional events on another slide', () => {
      expect(slide.clusterByDate(talksWithOverflowEvent)).toMatchSnapshot()
    })
  })
})
