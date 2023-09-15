const { logger } = require('../../logger')
const { SlideService } = require('../../domain/services/slideService')
const { DocService } = require('../../domain/services/docsService')
const { sortArrayByKeyAndOrder } = require('../../domain/utils/arrayUtils')
const { getTalkOrTraining } = require('../getTrainingOrTalks')
const googleSlideRepository = require('../../infrastructure/googleslide/slideRepository')
const googleDocRepository = require('../../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../../infrastructure/googledrive/googleDriveRepository')
const { TALK_SHEET } = require('../utils/constantes')

module.exports = [
  {
    method: 'GET',
    path: '/talk',
    handler: async function (request, h) {
      logger.info({
        message: `request get Talks (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      return await getTalkOrTraining(request, TALK_SHEET, h)
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
