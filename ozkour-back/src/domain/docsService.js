const emailingOrganizer = require('./emailingOrganizer')
const dateUtils = require('../Utils/dateUtils')
const { logger } = require('../logger')
class DocService {
  constructor (docServiceRepository, driveServiceRepository) {
    this.docServiceRepository = docServiceRepository
    this.driveServiceRepository = driveServiceRepository
  }

  async createEmailingDocs (talks) {
    const talksByUniverses = emailingOrganizer.sortTalksEmailing(talks)
    const { date: talkeDate } = talks[0]
    const year = dateUtils.getYear(talkeDate)
    const month = dateUtils.convDateToMonthInLetter(talkeDate)
    const newFileName = year + '_' + month + '_' + ' emailing'
    const documentId = await this.driveServiceRepository.copyDocument('emailing', newFileName)
    logger.verbose({
      message: `new document created named "${newFileName}" (with id : ${documentId})`
    })
    await this.docServiceRepository.removeTemplateText(documentId)
    logger.verbose({
      message: 'removed template text'
    })
    await this.docServiceRepository.addTextForEmailing(documentId, talksByUniverses)
    logger.verbose({
      message: 'add text for emailing document'
    })
    return this.docServiceRepository.getSuccessMessage(documentId)
  }
}

module.exports = {
  DocService
}
