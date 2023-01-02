
const driveWrapper = require('./driveWrapper')
const dateUtils = require('../../Utils/dateUtils')

const folderTalksId = process.env.GOOGLE_FOLDER_TALK_ID
const folderTalkEmailingId = process.env.GOOGLE_FOLDER_EMAILING_TALK_ID
const templateTalkEmailingId = process.env.GOOGLE_TEMPLATE_EMAILING_TALK_ID

const folderTrainingsId = process.env.GOOGLE_FOLDER_TRAINING_ID
const folderTrainingEmailingId = process.env.GOOGLE_FOLDER_TRAINING_ID
const templateTrainingEmailingId = process.env.GOOGLE_TEMPLATE_EMAILING_TRAINING_ID

async function getListFileTalksBetween2Dates (start, end) {
  const files = await driveWrapper.listFileInFolder(folderTalksId)
  const res = filterFilesBetween2Dates(start, end, files)
  return res
}

async function getIdOfTalkFileByYear (year) {
  const Filename = year + ' - Les Evénements et talks Zenika  (Zenika talks and events)'
  const res = await driveWrapper.findIdOfFileByNameAndFolder(folderTalksId, Filename)
  if (res === undefined) {
    throw (new Error('no file named :"' + Filename + '" found'))
  }
  return res.id
}

async function getIdOfTrainingFileByYear (year) {
  const Filename = year + ' - Les formations Zenika (Zenika trainings)'
  const res = await driveWrapper.findIdOfFileByNameAndFolder(folderTrainingsId, Filename)
  if (res === undefined) {
    throw (new Error('no file named :"' + Filename + '" found'))
  }
  return res.id
}

function filterFilesBetween2Dates (start, end, files) {
  const res = files.filter(file => {
    const fileNameWithoutYear = file.name.substring(4)
    if (fileNameWithoutYear === ' - Les Evénements et talks Zenika  (Zenika talks and events)') {
      const year = file.name.substring(0, 4)
      return dateUtils.isYearBetweenDates(year, start, end)
    } else {
      return false
    }
  })
  if (res?.length > 0) {
    return res
  } else {
    throw (new Error('no talk file for those dates in the folder'))
  }
}

async function copyDocument (type, name) {
  let fileId
  let parents
  switch (type) {
  case 'talk':
    fileId = templateTalkEmailingId
    parents = folderTalkEmailingId
    break
  case 'training':
    fileId = templateTrainingEmailingId
    parents = folderTrainingEmailingId
    break
  default:
    break
  }

  const idDocument = await driveWrapper.copyDocument(fileId, name, parents)

  return idDocument
}

module.exports = {
  getListFileTalksBetween2Dates,
  filterFilesBetween2Dates,
  getIdOfTalkFileByYear,
  getIdOfTrainingFileByYear,
  copyDocument
}
