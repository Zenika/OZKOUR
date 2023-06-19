const { logger } = require('../../logger')
const slideDataOrganizer = require('../quoiDe9Organizer')

class SlideService {
  constructor (slideServiceRepository) {
    this.slideServiceRepository = slideServiceRepository
  }

  async createSlides (talks) {
    if (!this.verifyTalks(talks)) {
      throw new Error('wrong format of talk for "quoi de 9"')
    }
    const dataOrganizedBySlide = slideDataOrganizer.clusterByDate(talks)
    logger.verbose({
      message: 'data sorted for slide'
    })
    const idTemplate = await this.slideServiceRepository.getIdSlideTemplate()
    logger.verbose({
      message: `id received for the slide template :${idTemplate}`
    })
    const unorderedPromises = []
    for (const dataOrganized of dataOrganizedBySlide) {
      try {
        const newIdPage = await this.copySlide(idTemplate)
        logger.verbose({
          message: `created new slide with id ${newIdPage}`
        })
        unorderedPromises.push(
          new Promise((resolve) => {
            this.deleteTemplateInfo(newIdPage)
              .then(this.addTableData(newIdPage, dataOrganized))
              .then(resolve())
          })
        )
      } catch (e) {
        logger.error(e)
      }
    }
    await Promise.all(unorderedPromises)
    logger.verbose({
      message: 'all slides have been created'
    })
    return this.slideServiceRepository.getSuccessMessage()
  }

  verifyTalks (talks) {
    if (!Array.isArray(talks) || talks.length <= 0) {
      return false
    }
    return talks.some(
      ({ date, eventType, eventName, talkTitle, speakers }) =>
        Boolean(date) &&
        Boolean(eventType) &&
        Boolean(eventName) &&
        Boolean(talkTitle) &&
        Boolean(speakers)
    )
  }

  async copySlide (idPage) {
    return this.slideServiceRepository.copySlide(idPage)
  }

  async deleteTemplateInfo (idPage) {
    return this.slideServiceRepository.deleteTemplateInfo(idPage)
  }

  async addTableData (idPage, data) {
    return this.slideServiceRepository.fillSlideWithData(idPage, data)
  }

  async deleteLastSlide () {
    return this.slideServiceRepository.deleteLastSlide()
  }
}

module.exports = {
  SlideService
}
