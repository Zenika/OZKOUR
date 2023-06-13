const { logger } = require('../logger')
const sheetsWrapper = require('../infrastructure/googlesheets/sheetWrapper')
const { CustomeError } = require('../Error/customeError')
const utilsCluster = require('../utils/veryfiedCompletData')
const utilsArray = require('../utils/filterArrayByDateUtils')

const getTraining = async (start, end, auth, variables) => {
  try {
    const formatedDateStart = start
    const formatedDateEnd = end

    const validateDateStart = dayjs(
      formatedDateStart,
      'DD/MM/YYYY',
      true
    ).isValid()
    const validateEndStart = dayjs(
      formatedDateEnd,
      'DD/MM/YYYY',
      true
    ).isValid()

    if (!validateDateStart || !validateEndStart) {
      throw new CustomeError('Erreur pendant la transformation des dates', 500)
    } else {
      const training = await sheetsWrapper.getTrainings(auth)
      return utilsArray.dateFilter(
        utilsCluster.verifyedCompletetData(training, variables),
        formatedDateStart,
        formatedDateEnd
      )
    }
  } catch (error) {
    logger.error({ message: error.message })
    throw error
  }
}

module.exports = {
  getTraining
}
