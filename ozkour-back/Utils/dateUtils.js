const dayjs = require('dayjs')
require('dayjs/locale/fr')
const customParseFormat = require('dayjs/plugin/customParseFormat')

function convDateToMonthInLetter (date) {
  // the format used in the the google sheets is invalid with dayjs
  // format of date used in google sheets : 'DD/MM/YYYY'
  // format of date expected by dayjs : 'YYYY/MM/DD'
  dayjs.extend(customParseFormat)
  const formatedDate = dayjs(date, 'DD-MM-YYYY', 'fr').format('MMMM')

  // the month is in uppercase in the googlesheet
  return formatedDate
}

function displayFullDateWithWords (date) {
  dayjs.extend(customParseFormat)
  return dayjs(date, 'DD-MM-YYYY', 'fr').format('DD MMMM YYYY')
}

module.exports = {
  displayFullDateWithWords,
  convDateToMonthInLetter
}
