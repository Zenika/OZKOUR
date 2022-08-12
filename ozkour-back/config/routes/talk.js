// @ts-check

const { getTalk } = require('../../domain/talks-sheet')

const { SlideService } = require('../../domain/slideService')
const googleSlideRepository = require('../../infrastructure/googleslide/googleSlideRepository')

module.exports = [
  {
    method: 'GET',
    path: '/talk',
    handler: function (request, h) {
      return getTalk(request.query.start, request.query.end)
    }
  },

  {
    method: 'POST',
    path: '/selected-talks',
    handler: async function (request, h) {
      try {
        const talks = request.payload
        /** @type {import ("../../domain/type/slide").Slide} */
        const slideServiceRepository = googleSlideRepository
        const slideService = new SlideService(slideServiceRepository)
        const res = await slideService.createSlides(talks)
        return h.response(res).code(200)
      } catch (e) {
        console.log(e)
        return h.response(e).code(500)
      }
    }
  }
]
