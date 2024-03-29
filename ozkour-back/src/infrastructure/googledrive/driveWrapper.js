const { google } = require('googleapis')
const connect = require('../connect')
const util = require('util')
const { logger } = require('../../logger')

const queryParametersSharedDrive = {
  driveId: process.env.DRIVE_ID_SHARED_DRIVE,
  supportsAllDrives: true,
  includeItemsFromAllDrives: true,
  corpora: 'drive'
}

async function listFileInFolder (folderId) {
  const auth = await connect.getAuthentication()
  const drive = google.drive({ version: 'v3', auth })
  const presentationsGet = util.promisify(drive.files.list).bind(drive.files)
  const { data } = await presentationsGet({
    q: `'${folderId}' in parents and trashed = false`,
    ...queryParametersSharedDrive
  })
  return data
}

async function findIdOfFileByNameAndFolder (folderId, name, auth) {
  try {
    const driveService = google.drive({ version: 'v3', auth })
    const { data } = await driveService.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      ...queryParametersSharedDrive
    })
    logger.info({ message: 'succed' })
    const res = data.files.find((file) => file.name === name)
    return { name: res.name, id: res.id }
  } catch (error) {
    logger.error({ message: 'Erreur pendant la récupértion des données' })
    throw error
  }
}

async function copyDocument (fileId, name, parents) {
  const auth = await connect.getAuthentication()
  const drive = google.drive({ version: 'v3', auth })
  const presentationsCopy = util.promisify(drive.files.copy).bind(drive.files)
  const { data } = await presentationsCopy({
    fileId,
    requestBody: {
      name,
      parents
    },
    ...queryParametersSharedDrive
  })
  return data.id
}

async function getUrls (auth) {
  const IMAGES_FOLDER_ID = process.env.IMAGES_FOLDER_ID
  try {
    const driveService = google.drive({ version: 'v3', auth })
    const fileResponse = await driveService.files.list({
      q: `mimeType='image/PNG' and parents='${IMAGES_FOLDER_ID}'`,
      fields: 'files(thumbnailLink)'
    })
    const arrayOfUrl = fileResponse.data.files
    return arrayOfUrl
  } catch (error) {
    logger.error({
      message: `error while trying to retrieved urls of the drive folder : ${IMAGES_FOLDER_ID}, (${error})`
    })
    throw error
  }
}

module.exports = {
  getUrls,
  listFileInFolder,
  copyDocument,
  findIdOfFileByNameAndFolder
}
