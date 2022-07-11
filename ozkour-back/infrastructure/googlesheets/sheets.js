const { google } = require('googleapis')
const connect = require('../googleslide/connect.js')
const dayjs = require('dayjs')
const utilitary = require('../../Utils/dateUtils')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

/**
 * Get all the talks between 2 dates
 * @param {String} start the start of the date range
 * @param {String} end the end of the date range
 */
async function getTalkFromDate (param) {
  const res = await connect.authMethode(getData, param)
  return res
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {Object} params the parameters passed by the connect
 */
async function getData (auth, params) {
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1e50uVl_wAseWD8PDyAeNS9dRNhiq0k_WVyJr2fL9SeE', // TO DO use a variable instead of a link
    range: `${utilitary.convDateToMonthInLetter(params.start)} ${dayjs(params.start, 'DD/MM/YYYY').format('YYYY')}!A2:H`
  })
  return dateFilter(res.data.values, params.start, params.end)
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

module.exports = {
  getTalkFromDate,
  dateFilter
}
