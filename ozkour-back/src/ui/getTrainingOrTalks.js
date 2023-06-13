const { logger } = require('../logger')
const { SheetService } = require('../services/sheetService')
const connect = require('../infrastructure/connect')
const { CustomeError } = require('../Error/customeError')
const googleSheetDriveRepository = require('../infrastructure/googlesheets/sheetWrapper')
const { sendCustomError } = require('../Error/customeError')
const { validateDates } = require('../ui/utils/validateDatesUtils')

const INDEX_INCOMPLETE_DATA = 1

async function getTalkOrTraining (request, variable, h) {
  try {
    const { start, end } = request.query
    validateDates(start, end)
    const auth = await connect.getAuthentication()
    if (!auth) {
      logger.error({ message: 'connexion échouée!' })
      throw new CustomeError(
        "Vous n'êtes pas autorisés à vous connecter, veuillez contacter le service support!",
        401
      )
    } else {
      logger.info({ message: 'connexion et dates validées' })
      const sheetService = new SheetService(googleSheetDriveRepository)
      const res = await sheetService.getDataSheets(start, end, auth, variable)
      if (res[INDEX_INCOMPLETE_DATA] || res.length === 0) {
        return h.response(res).code(206)
      } else {
        return h.response(res).code(200)
      }
    }
  } catch (error) {
    logger.error({ message: error.message })
    return sendCustomError(error, h)
  }
}

module.exports = {
  getTalkOrTraining
}
