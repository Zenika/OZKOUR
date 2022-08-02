const dayjs = require('dayjs')
require('dayjs/locale/fr')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.locale('fr')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

function convDateToMonthInLetter (date) {
  // the format used in the the google sheets is invalid with dayjs
  // format of date used in google sheets : 'DD/MM/YYYY'
  // format of date expected by dayjs : 'YYYY/MM/DD'
  const formatedDate = dayjs(date, 'DD-MM-YYYY', 'fr').format('MMMM')

  // the month is in uppercase in the googlesheet
  return capitalizeFirstLetter(formatedDate)
}

function isYearBetweenDates (year, start, end) {
  return dayjs(year).isBetween(dayjs(start), dayjs(end), 'year', '[]')
}

function displayFullDateWithWords (date) {
  return dayjs(date, 'DD-MM-YYYY', 'fr').format('DD MMMM YYYY')
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  displayFullDateWithWords,
  convDateToMonthInLetter,
  isYearBetweenDates
}
