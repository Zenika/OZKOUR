const { google } = require('googleapis')
const { Talk } = require('../../domain/model/talk')
const { Training } = require('../../domain/model/training')
const { logger } = require('../../logger')

async function getTalks (month, year, spreadsheetId, auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${month} ${year}!A2:I`
    })
    const talkArray = []
    res.data.values.forEach(
      (
        [
          _agency,
          universe,
          eventType,
          eventName,
          date,
          _hour,
          speakers,
          talkTitle,
          url
        ],
        index
      ) => {
        const newTalk = {
          date,
          universe,
          eventType,
          eventName,
          talkTitle,
          speakers,
          url,
          indexLine: 2 + index
        }
        talkArray.push(new Talk(newTalk))
      }
    )
    return talkArray
  } catch (e) {
    logger.error({
      message: `error while trying to retrieved talks for ${month} ${year} on file ${spreadsheetId} (${e})`
    })
    throw e
  }
}

async function getTrainings (auth, h) {
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_TRAINING_FILE_SHEET_ID
  const sheetName = 'Training'
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A7:F`
    })
    const trainingArray = []
    res.data.values.forEach(
      ([title, universe, duration, price, url, date], index) => {
        const newTraining = {
          title,
          universe,
          duration,
          price,
          url,
          date,
          indexLine: 7 + index
        }
        trainingArray.push(new Training(newTraining))
      }
    )
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
