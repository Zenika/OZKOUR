const { google } = require('googleapis')
// const util = require('util')
const connect = require('../connect')

async function updateDocument (documentId, requests) {
  const auth = await connect.getAuthentication()
  const docs = google.docs({ version: 'v1', auth })
  docs.documents.batchUpdate({
    documentId,
    resource: {
      requests
    }
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    else { console.log('ok', res) }
  })
}

module.exports = {
  updateDocument
}
