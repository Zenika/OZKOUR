const dayjs = require('dayjs')
const wrapper = require('./sheetWrapper')
const utils = require('../../Utils/dateUtils')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

/**
 * Get all the talks between 2 dates
 * @param {String} start the start of the date range
 * @param {String} end the end of the date range
 */
async function getTalkFromDate (params) {
  // const res = await connect.authMethode(getData, param)
  const month = utils.convDateToMonthInLetter(params.start)
  const year = dayjs(params.start, 'DD/MM/YYYY').format('YYYY')
  const res = await wrapper.getData(month, year)
  return convertArrayToObject(dateFilter(res, params.start, params.end))
}

/**
 * Filter the talks between 2 dates
 * @param {String} talks the talks that need to be filtered
 * @param {String} start the start of the date range (format='DD-MM-YYYY')
 * @param {String} end the end of the date range (format='DD-MM-YYYY')
 */
function dateFilter (talks, start, end) {
  const formatedDateStart = dayjs(start, 'DD-MM-YYYY')
  const formatedDateEnd = dayjs(end, 'DD-MM-YYYY')
  talks = talks.filter(function (talk) {
    const dateTalk = dayjs(talk[4], 'DD-MM-YYYY')
    return formatedDateStart.isBefore(dateTalk.add(1, 'day'), 'day') && formatedDateEnd.isAfter(dateTalk.add(-1, 'day'), 'day')
  })
  return talks
}

function convertArrayToObject (arrayOfTalksArray) {
  const arrayOfTalksObject = []
  arrayOfTalksArray.forEach(([, eventType, eventName, universe, date, speakers, talkTitle]) => {
    const value = {
      date,
      universe,
      eventType,
      eventName,
      talkTitle,
      speakers,
      checked: true
    }

    arrayOfTalksObject.push(value)
  })
  return arrayOfTalksObject
}

module.exports = {
  getTalkFromDate,
  dateFilter,
  convertArrayToObject
}
