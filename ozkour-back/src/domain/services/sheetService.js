const { getTalk } = require('../../domain/talks-sheet')
const { getTraining } = require('../../domain/trainings-sheet')
const TRAINING_SHEET_CONST = 'training_sheet'
const TALK_SHEET_CONST = 'talk_sheet'

class SheetService {
  constructor (sheetServiceRepository) {
    this.sheetServiceRepository = sheetServiceRepository
  }

  async getDataSheets (startDate, endDate, auth, variables, h) {
    if (TRAINING_SHEET_CONST === variables) {
      return await getTraining(startDate, endDate, auth, variables)
    }
    if (TALK_SHEET_CONST === variables) {
      return await getTalk(startDate, endDate, auth, variables)
    }
    return h.response('Problème interne').code(400)
  }
}

module.exports = {
  SheetService
}
