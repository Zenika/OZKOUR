const slide = require('../domain/quoiDe9Organizer')
const simpleTalk = require('./dataset/slideDataOrganizer/talk.json')
const talkClusterDate = require('./dataset/slideDataOrganizer/talkClusterDate.json')
const talkClusterEvent = require('./dataset/slideDataOrganizer/talkClusterEvent.json')
const talkNoCluster = require('./dataset/slideDataOrganizer/talkNoCluster.json')
const talksWithOverflowNormal = require('./dataset/slideDataOrganizer/talkDisplayNormal.json')
const talksWithOverflowDate = require('./dataset/slideDataOrganizer/talkOverFlow1.json')
const talksWithOverflowEvent = require('./dataset/slideDataOrganizer/talkOverFlow2.json')
const talksWithOverflowTalk = require('./dataset/slideDataOrganizer/talkOverFlow3.json')
describe('DataOrganizer', () => {
  describe('data concistency', () => {
    it('displays the talks not clustered when they are on different date and event', () => {
      expect(slide.clusterByDate(simpleTalk)).toMatchSnapshot()
    })
    it('displays the talks clustered by date when they are on the same date', () => {
      expect(slide.clusterByDate(talkClusterDate)).toMatchSnapshot()
    })
    it('displays the talks clustered by event when they are on the same date and event ', () => {
      expect(slide.clusterByDate(talkClusterEvent)).toMatchSnapshot()
    })
    it('displays the talks not clustered when they are on different date but the same event', () => {
      expect(slide.clusterByDate(talkNoCluster)).toMatchSnapshot()
    })
  })
  describe('write on a slide when it fits on only one', () => {
    it('displays talks slide', () => {
      expect(slide.clusterByDate(talksWithOverflowNormal)).toMatchSnapshot()
    })
  })
  describe('write on another slide when it overflows', () => {
    it('displays additional date on another slide ', () => {
      expect(slide.clusterByDate(talksWithOverflowDate)).toMatchSnapshot()
    })
    it('displays additional date on another slides ', () => {
      expect(slide.clusterByDate(talksWithOverflowEvent)).toMatchSnapshot()
    })
    it('displays additional events on another slide', () => {
      expect(slide.clusterByDate(talksWithOverflowTalk)).toMatchSnapshot()
    })
  })
})
