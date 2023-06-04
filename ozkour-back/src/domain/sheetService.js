const { CustomeError } = require('../Error/customeError')
const { logger } = require('../logger')
const talkSheet = require('./talks-sheet')
const trainingSheet = require('./trainings-sheet')

const TRAINING_SHEET_CONST = "training_sheet"
const TALK_SHEET_CONST = "talk_sheet"

class SheetService {
  constructor (sheetServiceRepository) {
    this.sheetServiceRepository = sheetServiceRepository
  }
async getDataSheets(startDate, endDate, auth, TRAINING_SHEET, TALK_SHEET){
try {

	if (TRAINING_SHEET_CONST === TRAINING_SHEET) 
	return await trainingSheet.getTraining(startDate, endDate, auth)

	if (TALK_SHEET_CONST === TALK_SHEET) 
	return await trainingSheet.getTraining(startDate, endDate, auth)

	else throw new CustomeError("Erreur lors de la connexion au service souhaité, veuillez contacter le service support", 400)

} catch (error) {
	throw error
}
}
}

module.exports = {
	SheetService
  }

