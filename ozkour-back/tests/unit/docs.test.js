const googleDocRepository = require('../../src/infrastructure/googledocs/googleDocRepository')

const emailingOrganizer = require('../../src/domain/emailingOrganizer')

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
  })
  describe('the talks are not in a valid array', () => {
    it('should return an error if parameter is an array with zero element', () => {
      const array = []
      // then
      try {
        emailingOrganizer.verifyTalkEmailing(array)
      } catch (e) {
        expect('' + e).toBe('Error: Can\'t create visual without talks')
      }
    })
    it('should return false if the talks are undefined', () => {
      const notArray = undefined
      // then
      try {
        emailingOrganizer.verifyTalkEmailing(notArray)
      } catch (e) {
        expect('' + e).toBe('Error: Can\'t create visual without talks')
      }
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
    const newTalk = {
      date: '11/03/2021',
      eventName: 'eventName',
      talkTitle: 'Title',
      speakers: 'speaker',
      complete: true
    }
    // when
    const addTalksRequest = googleDocRepository.addTalkInEmailing(index, newTalk)
    // then
    expect(addTalksRequest).toMatchSnapshot()
  })
  it('should return a JSON request to add a talk to the doc with url', () => {
    // given
    const index = 10
    const newTalk = {
      date: '11/03/2021',
      eventName: 'eventName',
      talkTitle: 'Title',
      speakers: 'speaker',
      url: 'https://example.com',
      complete: true
    }

    // when
    const addTalksRequest = googleDocRepository.addTalkInEmailing(index, newTalk)
    // then
    expect(addTalksRequest).toMatchSnapshot()
  })
  it('should return a JSON request to add a title in red to a document when the title is "Sans Univers"', () => {
    // given
    const title = 'Sans Univers'
    const index = 1
    // when
    const addTitleRequest = googleDocRepository.addTitle(title, index)
    // then
    expect(addTitleRequest).toMatchSnapshot()
  })
  it('should return a JSON request to add a talk to the doc in red when the talk is incomplete', () => {
    // given
    const index = 10
    const newTalk = {
      date: '11/03/2021',
      eventName: 'eventName',
      talkTitle: 'Title',
      speakers: '',
      url: 'https://example.com',
      complete: false
    }

    // when
    const addTalksRequest = googleDocRepository.addTalkInEmailing(index, newTalk)
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
