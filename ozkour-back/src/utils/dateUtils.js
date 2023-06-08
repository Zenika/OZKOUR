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
  const monthInLetter = dayjs(date, 'DD-MM-YYYY', 'fr').format('MMMM')

  // the month is in uppercase in the googlesheet
  return capitalizeFirstLetter(monthInLetter)
}

function convDateToMonthInLetterWithDeterminer (date) {
  const monthInLetter = dayjs(date, 'DD-MM-YYYY', 'fr').format('MMMM')
  switch (monthInLetter) {
  case 'avril':
  case 'août':
  case 'octobre':
    return "d'" + monthInLetter
  default:
    return 'de ' + monthInLetter
  }
}

function convDateAndDurationToDateIntervalInLetter (date, duration) {
  const monthFirstDayOfInterval = dayjs(date, 'DD-MM-YYYY', 'fr').format(
    'MMMM'
  )
  const dayFirstDayOfInterval = dayjs(date, 'DD-MM-YYYY', 'fr').format('DD')
  if (duration === 1) {
    return (
      'le ' + formatDay(dayFirstDayOfInterval) + ' ' + monthFirstDayOfInterval
    )
  }
  const monthLastDayOfInterval = dayjs(date, 'DD-MM-YYYY', 'fr')
    .add(duration - 1, 'days')
    .format('MMMM')
  const dayLastDayOfInterval = dayjs(date, 'DD-MM-YYYY', 'fr')
    .add(duration - 1, 'days')
    .format('DD')
  if (monthLastDayOfInterval !== monthFirstDayOfInterval) {
    return (
      'du ' +
      formatDay(dayFirstDayOfInterval) +
      ' ' +
      monthFirstDayOfInterval +
      ' au ' +
      formatDay(dayLastDayOfInterval) +
      ' ' +
      monthLastDayOfInterval
    )
  }
  if (duration === 2) {
    return (
      'les ' +
      formatDay(dayFirstDayOfInterval) +
      ' et ' +
      formatDay(dayLastDayOfInterval) +
      ' ' +
      monthFirstDayOfInterval
    )
  }
  return (
    'du ' +
    formatDay(dayFirstDayOfInterval) +
    ' au ' +
    formatDay(dayLastDayOfInterval) +
    ' ' +
    monthFirstDayOfInterval
  )
}

function formatDay (day) {
  if (day.charAt(0) === '0') {
    if (day.charAt(1) === '1') {
      return '1er'
    }
    return day.charAt(1)
  }
  return day
}

function isYearBetweenDates (year, start, end) {
  return dayjs(year).isBetween(dayjs(start), dayjs(end), 'year', '[]')
}

function displayFullDateWithWords (date) {
  return dayjs(date, 'DD-MM-YYYY', 'fr').format('DD MMMM YYYY')
}

function getYear (date) {
  return dayjs(date, 'DD/MM/YYYY').format('YYYY')
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  displayFullDateWithWords,
  convDateToMonthInLetter,
  convDateToMonthInLetterWithDeterminer,
  getYear,
  convDateAndDurationToDateIntervalInLetter,
  isYearBetweenDates
}
