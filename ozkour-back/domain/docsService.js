const emailingOrganizer = require('./emailingOrganizer')
const dateUtils = require('../Utils/dateUtils')

class DocService {
  constructor (docServiceRepository, driveServiceRepository) {
    this.docServiceRepository = docServiceRepository
    this.driveServiceRepository = driveServiceRepository
  }

  async createEmailingDocs (talks) {
    const talksByUniverses = emailingOrganizer.sortTalksEmailing(talks)
    const { date: talkeDate } = talks[0]
    const newFileName = dateUtils.convDateToMonthInLetter(talkeDate) + ' ' + dateUtils.getYear(talkeDate) + ' emailing'
    const documentId = await this.driveServiceRepository.copyDocument('emailing', newFileName)
    await this.docServiceRepository.removeTemplateText(documentId)
    await this.docServiceRepository.addTextForEmailing(documentId, talksByUniverses)

    return this.docServiceRepository.getSuccessMessage(documentId)
  }
}

module.exports = {
  DocService
}
