const { logger } = require('../logger')
const { SlideService } = require('../services/slideService')
const { DocService } = require('../services/docsService')
const { sortArrayByKeyAndOrder } = require('../utils/arrayUtils')
const { sendCustomError } = require('../Error/customeError')
const googleSlideRepository = require('../infrastructure/googleslide/googleSlideRepository')
const googleDocRepository = require('../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../infrastructure/googledrive/googleDriveRepository')
const commun = require('../controller/common')
const { TALK_SHEET } = require('../constantes/constantes')

const INDEX_INCOMPLETE_DATA = 1

module.exports = [
  {
    method: 'GET',
    path: '/talk',
    handler: async function (request, h) {
      logger.info({
        message: `request get Talks (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      try {
        const { start, end } = request.query
        const res = await commun.getTalkOrTraining(start, end, TALK_SHEET)
        if (res[INDEX_INCOMPLETE_DATA].length > 0) {
          return h.response(res).code(206)
        } else {
          return h.response(res).code(200)
        }
      } catch (error) {
        return sendCustomError(error, h)
      }
    }
  },
  {
    method: 'POST',
    path: '/talk/quoiDeNeuf',
    handler: async function (request, h) {
      logger.info({
        message: `request generate quoi de 9 (${request.path})`
      })
      const talks = request.payload
      /** @type {import ("../domain/type/slide").SlideRepository} */
      const slideServiceRepository = googleSlideRepository
      const slideService = new SlideService(slideServiceRepository)
      const res = await slideService.createSlides(talks)
      return h.response(res)
    }
  },
  {
    method: 'POST',
    path: '/talk/emailing',
    handler: async function (request, h) {
      logger.info({
        message: `request generate emaling (${request.path})`
      })
      const talks = request.payload
      /** @type {import ("../domain/type/doc").DocRepository} */
      const docServiceRepository = googleDocRepository
      /** @type {import ("../domain/type/drive").DriveRepository} */
      const driveServiceRepository = googleDriveRepository
      const docService = new DocService(
        docServiceRepository,
        driveServiceRepository
      )
      const res = await docService.createEmailingDocs(talks)
      return h.response(res)
    }
  },
  {
    method: 'POST',
    path: '/talk/sort',
    handler: async function (request, h) {
      const order = request.query.orderIsAscending === 'true'
      logger.info({
        message: `request sort ${order ? 'ascending' : 'descending'} 
        talks by ${request.query.key}(${request.path})`
      })
      const talks = request.payload
      const res = sortArrayByKeyAndOrder(talks, request.query.key, order)
      return h.response(res)
    }
  }
]
