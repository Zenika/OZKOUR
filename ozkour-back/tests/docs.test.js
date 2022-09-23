const googleDocRepository = require('../infrastructure/googledocs/googleDocRepository')

const emailingOrganizer = require('../domain/emailingOrganizer')

describe('Verify data emailing', () => {
  describe('undefined value', () => {
    test.each([
      { property: 'date' },
      { property: 'eventName' },
      { property: 'talkTitle' },
      { property: 'speakers' }
    ])('should return false when $property of an element is undefined',
      ({ property }) => {
        const docTalks = [
          {
            ..._createValidTalk(),
            [property]: undefined
          }
        ]
        expect(emailingOrganizer.verifyTalkEmailing(docTalks)).toBe(false)
      }
    )
  })
  describe('empty string property', () => {
    test.each([
      { property: 'date' },
      { property: 'eventName' },
      { property: 'talkTitle' },
      { property: 'speakers' }
    ])('should return false when $property of an element is an empty string',
      ({ property }) => {
        const docTalks = [
          {
            ..._createValidTalk(),
            [property]: ''
          }
        ]
        expect(emailingOrganizer.verifyTalkEmailing(docTalks)).toBe(false)
      }
    )
  })
  describe('the talks are in a valid Array', () => {
    it('should return true if parameter is an array with one element', () => {
      const array = [_createValidTalk()]
      // then
      expect(emailingOrganizer.verifyTalkEmailing(array)).toBe(true)
    })
    it('should return false if parameter is an array with zero element', () => {
      const array = []
      // then
      expect(emailingOrganizer.verifyTalkEmailing(array)).toBe(false)
    })
  })
  describe('the talks are not in an array', () => {
    describe('the talks is a String', () => {
      it('should return false', () => {
        // given
        const notArray = 'This is not an array'
        // when
        const isNotAnArray = emailingOrganizer.verifyTalkEmailing(notArray)
        // then
        expect(isNotAnArray).toBe(false)
      })
    })
    describe('the talks are undefined', () => {
      it('should return false', () => {
        const notArray = undefined
        // then
        expect(emailingOrganizer.verifyTalkEmailing(notArray)).toBe(false)
      })
    })
  })
})

describe('Docs creation', () => {
  it('should return a JSON request to add a title to a document', () => {
    // given
    const title = 'Title'
    const index = 1
    // when
    const addTitleRequest = googleDocRepository.addTitle(title, index)
    // then
    expect(addTitleRequest).toMatchSnapshot()
  })
  it('should return a JSON request to add a talk to the doc without url', () => {
    // given
    const index = 10
    const titleTalk = 'Title'
    const speakers = 'speaker'
    const date = '11/03/2021'
    const eventName = 'eventName'
    // when
    const addTalksRequest = googleDocRepository.addTalkInEmailing(index, titleTalk, speakers, date, eventName)
    // then
    expect(addTalksRequest).toMatchSnapshot()
  })
  it('should return a JSON request to add a talk to the doc with url', () => {
    // given
    const index = 10
    const titleTalk = 'Title'
    const speakers = 'speaker'
    const date = '11/03/2021'
    const eventName = 'eventName'
    const url = 'https://example.com'
    // when
    const addTalksRequest = googleDocRepository.addTalkInEmailing(index, titleTalk, speakers, date, eventName, url)
    // then
    expect(addTalksRequest).toMatchSnapshot()
  })
})

function _createValidTalk () {
  return {
    date: '19/01/2021',
    universe: 'Universe 1',
    eventType: 'Conférence',
    eventName: 'Devoxx',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    speakers: 'Anne Imal',
    checked: true
  }
}
