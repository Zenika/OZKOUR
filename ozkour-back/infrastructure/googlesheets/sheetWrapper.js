const { google } = require('googleapis')
const connect = require('../connect')

const spreadsheetId = '1e50uVl_wAseWD8PDyAeNS9dRNhiq0k_WVyJr2fL9SeE'

async function getData (month, year) {
  const auth = await connect.getAuthentication()
  const sheets = google.sheets({ version: 'v4', auth })
  try {
    console.log(month, year)
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId, // TO DO use a variable instead of a link
      range: `${month} ${year}!A2:H`
      // range: `${utilitary.convDateToMonthInLetter(params.start)} ${dayjs(params.start, 'DD/MM/YYYY').format('YYYY')}!A2:H`
    })
    return res.data.values
  } catch (e) {
    console.log(e)
  }

  // return dateFilter(res.data.values, params.start, params.end)
}

module.exports = {
  getData
}
