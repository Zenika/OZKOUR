const { logger } = require('../logger')
const { DriveService } = require('../domain/services/driveService')
const {
  SlideTrainingService
} = require('../domain/services/slideTrainingService')
const { getAuthentication } = require('../infrastructure/connect')
const googleDriveRepository = require('../infrastructure/googledrive/driveWrapper')
const googleSlideRepository = require('../infrastructure/googleslide/slideRepository')
const { sendCustomError } = require('../Error/customeError')

async function createSlidesTrainings (request, template, h) {
  try {
    const training = request.payload
    const auth = await getAuthentication()
    if (!auth) {
      logger.error({ message: 'connexion échouée' })
      return h.response('Connexion échouée aux services Google').code(400)
    } else {
      logger.info({ message: 'connexion réussite' })
      const driveService = new DriveService(googleDriveRepository)
      const imageUrls = await driveService.getUrls(auth)
      const slideServiceRepository = googleSlideRepository
      const slideTrainingService = new SlideTrainingService(
        slideServiceRepository
      )
      const response = await slideTrainingService.createSlides(
        auth,
        training,
        template,
        imageUrls
      )
      if (response) {
        return h.response(response).code(200)
      }
    }
  } catch (error) {
    return sendCustomError(error, h)
  }
}

module.exports = {
  createSlidesTrainings
}
