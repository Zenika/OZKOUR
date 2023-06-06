const { logger } = require('../logger')
const { SheetService } = require('../services/sheetService')
const connect = require('../infrastructure/connect')
const {validateDates} = require("../utils/validateDatesUtils")
const { CustomeError } = require('../Error/customeError')
const googleSheetDriveRepository = require("../infrastructure/googlesheets/sheetWrapper")

const getTalkOrTraining = async (start, end, variable)=>{
    try {
		const auth = await connect.getAuthentication()
		if(!auth) {
		logger.error({message : "connexion échouée!"})
		throw new CustomeError("Vous n\'êtes pas autorisés à vous connecter, veuillez contacter le service support!", 401)
		} else {
		logger.info({message : "connexion réussite!"})
		validateDates(start, end)
		logger.verbose({message : 'dates validées'})
		const sheetService = new SheetService(googleSheetDriveRepository)
		return await sheetService.getDataSheets(start, end, auth, variable)
		}
	  } catch (error) {
		throw error
	  }
}

module.exports = {
getTalkOrTraining
}