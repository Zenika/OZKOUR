const { google } = require('googleapis')
const connect = require('../connect')
const { Talk } = require('../../domain/model/talk')

async function getTalks (month, year, spreadsheetId) {
  const auth = await connect.getAuthentication()
  const sheets = google.sheets({ version: 'v4', auth })
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${month} ${year}!A2:H`
    })
    const talkArray = []
    res.data.values.forEach(([_agency, universe, eventType, eventName, date, _hour, speakers, talkTitle]) => {
      talkArray.push(new Talk(date, universe, eventType, eventName, talkTitle, speakers))
    })
    return talkArray
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getTalks
}
