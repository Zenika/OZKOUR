const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const { logger } = require('../logger')
dayjs.extend(customParseFormat)
const sheetsWrapper = require('../infrastructure/googlesheets/sheetWrapper')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const { CustomeError } = require('../Error/customeError')
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
const utilsCluster = require('../utils/veryfiedCompletData')
const utilsArray = require('../utils/filterArrayByDateUtils')

const getTraining = async (start, end, auth, variables) => {
  try {
    const formatedDateStart = dayjs(start).format('DD/MM/YYYY')
    const formatedDateEnd = dayjs(end).format('DD/MM/YYYY')

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
