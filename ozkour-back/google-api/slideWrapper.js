const { google } = require('googleapis')
const connect = require('./connect.js')

const presentationId = '1Mwzl0-13stcTZRn_0iyIJLZveuY80SW2cmv9p2Wgpug'

async function getSlides () {
  const auth = await connect.getAuthentication()
  const slides = google.slides({ version: 'v1', auth })
  const promiseSlides = new Promise((resolve, reject) => {
    slides.presentations.get(
      {
        presentationId
      },
      (err, res) => {
        if (err) reject(err.message)
        else resolve(res.data.slides)
      }
    )
  })
  return promiseSlides
}

async function sendRequest (requests) {
  const auth = await connect.getAuthentication()
  const slides = google.slides({ version: 'v1', auth })
  const promiseRequest = new Promise((resolve, reject) => {
    slides.presentations.batchUpdate(
      {
        presentationId,
        resource: {
          requests
        }
      },
      (err, res) => {
        if (err) reject(err.message)
        else resolve(res.data)
      }
    )
  })
  return promiseRequest
}

module.exports = {
  getSlides,
  sendRequest,
  presentationId
}
