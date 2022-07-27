const fs = require('fs').promises
const readline = require('readline')
const { google } = require('googleapis')
require('dotenv').config()
const credentials = require('../config/auth/credentials')
const { token: googleToken } = require('../config/auth/token')

const {
  client_id: clientId,
  client_secret: clientSecret,
  redirect_uris: redirectUris
} = credentials.web

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/presentations', 'https://www.googleapis.com/auth/drive']

/**
 * Execute all the functions used to authenticate
 */
function auth () {
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(credentials)
}

/**
 * Create an OAuth2 client with the given credentials
 * @param {Object} credentials The authorization client credentials.
 */
function authorize () {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUris[0]
  )

  // Check if we have previously stored a token.
  if (!googleToken.access_token) {
    return getNewToken(oAuth2Client)
    // the access token should be generated and should be move to env variables
  }
  oAuth2Client.setCredentials(googleToken)
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getNewToken (oAuth2Client) {
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = 'config/auth/token.json'
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error(
          'Error while trying to retrieve access token',
          err
        )
      }
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
    })
  })
}

/**
 * Create an OAuth2 using the Token, then execute the callback and return the result of the callback
 * @param {getEventsCallback} callback The callback for the authorized client.
 * @param {Object} params the parameters used in the callback
 */
async function authMethode (callback, params) {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUris[0]
  )

  oAuth2Client.setCredentials(googleToken)
  const res = await callback(oAuth2Client, params)
  return res
}

async function getAuthentication () {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUris[0]
  )

  oAuth2Client.setCredentials(googleToken)
  return oAuth2Client
}

module.exports = {
  auth,
  authorize,
  authMethode,
  getAuthentication
}
