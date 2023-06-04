const { google } = require('googleapis')
const connect = require('../connect')
const { Talk } = require('../../domain/model/talk')
const { Training } = require('../../domain/model/training')
const { logger } = require('../../logger')

async function getTalks (month, year, spreadsheetId) {
  const auth = await connect.getAuthentication()
  const sheets = google.sheets({ version: 'v4', auth })
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${month} ${year}!A2:I`
    })
    const talkArray = []
    res.data.values.forEach(([_agency, universe, eventType, eventName, date, _hour, speakers, talkTitle, url]) => {
      const newTalk = {
        date,
        universe,
        eventType,
        eventName,
        talkTitle,
        speakers,
        url
      }
      talkArray.push(new Talk(newTalk))
    })
    return talkArray
  } catch (e) {
    logger.error({
      message: `error while trying to retrieved talks for ${month} ${year} on file ${spreadsheetId} (${e})`
    })
  }
}

async function getTrainings (auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_TRAINING_FILE_SHEET_ID
  const sheetName = 'Training'
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A7:F`
    })
    const trainingArray = []
    const findFirstIndex  = parseInt(res.data.range.match(/\d+/)[0])
    res.data.values.forEach(([trainingTitle, universe, duration, price, link, date], index) => {
      const newTraining = {
        trainingTitle,
        universe,
        duration, 
        price,
        link,
        date,
        indexLine : findFirstIndex + index 
      }
     if( date !== undefined) trainingArray.push(new Training(newTraining))
    })
    return trainingArray
  } catch (error) {
    logger.error({
      message: `error while trying to retrieved trainings for ${sheetName} on file ${spreadsheetId} (${error})`
    })
    throw error
  }
}

module.exports = {
  getTalks,
  getTrainings
}
