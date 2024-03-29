const { getTrainings } = require('../infrastructure/googlesheets/sheetWrapper')
const { dateAndCompletDataFilter } = require('./utils/veryfiedCompletData')
const { CustomeError } = require('../Error/customeError')

const getTraining = async (start, end, auth, variables) => {
  try {
    const training = await getTrainings(auth)
    return dateAndCompletDataFilter(training, variables, start, end)
  } catch (e) {
    throw new CustomeError(
      'Error while trying to retrieved trainings data from google sheet, please contact support service',
      400
    )
  }
}

module.exports = {
  getTraining
}
