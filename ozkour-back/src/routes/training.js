// @ts-check
const { logger } = require('../logger')
const { DocService } = require('../domain/docsService')
const googleDocRepository = require('../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../infrastructure/googledrive/googleDriveRepository')
const googleSheetDriveRepository = require("../infrastructure/googlesheets/sheetWrapper")
const { sortArrayByKeyAndOrder } = require('../Utils/arrayUtils')
const { SheetService } = require('../domain/sheetService')
const { CustomeError, sendCustomError } = require('../Error/customeError')
const connect = require('../infrastructure/connect')
const {validateDates} = require("../Utils/validateDates")
const {
  TRAINING_SHEET
} = require("../constantes/constantes");

const INDEX_INCOMPLETE_DATA = 1;

module.exports = [
  {
    method: 'GET',
    path: '/training',
    handler: async function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
    try {
      const auth = await connect.getAuthentication()
      if(!auth) {
      logger.error({message : "connexion échouée!"})
      throw new CustomeError("Vous n\'êtes pas autorisés à vous connecter, veuillez contacter le service support!", 401)
      } else {
      logger.info({message : "connexion réussite!"})
      const {start,end}=request.query
      validateDates(start, end)
      logger.verbose({message : 'dates validées'})
      const sheetService = new SheetService(googleSheetDriveRepository)
      const res = await sheetService.getDataSheets(start, end, auth, TRAINING_SHEET)
      if(res[INDEX_INCOMPLETE_DATA].length > 0) {
      return h.response(res).code(206)}
      else {
      return h.response(res).code(200)}}
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