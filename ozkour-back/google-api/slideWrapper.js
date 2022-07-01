const { google } = require('googleapis')
const connect = require('./connect.js')
const util = require('util')

const presentationId = '1Mwzl0-13stcTZRn_0iyIJLZveuY80SW2cmv9p2Wgpug'

async function getSlides () {
  const auth = await connect.getAuthentication()
  const slides = google.slides({ version: 'v1', auth })
  const presentationsGet = util.promisify(slides.presentations.get).bind(slides.presentations)
  const { data } = await presentationsGet({ presentationId })
  return data.slides
}

async function sendRequest (requests) {
  const auth = await connect.getAuthentication()
  const slides = google.slides({ version: 'v1', auth })
  const presentationsBatch = util.promisify(slides.presentations.batchUpdate).bind(slides.presentations)
  const { data } = await presentationsBatch({
    presentationId,
    resource: {
      requests
    }
  })
  return data
}

module.exports = {
  getSlides,
  sendRequest,
  presentationId
}
