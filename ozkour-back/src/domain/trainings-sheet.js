const dayjs = require('dayjs')
const { logger } = require('../logger')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const sheetsWrapper = require('../infrastructure/googlesheets/sheetWrapper')
const { getIdOfTrainingFileByYear } = require('../infrastructure/googledrive/googleDriveRepository')
const utils = require('../Utils/dateUtils')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

/**
 * Get all the talks between 2 dates
 * @param {String} start the start of the date range
 * @param {String} end the end of the date range
 */
async function getTrainingFromDate () { // a voir mais peut-etre des changement à faire
  const res = await sheetsWrapper.getTrainings()
  return res
}

const getTraining = async (start, end = dayjs()) => {
  const formatedDateStart = dayjs(start)
  const formatedDateEnd = dayjs(end)
  // const param = { start: formatedDateStart, end: formatedDateEnd }
  const res = await getTrainingFromDate()
  return dateFilter(res, formatedDateStart, formatedDateEnd)
}

/**
 * Filter the talks between 2 dates
 * @param {Array} talks the talks that need to be filtered
 * @param {String} start the start of the date range (format='DD-MM-YYYY')
 * @param {String} end the end of the date range (format='DD-MM-YYYY')
 */
function dateFilter (trainings, start, end) {
  const formatedDateStart = dayjs(start, 'DD-MM-YYYY')
  const formatedDateEnd = dayjs(end, 'DD-MM-YYYY')
  trainings = trainings.filter(function ({ date }) {
    if (!date) return false
    const dateTraining = dayjs(date, 'DD-MM-YYYY')
    console.log(dateTraining)
    console.log(dateTraining.isSameOrAfter(formatedDateStart, 'day') && dateTraining.isSameOrBefore(formatedDateEnd, 'day'))
    return dateTraining.isSameOrAfter(formatedDateStart, 'day') && dateTraining.isSameOrBefore(formatedDateEnd, 'day')
  })
  return trainings
}

module.exports = {
  getTraining,
  dateFilter
}
