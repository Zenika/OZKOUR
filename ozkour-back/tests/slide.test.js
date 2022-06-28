const slide = require('../google-api/slide')
describe('Verifier data slides', () => {
  describe('undefined value', () => {
    test.each([
      { property: 'date' },
      { property: 'eventName' },
      { property: 'eventType' },
      { property: 'talkTitle' },
      { property: 'speakers' }
    ])('should return false when $property of an element is undefined',
      ({ property }) => {
        const slideTalks = [
          {
            ..._createValidTalk(),
            [property]: undefined
          }
        ]
        expect(slide.verifyTalks(slideTalks)).toBe(false)
      }
    )
  })
  describe('empty string property', () => {
    test.each([
      { property: 'date' },
      { property: 'eventName' },
      { property: 'eventType' },
      { property: 'talkTitle' },
      { property: 'speakers' }
    ])('should return false when $property of an element is an empty string',
      ({ property }) => {
        const slideTalks = [
          {
            ..._createValidTalk(),
            [property]: ''
          }
        ]
        expect(slide.verifyTalks(slideTalks)).toBe(false)
      }
    )
  })
  describe('when the parameter is an array', () => {
    it('should return true if parameter is an array with one element', () => {
      const array = [_createValidTalk()]
      // then
      expect(slide.verifyTalks(array)).toBe(true)
    })
    it('should return false if parameter is an array with zero element', () => {
      const array = []
      // then
      expect(slide.verifyTalks(array)).toBe(false)
    })
  })
  describe('when the parameter is not an array', () => {
    describe('when the parameter is a String', () => {
      it('should return false', () => {
        // given
        const notArray = 'This is not an array'
        // when
        const isNotAnArray = slide.verifyTalks(notArray)
        // then
        expect(isNotAnArray).toBe(false)
      })
    })
    describe('when the parameter is undefined', () => {
      it('should return false', () => {
        const notArray = undefined
        // then
        expect(slide.verifyTalks(notArray)).toBe(false)
      })
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
