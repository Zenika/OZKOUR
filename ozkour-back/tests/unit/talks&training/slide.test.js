const googleSlideRepository = require('@/infrastructure/googleslide/slideRepository')
const { SlideService } = require('@/domain/services/slideService')

const slideServiceRepository = googleSlideRepository
const slideService = new SlideService(slideServiceRepository)

describe('Verify data slides', () => {
  describe('undefined value', () => {
    test.each([
      { property: 'date' },
      { property: 'eventName' },
      { property: 'eventType' },
      { property: 'talkTitle' },
      { property: 'speakers' }
    ])(
      'should return false when $property of an element is undefined',
      ({ property }) => {
        const slideTalks = [
          {
            ..._createValidTalk(),
            [property]: undefined
          }
        ]
        expect(slideService.verifyTalks(slideTalks)).toBe(false)
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
    ])(
      'should return false when $property of an element is an empty string',
      ({ property }) => {
        const slideTalks = [
          {
            ..._createValidTalk(),
            [property]: ''
          }
        ]
        expect(slideService.verifyTalks(slideTalks)).toBe(false)
      }
    )
  })
  describe('the talks are in a valid Array', () => {
    it('should return true if parameter is an array with one element', () => {
      const array = [_createValidTalk()]
      // then
      expect(slideService.verifyTalks(array)).toBe(true)
    })
    it('should return false if parameter is an array with zero element', () => {
      const array = []
      // then
      expect(slideService.verifyTalks(array)).toBe(false)
    })
  })
  describe('the talks are not in an array', () => {
    describe('the talks is a String', () => {
      it('should return false', () => {
        // given
        const notArray = 'This is not an array'
        // when
        const isNotAnArray = slideService.verifyTalks(notArray)
        // then
        expect(isNotAnArray).toBe(false)
      })
    })
    describe('the talks are undefined', () => {
      it('should return false', () => {
        const notArray = undefined
        // then
        expect(slideService.verifyTalks(notArray)).toBe(false)
      })
    })
  })
})

describe('Slides creation', () => {
  it('should return a JSON request to add a date field in a slide', () => {
    // given
    const pageId = 'pageId'
    const date = '11/03/2021'
    const objectId = 'objectId'
    const Y = 100
    // when
    const registerFieldDate = googleSlideRepository.addDateTextWithStyle(
      pageId,
      date,
      objectId,
      Y
    )
    // then
    expect(registerFieldDate).toMatchSnapshot()
  })
  it('should return a JSON request to add a table with style for the date', () => {
    // given
    const pageId = 'pageId'
    const date = '11/03/2021'
    const objectId = 'objectId'
    const Y = 100
    // when
    const registerTable =
      googleSlideRepository.createTableWithStyleForAllEventsInDate(
        pageId,
        date,
        objectId,
        Y
      )
    // then
    expect(registerTable).toMatchSnapshot()
  })
  it('should return a JSON request to add an event to a table with style', () => {
    // given
    const dateId = 'dateId'
    const eventName = 'Dev Event'
    const IndexRowInTableToInsert = 1
    // when
    const registerEvent = googleSlideRepository.addEventNameWithStyleToTable(
      dateId,
      eventName,
      IndexRowInTableToInsert
    )
    // then
    expect(registerEvent).toMatchSnapshot()
  })
  it('should return a JSON request to add a talk to a table with style', () => {
    // given
    const dateId = 'dateId'
    const talkTitle = 'Talk about something'
    const IndexRowInTableToInsert = 1
    // when
    const registerTalkTitle =
      googleSlideRepository.addTalkTitleWithStyleToTable(
        dateId,
        talkTitle,
        IndexRowInTableToInsert
      )
    // then
    expect(registerTalkTitle).toMatchSnapshot()
  })
  it('should return a JSON request to add speakers to a table with style', () => {
    // given
    const dateId = 'dateId'
    const speakers = 'John Doe'
    const IndexRowInTableToInsert = 1
    // when
    const registerSpeakers = googleSlideRepository.addSpeakersWithStyleToTable(
      dateId,
      speakers,
      IndexRowInTableToInsert
    )
    // then
    expect(registerSpeakers).toMatchSnapshot()
  })
})

function _createValidTalk () {
  return {
    date: '19/01/2021',
    universe: '',
    eventType: 'Conférence',
    eventName: 'Devoxx',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    speakers: 'Anne Imal'
  }
}
