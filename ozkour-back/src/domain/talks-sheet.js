const dayjs = require('dayjs')
const { logger } = require('../logger')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const sheetsWrapper = require('../infrastructure/googlesheets/sheetWrapper')
const { getIdOfTalkFileByYear } = require('../infrastructure/googledrive/googleDriveRepository')
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
async function getTalkFromDate (params) {
  let tempDateStart = params.start
  const tempDateEnd = params.end
  const nbMonths = tempDateEnd.diff(tempDateStart, 'month')
  let res = []
  let yearSheetId = utils.getYear(tempDateStart)
  let spreadsheetId = await getIdOfTalkFileByYear(yearSheetId)
  for (let i = 0; i <= nbMonths; i++) {
    const month = utils.convDateToMonthInLetter(tempDateStart)
    const year = utils.getYear(tempDateStart)
    if (year !== yearSheetId) { // update the id of the file if we changed the year
      yearSheetId = year
      spreadsheetId = await getIdOfTalkFileByYear(yearSheetId)
    }
    const talkFromMonth = await sheetsWrapper.getTalks(month, year, spreadsheetId)
    res = res.concat(talkFromMonth)
    tempDateStart = tempDateStart.add(1, 'month')
  }
  logger.verbose({
    message: `talk data between ${params.start} and ${params.end}retrieved`
  })
  logger.debug({
    message: 'talk recieved :' + res.map(talk => talk.toString()).join('\n')
  })
  return res
}

const getTalk = async (start, end = dayjs()) => {
  const formatedDateStart = dayjs(start)
  const formatedDateEnd = dayjs(end)
  const param = { start: formatedDateStart, end: formatedDateEnd }
  const res = await getTalkFromDate(param)
  return dateFilter(res, formatedDateStart, formatedDateEnd)
}

/**
 * Filter the talks between 2 dates
 * @param {Array} talks the talks that need to be filtered
 * @param {String} start the start of the date range (format='DD-MM-YYYY')
 * @param {String} end the end of the date range (format='DD-MM-YYYY')
 */
function dateFilter (talks, start, end) {
  const formatedDateStart = dayjs(start, 'DD-MM-YYYY')
  const formatedDateEnd = dayjs(end, 'DD-MM-YYYY')
  talks = talks.filter(function ({ date }) {
    const dateTalk = dayjs(date, 'DD-MM-YYYY')
    return dateTalk.isSameOrAfter(formatedDateStart, 'day') && dateTalk.isSameOrBefore(formatedDateEnd, 'day')
  })
  return talks
}

module.exports = {
  getTalk,
  dateFilter
}