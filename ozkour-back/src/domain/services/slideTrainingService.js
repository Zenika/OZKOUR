const { logger } = require('../../logger')
const { trainingDataOrganizer } = require('../trainingOrganizer')

class SlideTrainingService {
  constructor (slideServiceRepository) {
    this.slideServiceRepository = slideServiceRepository
  }

  async createSlides (auth, training, template, imagesUrls, h) {
    if (!this.verifyTraining(training) && imagesUrls && template) {
      const dataOrganised = trainingDataOrganizer(training)

      const idTemplate =
        await this.slideServiceRepository.getCopySlideIdTraining(
          auth,
          template
        )
      logger.info({
        message: `id received for the new slide template :${idTemplate}`
      })
      if (idTemplate) {
        const copySlidePageElements =
          await this.slideServiceRepository.getCopySlidePageElements(
            auth,
            idTemplate,
            template
          )
        logger.info({
          message: `copy slide Elements received :${copySlidePageElements}`
        })
        if (copySlidePageElements && dataOrganised) {
          await this.slideServiceRepository.updateNewCopySlide(
            dataOrganised,
            auth,
            template,
            copySlidePageElements,
            imagesUrls
          )
        }
        return this.slideServiceRepository.getSuccessMessageTrainings(template)
      }
    } else {
      return h
        .response(
          'Données manquantes pour se connecter au service google, veuillez contacter le service support.'
        )
        .code(400)
    }
  }

  verifyTraining (training) {
    if (!Array.isArray(training) || training.length <= 0) {
      return false
    }
    return training.some(
      ({ date, universe, eventName }) =>
        Boolean(date) && Boolean(universe) && Boolean(eventName)
    )
  }
}

module.exports = {
  SlideTrainingService
}
