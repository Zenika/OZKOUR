const emailingOrganizer = require('./emailingOrganizer')
const dateUtils = require('../Utils/dateUtils')
const { logger } = require('../logger')
class DocService {
  constructor (docServiceRepository, driveServiceRepository) {
    this.docServiceRepository = docServiceRepository
    this.driveServiceRepository = driveServiceRepository
  }

  async createEmailingDocs (talks) {
    const { mapUniverse: talksByUniverses, allTalkComplete } = emailingOrganizer.sortTalksEmailing(talks)
    const { date: talkeDate } = talks[0]
    const year = dateUtils.getYear(talkeDate)
    const month = dateUtils.convDateToMonthInLetter(talkeDate)
    const newFileName = year + '_' + month + '_' + ' emailing'
    const documentId = await this.driveServiceRepository.copyDocument('talk', newFileName)
    logger.verbose({
      message: `new document created named "${newFileName}" (with id : ${documentId})`
    })
    await this.docServiceRepository.removeTemplateTextEmailingTalk(documentId)
    logger.verbose({
      message: 'removed template text'
    })
    await this.docServiceRepository.addTextForTalkEmailing(documentId, talksByUniverses)
    const message = allTalkComplete ? 'Created !' : 'At least one talk is incomplete...'
    logger.verbose({
      message: 'add text for emailing document'
    })
    return this.docServiceRepository.getSuccessMessage(documentId, message)
  }

  async createEmailingTrainingDocs (trainings) {
    const { mapUniverse: trainingsByUniverses } = emailingOrganizer.sortTrainingsEmailing(trainings)
    const { date: trainingDate } = trainings[0]
    const year = dateUtils.getYear(trainingDate)
    const month = dateUtils.convDateToMonthInLetter(trainingDate)
    const newFileName = year + '_' + month + '_' + ' emailing_training'
    const documentId = await this.driveServiceRepository.copyDocument('training', newFileName)
    logger.verbose({
      message: `new document created named "${newFileName}" (with id : ${documentId})`
    })
    await this.docServiceRepository.removeTemplateTextEmailingTraining(documentId)
    logger.verbose({
      message: 'removed template text'
    })
    await this.docServiceRepository.addTextForTrainingEmailing(documentId, trainingsByUniverses)
    logger.verbose({
      message: 'add text for emailing training document'
    })
    return this.docServiceRepository.getSuccessMessage(documentId, 'Created !')
  }
}

module.exports = {
  DocService
}
