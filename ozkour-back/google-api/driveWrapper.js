const { google } = require('googleapis')
const connect = require('./connect.js')
const util = require('util')

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
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

module.exports = {
  listFileInFolder
}
