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

async function getTrainings () {
  const auth = await connect.getAuthentication()
  const sheets = google.sheets({ version: 'v4', auth })

  const spreadsheetId = '12_8zEfeeAo6WaQNkmjVLxrI39h3EDtmfThhYyMc3qC0'
  const sheetName = 'Promotion training'
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A2:F`
    })
    const trainingArray = []
    res.data.values.forEach(([trainingTitle, universe, duration, price, url, date]) => {
      const newTraining = {
        date,
        trainingTitle,
        universe,
        duration,
        price,
        url
      }
      trainingArray.push(new Training(newTraining))
    })
    return trainingArray
  } catch (e) {
    logger.error({
      message: `error while trying to retrieved trainings for ${sheetName} on file ${spreadsheetId} (${e})`
    })
  }
}

module.exports = {
  getTalks,
  getTrainings
}
