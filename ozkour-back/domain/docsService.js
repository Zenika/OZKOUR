const emailingOrganizer = require('./emailingOrganizer')
const dateUtils = require('../Utils/dateUtils')

class DocService {
  constructor (docServiceRepository, driveServiceRepository) {
    this.docServiceRepository = docServiceRepository
    this.driveServiceRepository = driveServiceRepository
  }

  async createEmailingDocs (talks) {
    if (!emailingOrganizer.verifyTalkEmailing(talks)) {
      console.log('error')
      throw (new Error('error : wrong format'))
    }
    const talksByUniverses = emailingOrganizer.triTalksEmailing(talks)
    const newFileName = dateUtils.convDateToMonthInLetter(talks[1].date) + ' ' + dateUtils.getYear(talks[1].date) + ' emailing'
    const documentId = await this.driveServiceRepository.copyDocument('emailing', newFileName)
    await this.docServiceRepository.removeTemplateText(documentId)
    await this.docServiceRepository.addTextForEmailing(documentId, talksByUniverses)

    // await Promise.all(unorderedPromises)
    return this.docServiceRepository.getSuccessMessage(documentId)
  }
}

module.exports = {
  DocService
}
