const { logger } = require('../logger')
const { DriveService } = require('../domain/services/driveService')
const { getAuthentication } = require('../infrastructure/connect')
const googleDriveRepository = require('../infrastructure/googledrive/driveWrapper')
const { sendCustomError } = require('../Error/customeError')

async function createSlidesTrainings (request, variable, h) {
  try {
    const auth = await getAuthentication()
    if (!auth) {
      logger.error({ message: 'connexion échouée' })
      return h.response('Connexion échouée aux services Google').code(400)
    } else {
      logger.info({ message: 'connexion réussite' })
      const driveService = new DriveService(googleDriveRepository)
      const imageUrls = await driveService.getUrls(auth)
      if (imageUrls) {
        return imageUrls
      }
    }
  } catch (error) {
    return sendCustomError(error, h)
  }
}

module.exports = {
  createSlidesTrainings
}
