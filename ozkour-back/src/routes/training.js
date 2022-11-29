// @ts-check
const { logger } = require('../logger')
const { getTraining } = require('../domain/trainings-sheet')
const { DocService } = require('../domain/docsService')
const googleDocRepository = require('../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../infrastructure/googledrive/googleDriveRepository')
const { sortArrayByKeyAndOrder } = require('../Utils/arrayUtils')

module.exports = [
  {
    method: 'GET',
    path: '/training',
    handler: function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      return getTraining(request.query.start, request.query.end)
    }
  },
  {
    method: 'POST',
    path: '/training/emailing',
    handler: async function (request, h) {
      logger.info({
        message: `request generate emaling (${request.path})`
      })
      const trainings = request.payload
      /** @type {import ("../domain/type/doc").DocRepository} */
      const docServiceRepository = googleDocRepository
      /** @type {import ("../domain/type/drive").DriveRepository} */
      const driveServiceRepository = googleDriveRepository
      const docService = new DocService(docServiceRepository, driveServiceRepository)
      const res = await docService.createEmailingTrainingDocs(trainings)
      return h.response(res)
    }
  },
  {
    method: 'POST',
    path: '/training/sort',
    handler: async function (request, h) {
      const order = request.query.orderIsAscending === 'true'
      logger.info({
        message: `request sort ${order ? 'ascending' : 'descending'} training by ${request.query.key}(${request.path})`
      })
      const trainings = request.payload
      const res = sortArrayByKeyAndOrder(trainings, request.query.key, order)
      return h.response(res)
    }
  }
]
