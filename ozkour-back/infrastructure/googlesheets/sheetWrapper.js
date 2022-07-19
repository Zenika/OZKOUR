const { google } = require('googleapis')
const connect = require('../connect')
const { Talk } = require('../../domain/model/talk')

const spreadsheetId = '1e50uVl_wAseWD8PDyAeNS9dRNhiq0k_WVyJr2fL9SeE'

async function getTalks (month, year) {
  const auth = await connect.getAuthentication()
  const sheets = google.sheets({ version: 'v4', auth })
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId, // TO DO use a variable instead of a link
      range: `${month} ${year}!A2:H`
    })
    const talkArray = []
    res.data.values.forEach(([_, eventType, eventName, universe, date, speakers, talkTitle]) => {
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
