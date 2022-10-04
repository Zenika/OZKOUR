const slideDataOrganizer = require('./quoiDe9Organizer')

class SlideService {
  constructor (slideServiceRepository) {
    this.slideServiceRepository = slideServiceRepository
  }

  async createSlides (talks) {
    if (!this.verifyTalks(talks)) {
      console.log('error')
      throw (new Error('error : wrong format'))
    }
    const dataOrganizedBySlide = slideDataOrganizer.clusterByDate(talks)
    const idTemplate = await this.slideServiceRepository.getIdSlideTemplate()
    const unorderedPromises = []
    for (const dataOrganized of dataOrganizedBySlide) {
      const newIdPage = await this.copySlide(idTemplate)
      unorderedPromises.push(this.deleteTemplateInfo(newIdPage).then(() => this.addTableData(newIdPage, dataOrganized)).catch(e => console.log(e)))
    }
    await Promise.all(unorderedPromises)
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
    return await this.slideServiceRepository.copySlide(idPage)
  }

  async deleteTemplateInfo (idPage) {
    return await this.slideServiceRepository.deleteTemplateInfo(idPage)
  }

  async addTableData (idPage, data) {
    return await this.slideServiceRepository.fillSlideWithData(idPage, data)
  }
}

module.exports = {
  SlideService
}
