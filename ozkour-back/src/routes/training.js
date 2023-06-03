// @ts-check
const { logger } = require('../logger')
const { getTraining } = require('../domain/trainings-sheet')
const { DocService } = require('../domain/docsService')
const googleDocRepository = require('../infrastructure/googledocs/googleDocRepository')
const googleDriveRepository = require('../infrastructure/googledrive/googleDriveRepository')
const googleSheetDriveRepository = require("../infrastructure/googlesheets/sheetWrapper")
const { sortArrayByKeyAndOrder } = require('../Utils/arrayUtils')
const { SheetService } = require('../domain/sheetService')
const { CustomeError, sendCustomError } = require('../Error/customeError')
// const connect = require('../')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


module.exports = [
  {
    method: 'GET',
    path: '/training',
    handler: async function (request, h) {
      logger.info({
        message: `request get trainings (${request.path}) with parameters '${request.query.start}' and '${request.query.end}'`
      })
    try {
      const {start,end}=request.query
      validateDates(start, end)
      logger.verbose({message : 'dates validées'})
      const sheetService = new SheetService(googleSheetDriveRepository)
      const res = await sheetService.getDataSheets(start, end)
      return h.response(res).code(200)
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

const validateDates =(start, end)=>{

if (!start && end) throw new CustomeError('La date de début n\'est pas définie',400);

if (!end && start) throw new CustomeError('La date de fin n\'est pas définie',400);

if (!start && !end) throw new CustomeError('Les dates de début et de fin ne sont pas défininies ',400);

if (!dayjs(start,'YYYY-MM-DD').isValid()) throw new CustomeError('Le format de la date de début est incorrect',400);

if (!dayjs(end,'YYYY-MM-DD').isValid()) throw new CustomeError('Le format de la date de fin est incorrect',400);

}
