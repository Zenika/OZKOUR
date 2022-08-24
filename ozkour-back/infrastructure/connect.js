require('dotenv').config()
const { GoogleAuth } = require('google-auth-library')
const serviceAccount = require('../config/auth/service_account.js')
const fs = require('fs')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/presentations', 'https://www.googleapis.com/auth/drive']

function createAuth () {
  const serviceAccountParsed = JSON.stringify(serviceAccount)
    .replace('{"serviceAccount":{', '{')
    .replace('}}', '}')
    .replaceAll('\\\\', '\\')
  fs.writeFileSync('./config/auth/service_account.json', serviceAccountParsed)
}

async function getAuthentication () {
  const auth = new GoogleAuth({
    keyFile: './config/auth/service_account.json',
    scopes: SCOPES
  })

  // Auth client Object
  return auth.getClient()
}

module.exports = {
  getAuthentication,
  createAuth
}
