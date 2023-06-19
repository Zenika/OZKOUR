const { logger } = require('../logger')
const { SheetService } = require('../domain/services/sheetService')
const { getAuthentication } = require('../infrastructure/connect')
const googleSheetDriveRepository = require('../infrastructure/googlesheets/sheetWrapper')
const {
  validateAndTransformeDates
} = require('../ui/utils/validateDatesUtils')
const { sendCustomError } = require('../Error/customeError')

async function getTalkOrTraining (request, variable, h) {
  try {
    const { start, end } = request.query
    const validatedAndTransformedDates = validateAndTransformeDates(start, end)
    const auth = await getAuthentication()
    if (!auth) {
      logger.error({ message: 'connexion échouée' })
      return h.response('Connexion échouée aux services Google').code(400)
    } else {
      logger.info({ message: 'connexion et dates validées' })
      const sheetService = new SheetService(googleSheetDriveRepository)
      const response = await sheetService.getDataSheets(
        validatedAndTransformedDates.start,
        validatedAndTransformedDates.end,
        auth,
        variable,
        h
      )
      if (response.warn.length === 0) {
        return h.response(response.res).code(200)
      } else {
        return h.response(response).code(206)
      }
    }
  } catch (error) {
    return sendCustomError(error, h)
  }
}

module.exports = {
  getTalkOrTraining
}
