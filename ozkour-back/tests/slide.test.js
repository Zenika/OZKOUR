const slide = require('../google-api/slide')
const { presentationId, getSlides } = require('../infrastructure/googleslide/slideWrapper')
const wrapper = require('../google-api/slideService')

describe('Verify data slides', () => {
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
        expect(wrapper.verifyTalks(slideTalks)).toBe(false)
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
        expect(wrapper.verifyTalks(slideTalks)).toBe(false)
      }
    )
  })
  describe('the talks are in a valid Array', () => {
    it('should return true if parameter is an array with one element', () => {
      const array = [_createValidTalk()]
      // then
      expect(wrapper.verifyTalks(array)).toBe(true)
    })
    it('should return false if parameter is an array with zero element', () => {
      const array = []
      // then
      expect(wrapper.verifyTalks(array)).toBe(false)
    })
  })
  describe('the talks are not in an array', () => {
    describe('the talks is a String', () => {
      it('should return false', () => {
        // given
        const notArray = 'This is not an array'
        // when
        const isNotAnArray = wrapper.verifyTalks(notArray)
        // then
        expect(isNotAnArray).toBe(false)
      })
    })
    describe('the talks are undefined', () => {
      it('should return false', () => {
        const notArray = undefined
        // then
        expect(wrapper.verifyTalks(notArray)).toBe(false)
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
    const registerFieldDate = slide.addDateTextWithStyle(pageId, date, objectId, Y)
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
    const registerTable = slide.createTableWithStyleForAllEventsInDate(pageId, date, objectId, Y)
    // then
    expect(registerTable).toMatchSnapshot()
  })
  it('should return a JSON request to add an event to a table with style', () => {
    // given
    const dateId = 'dateId'
    const eventName = 'Dev Event'
    const IndexRowInTableToInsert = 1
    // when
    const registerEvent = slide.addEventNameWithStyleToTable(dateId, eventName, IndexRowInTableToInsert)
    // then
    expect(registerEvent).toMatchSnapshot()
  })
  it('should return a JSON request to add a talk to a table with style', () => {
    // given
    const dateId = 'dateId'
    const talkTitle = 'Talk about something'
    const IndexRowInTableToInsert = 1
    // when
    const registerTalkTitle = slide.addTalkTitleWithStyleToTable(dateId, talkTitle, IndexRowInTableToInsert)
    // then
    expect(registerTalkTitle).toMatchSnapshot()
  })
  it('should return a JSON request to add speakers to a table with style', () => {
    // given
    const dateId = 'dateId'
    const speakers = 'John Doe'
    const IndexRowInTableToInsert = 1
    // when
    const registerSpeakers = slide.addSpeakersWithStyleToTable(dateId, speakers, IndexRowInTableToInsert)
    // then
    expect(registerSpeakers).toMatchSnapshot()
  })
  it('should return a JSON request to add an image to a slide', () => {
    // given
    const pageId = 'pageId'
    const eventType = 'Conférence'
    const yNextElmt = 100
    // when
    const registerSpeakers = slide.createImage(pageId, eventType, yNextElmt)
    // then
    expect(registerSpeakers).toMatchSnapshot()
  })
})

// test d'integration a revoir
describe('Integration test on create a slide', () => {
  it('should generate expected Google Slide file', async () => {
    // given
    const talks = [_createValidTalk()]
    try {
      // when
      const res = await wrapper.createSlides(talks)
      const slides = await getSlides()
      // then
      expect(res).toStrictEqual({
        message: 'Created !',
        link: 'https://docs.google.com/presentation/d/' +
            presentationId +
            '/'
      })
      expect(JSON.stringify(slides[1])
        .replace(/"objectId":".*?",/g, '"objectId":"id",')
        .replace(/"speakerNotesObjectId":".*?"/g, '"speakerNotesObjectId":"id"')
        .replace(/"https:\/\/lh[1-9].googleusercontent.com\/.*?",/g, '"lien",')).toMatchSnapshot()
    } catch (e) {
      console.error(e)
      throw e
    }
  })
})

function _createValidTalk () {
  return {
    date: '19/01/2021',
    universe: '',
    eventType: 'Conférence',
    eventName: 'Devoxx',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    speakers: 'Anne Imal',
    checked: true
  }
}
