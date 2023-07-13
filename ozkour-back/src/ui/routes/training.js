// @ts-check
const { logger } = require('../../logger.js')
const { DocService } = require('../../domain/services/docsService')
const { sortArrayByKeyAndOrder } = require('../../domain/utils/arrayUtils')
const googleDocRepository = require('../../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../../infrastructure/googledrive/googleDriveRepository')
const { getTalkOrTraining } = require('../getTrainingOrTalks')
const { createSlidesTrainings } = require('../createSlidesTrainings.js')
const {
  TRAINING_SHEET,
  TRAINING_WITH_US,
  TRAINING_WITH_US_GREEN,
  FORMEZ_VOUS
} = require('../utils/constantes')

module.exports = [
  {
    method: 'GET',
    path: '/training',
    handler: async function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      return await getTalkOrTraining(request, TRAINING_SHEET, h)
    }
  },
  {
    method: 'POST',
    path: '/training/Train-with-us',
    handler: async function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      return await createSlidesTrainings(request, TRAINING_WITH_US, h)
    }
  },
  {
    method: 'POST',
    path: '/training/Train-with-us-green',
    handler: async function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      return await createSlidesTrainings(request, TRAINING_WITH_US_GREEN, h)
    }
  },
  {
    method: 'POST',
    path: '/training/Formez-vous',
    handler: async function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
      return await createSlidesTrainings(request, FORMEZ_VOUS, h)
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
      /** @type {import ("../../domain/type/doc").DocRepository} */
      /** @type {import ("../../domain/type/drive").DriveRepository} */
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
