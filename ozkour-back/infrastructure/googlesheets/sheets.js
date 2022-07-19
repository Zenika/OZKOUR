const dayjs = require('dayjs')
const wrapper = require('./sheetWrapper')
const utils = require('../../Utils/dateUtils')
const customParseFormat = require('dayjs/plugin/customParseFormat')
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
  // const res = await connect.authMethode(getData, param)
  let tempDateStart = params.start
  const tempDateEnd = params.end
  const nbMonths = tempDateEnd.diff(tempDateStart, 'month')
  let res = []
  for (let i = 0; i <= nbMonths; i++) {
    const month = utils.convDateToMonthInLetter(tempDateStart)
    const year = dayjs(tempDateStart, 'DD/MM/YYYY').format('YYYY')
    const test = await wrapper.getTalks(month, year)
    res = res.concat(test)
    tempDateStart = tempDateStart.add(1, 'month')
  }
  return res
}

// /**
//  * Filter the talks between 2 dates
//  * @param {Array} talks the talks that need to be filtered
//  * @param {String} start the start of the date range (format='DD-MM-YYYY')
//  * @param {String} end the end of the date range (format='DD-MM-YYYY')
//  */
// function dateFilter (talks, start, end) {
//   const formatedDateStart = dayjs(start, 'DD-MM-YYYY')
//   const formatedDateEnd = dayjs(end, 'DD-MM-YYYY')
//   talks = talks.filter(function (talk) {
//     const dateTalk = dayjs(talk[4], 'DD-MM-YYYY')
//     return dateTalk.isSameOrAfter(formatedDateStart, 'day') && dateTalk.isSameOrBefore(formatedDateEnd, 'day')
//     // return formatedDateStart.isBefore(dateTalk.add(1, 'day'), 'day') && formatedDateEnd.isAfter(dateTalk.add(-1, 'day'), 'day')
//   })
//   return talks
// }

// function convertArrayToObject (arrayOfTalksArray) {
//   const arrayOfTalksObject = []
//   arrayOfTalksArray.forEach(([, eventType, eventName, universe, date, speakers, talkTitle]) => {
//     const value = {
//       date,
//       universe,
//       eventType,
//       eventName,
//       talkTitle,
//       speakers,
//       checked: true
//     }

//     arrayOfTalksObject.push(value)
//   })
//   return arrayOfTalksObject
// }

module.exports = {
  getTalkFromDate
}
