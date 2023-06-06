const { CustomeError } = require('../Error/customeError')
const { logger } = require('../logger')
const talkSheet = require('../domain/talks-sheet')
const trainingSheet = require('../domain/trainings-sheet')

const TRAINING_SHEET_CONST = 'training_sheet'
const TALK_SHEET_CONST = 'talk_sheet'

class SheetService {
  constructor (sheetServiceRepository) {
    this.sheetServiceRepository = sheetServiceRepository
  }

  async getDataSheets (startDate, endDate, auth, variables) {
    try {
      if (TRAINING_SHEET_CONST === variables) {
        return await trainingSheet.getTraining(
          startDate,
          endDate,
          auth,
          variables
        )
      }
      if (TALK_SHEET_CONST === variables) {
        return await talkSheet.getTalk(startDate, endDate, auth, variables)
      }
      throw new CustomeError(
        'Erreur lors de la connexion au service souhaité, veuillez contacter le service support',
        400
      )
    } catch (error) {
      logger.error({ message: error.messsage })
      throw error
    }
  }
}

module.exports = {
  SheetService
}
