require('dotenv').config()
const { GoogleAuth } = require('google-auth-library')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/presentations', 'https://www.googleapis.com/auth/drive']

async function getAuthentication () {
  const auth = new GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: SCOPES
  })
  return auth.getClient()
}

module.exports = {
  getAuthentication
}
