const { google } = require('googleapis')
const util = require('util')
const connect = require('../connect')

async function updateDocument (documentId, requests) {
  const auth = await connect.getAuthentication()
  const docs = google.docs({ version: 'v1', auth })
  const updateDocument = util
    .promisify(docs.documents.batchUpdate)
    .bind(docs.documents)
  const { data } = await updateDocument({
    documentId,
    resource: {
      requests
    }
  })
  return data
}

module.exports = {
  updateDocument
}
