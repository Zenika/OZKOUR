const dayjs = require('dayjs')
const { logger } = require('../logger')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const { dateAndCompletDataFilter } = require('./utils/veryfiedCompletData')
const sheetsWrapper = require('../infrastructure/googlesheets/sheetWrapper')
const { CustomeError } = require('../Error/customeError')
const {
  getIdOfTalkFileByYear
} = require('../infrastructure/googledrive/googleDriveRepository')
const utils = require('./utils/dateUtils')
dayjs.extend(customParseFormat)

async function getTalkFromDate (params, auth) {
  try {
    let tempDateStart = params.start
    const tempDateEnd = params.end
    const nbMonths = tempDateEnd.diff(tempDateStart, 'month')
    let res = []
    let yearSheetId = utils.getYear(tempDateStart)
    let spreadsheetId = await getIdOfTalkFileByYear(yearSheetId, auth)
    for (let i = 0; i <= nbMonths; i++) {
      const month = utils.convDateToMonthInLetter(tempDateStart)
      const year = utils.getYear(tempDateStart)
      if (year !== yearSheetId) {
        yearSheetId = year
        spreadsheetId = await getIdOfTalkFileByYear(yearSheetId, auth)
      }
      const talkFromMonth = await sheetsWrapper.getTalks(
        month,
        year,
        spreadsheetId,
        auth
      )
      res = res.concat(talkFromMonth)
      tempDateStart = tempDateStart.add(1, 'month')
    }
    logger.verbose({
      message: `talk data between ${params.start} and ${params.end}retrieved`
    })
    logger.debug({
      message:
        'talk recieved :' + res.map((talk) => talk.toString()).join('\n')
    })
    return res
  } catch (error) {
    logger.error({ message: error.message })
    throw error
  }
}

const getTalk = async (start, end, auth, variables) => {
  try {
    const reformatStartdate = dayjs(start, 'DD/MM/YYYY').format('YYYY-MM-DD')
    const reformatEnddate = dayjs(end, 'DD/MM/YYYY').format('YYYY-MM-DD')

    const formatedDateStart = dayjs(reformatStartdate)
    const formatedDateEnd = dayjs(reformatEnddate)

    if (!formatedDateStart || !formatedDateEnd) {
      throw new CustomeError('Erreur pendant la transformation des dates', 500)
    } else {
      const param = { start: formatedDateStart, end: formatedDateEnd }
      const talks = await getTalkFromDate(param, auth)
      return dateAndCompletDataFilter(talks, variables, start, end)
    }
  } catch (error) {
    logger.error({ message: error.message })
    throw error
  }
}

module.exports = {
  getTalk
}
