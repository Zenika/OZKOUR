// @ts-check
const { logger } = require('../logger')
const { DocService } = require('../services/docsService')
const { sortArrayByKeyAndOrder } = require('../utils/arrayUtils')
const { sendCustomError } = require('../Error/customeError')
const googleDocRepository = require('../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../infrastructure/googledrive/googleDriveRepository')
const commun = require('../controller/common')
const { TRAINING_SHEET } = require('../constantes/constantes')

const INDEX_INCOMPLETE_DATA = 1

module.exports = [
  {
    method: 'GET',
    path: '/training',
    handler: async function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      try {
        const { start, end } = request.query
        const res = await commun.getTalkOrTraining(start, end, TRAINING_SHEET)
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
    path: '/training/emailing',
    handler: async function (request, h) {
      logger.info({
        message: `request generate emaling (${request.path})`
      })
      const trainings = request.payload
      /** @type {import ("../domain/type/doc").DocRepository} */
      /** @type {import ("../domain/type/drive").DriveRepository} */
      const docServiceRepository = googleDocRepository
      const driveServiceRepository = googleDriveRepository
      const docService = new DocService(
        docServiceRepository,
        driveServiceRepository
      )
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
        message: `request sort ${
          order ? 'ascending' : 'descending'
        } training by ${request.query.key}(${request.path})`
      })
      const trainings = request.payload
      const res = sortArrayByKeyAndOrder(trainings, request.query.key, order)
      return h.response(res)
    }
  }
]
