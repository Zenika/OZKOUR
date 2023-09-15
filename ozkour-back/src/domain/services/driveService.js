const { selectUrls } = require('../urls')
class DriveService {
  constructor (driveServiceRepository) {
    this.driveServiceRepository = driveServiceRepository
  }

  async getUrls (auth) {
    return await selectUrls(auth)
  }
}

module.exports = {
  DriveService
}
