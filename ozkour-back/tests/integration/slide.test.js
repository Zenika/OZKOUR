const googleSlideRepository = require('@/infrastructure/googleslide/googleSlideRepository')
const {
  presentationId,
  getSlides
} = require('@/infrastructure/googleslide/slideWrapper')
const { SlideService } = require('@/domain/services/slideService')
const connect = require('@/infrastructure/connect.js')

const slideServiceRepository = googleSlideRepository
const slideService = new SlideService(slideServiceRepository)

describe('Integration test slides', () => {
  describe('when creating a slide based on the template', () => {
    afterEach(async () => {
      await slideService.deleteLastSlide()
    })

    it('should generate expected Google Slide file', async () => {
      // given
      const talks = [_createValidTalk()]
      try {
        // when
        connect.getAuthentication()
        const res = await slideService.createSlides(talks)
        const slides = await getSlides()
        // then
        expect(res).toStrictEqual({
          message: 'Created !',
          link:
            'https://docs.google.com/presentation/d/' + presentationId + '/'
        })
        expect(
          JSON.stringify(slides[1])
            .replace(/"objectId":".*?",/g, '"objectId":"id",')
            .replace(
              /"speakerNotesObjectId":".*?"/g,
              '"speakerNotesObjectId":"id"'
            )
            .replace(
              /"https:\/\/lh[1-9].googleusercontent.com\/.*?",/g,
              '"lien",'
            )
            .replace(/"listId":".*?"/g, '"listId":"listId"')
            .replace(/"lists":{".*?"/g, '"lists":"lists"')
        ).toMatchSnapshot()
      } catch (e) {
        console.error(e)
        throw e
      }
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
    speakers: 'Anne Imal'
  }
}
