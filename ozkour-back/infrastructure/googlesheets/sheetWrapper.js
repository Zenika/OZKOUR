const { google } = require('googleapis')
const connect = require('../connect')
const { Talk } = require('../../domain/model/talk')

async function getTalks (month, year, spreadsheetId) {
  const auth = await connect.getAuthentication()
  const sheets = google.sheets({ version: 'v4', auth })
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${month} ${year}!A2:I`
    })
    const talkArray = []
    res.data.values.forEach(([_agency, universe, eventType, eventName, date, _hour, speakers, talkTitle, link]) => {
      const newTalk = {
        date,
        universe,
        eventType,
        eventName,
        talkTitle,
        speakers,
        link
      }
      talkArray.push(new Talk(newTalk))
    })
    return talkArray
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getTalks
}
