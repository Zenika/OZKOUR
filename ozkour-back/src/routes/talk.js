// @ts-check

const { getTalk } = require('../domain/talks-sheet')

const { SlideService } = require('../domain/slideService')
const { DocService } = require('../domain/docsService')
const googleSlideRepository = require('../infrastructure/googleslide/googleSlideRepository')
const googleDocRepository = require('../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../infrastructure/googledrive/googleDriveRepository')

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
    path: '/talk/quoiDeNeuf',
    handler: async function (request, h) {
      try {
        const talks = request.payload
        /** @type {import ("../domain/type/slide").SlideRepository} */
        const slideServiceRepository = googleSlideRepository
        const slideService = new SlideService(slideServiceRepository)
        const res = await slideService.createSlides(talks)
        return h.response(res)
      } catch (e) {
        console.error(e)
      }
    }
  },
  {
    method: 'POST',
    path: '/talk/emailing',
    handler: async function (request, h) {
      try {
        const talks = request.payload
        /** @type {import ("../domain/type/doc").DocRepository} */
        const docServiceRepository = googleDocRepository
        /** @type {import ("../domain/type/drive").DriveRepository} */
        const driveServiceRepository = googleDriveRepository
        const docService = new DocService(docServiceRepository, driveServiceRepository)
        const res = await docService.createEmailingDocs(talks)
        return h.response(res)
      } catch (e) {
        console.error(e)
      }
    }
  }
]
