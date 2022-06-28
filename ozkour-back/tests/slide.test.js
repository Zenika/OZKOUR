const slide = require('../google-api/slide')
describe('Verifier', () => {
  describe('If Array', () => {
    it('return true if parameter is an array with one element', () => {
      const array = [_createValidTalk()]
      // then
      expect(slide.verifyTalks(array)).toBe(true)
    })
    it('return false if parameter is an array with zero element', () => {
      const array = []
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an undefined date', () => {
      const array = [
        {
          ..._createValidTalk(),
          date: undefined
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an undefined eventType', () => {
      const array = [
        {
          ..._createValidTalk(),
          eventType: undefined
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an undefined eventName', () => {
      const array = [
        {
          ..._createValidTalk(),
          eventName: undefined
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an undefined talkTitle', () => {
      const array = [
        {
          ..._createValidTalk(),
          talkTitle: undefined
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an undefined speakers', () => {
      const array = [
        {
          ..._createValidTalk(),
          speakers: undefined
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an empty date', () => {
      const array = [
        {
          ..._createValidTalk(),
          date: ''
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an empty eventType', () => {
      const array = [
        {
          ..._createValidTalk(),
          eventType: ''
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an empty eventName', () => {
      const array = [
        {
          ..._createValidTalk(),
          eventName: ''
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an empty talkTitle', () => {
      const array = [
        {
          ..._createValidTalk(),
          talkTitle: ''
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('return false if parameter is an array with one element and an empty speakers', () => {
      const array = [
        {
          ..._createValidTalk(),
          speakers: ''
        }
      ]
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
    it('If not an Array return false', () => {
      const notArray = 'This is not an array'
      // then
      expect(slide.verifyTalks(notArray)).toBe(false)
    })
    it('If undefined return false', () => {
      const notArray = undefined
      // then
      expect(slide.verifyTalks(notArray)).toBe(false)
    })
  })
})

function _createValidTalk () {
  return {
    date: '19/01/2021',
    universe: '',
    eventType: 'Conférence',
    eventName: 'Devoxx',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    speakers: 'Adrien Nortain',
    checked: true
  }
}
