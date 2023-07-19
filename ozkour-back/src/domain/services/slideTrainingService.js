const { logger } = require('../../logger')

class SlideTrainingService {
  constructor (slideServiceRepository) {
    this.slideServiceRepository = slideServiceRepository
  }

  async createSlides (auth, training, template, imagesUrls) {
    try {
      if (!this.verifyTraining(training) && imagesUrls && template) {
        const idTemplate =
          await this.slideServiceRepository.getCopySlideIdTraining(
            auth,
            template
          )
        if (idTemplate) {
          logger.info({
            message: `id received for the new slide template :${idTemplate}`
          })
          return this.slideServiceRepository.getSuccessMessageTrainings(
            template
          )
        }
      } else {
        throw new Error('wrong format of training for the template')
      }
    } catch (error) {
      logger.error({ message: error.message })
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
