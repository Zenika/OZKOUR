const { getUrls } = require('../infrastructure/googledrive/driveWrapper')
const { CustomeError } = require('../Error/customeError')
const { selectTwoRandomsUrls } = require('./utils/selectTwoRandomsUrls')

async function selectUrls (auth) {
  try {
    const urls = await getUrls(auth)
    return selectTwoRandomsUrls(urls)
  } catch (e) {
    throw new CustomeError(
      'Error while trying to retrieved urls, please contact support service',
      400
    )
  }
}

module.exports = {
  selectUrls
}
