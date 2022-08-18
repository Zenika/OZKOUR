const { google } = require('googleapis')
const connect = require('../connect')
const util = require('util')

async function listFileInFolder (folderId) {
  const auth = await connect.getAuthentication()
  const drive = google.drive({ version: 'v3', auth })
  const presentationsGet = util.promisify(drive.files.list).bind(drive.files)
  const { data } = await presentationsGet({ q: `'${folderId}' in parents and trashed = false` })
  const res = data.files.map((file) => {
    return { name: file.name, id: file.id }
  })
  return res
}

async function findIdOfFileByNameAndFolder (folderId, name) {
  const auth = await connect.getAuthentication()
  const drive = google.drive({ version: 'v3', auth })
  const presentationsGet = util.promisify(drive.files.list).bind(drive.files)
  const { data } = await presentationsGet({ q: `'${folderId}' in parents and trashed = false` })
  const res = data.files.find(file => {
    return file.name === name
  })
  return { name: res.name, id: res.id }
}

module.exports = {
  listFileInFolder,
  findIdOfFileByNameAndFolder
}
