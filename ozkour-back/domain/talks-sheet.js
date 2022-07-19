const dayjs = require('dayjs')
const { getTalkFromDate } = require('../infrastructure/googlesheets/sheets.js')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const getTalk = async (start, end = dayjs()) => {
  const formatedDateStart = dayjs(start)
  const formatedDateEnd = dayjs(end)
  const param = { start: formatedDateStart, end: formatedDateEnd }
  const res = await getTalkFromDate(param)
  return convertArrayToObject(dateFilter(res, formatedDateStart, formatedDateEnd))
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
  talks = talks.filter(function (talk) {
    const dateTalk = dayjs(talk[4], 'DD-MM-YYYY')
    return dateTalk.isSameOrAfter(formatedDateStart, 'day') && dateTalk.isSameOrBefore(formatedDateEnd, 'day')
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
  getTalk
}
