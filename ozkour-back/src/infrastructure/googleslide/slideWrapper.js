const { google } = require('googleapis')
const connect = require('../connect.js')
const util = require('util')
const { logger } = require('../../logger.js')
const presentationId = process.env.GOOGLE_SLIDE_LINK

async function getSlides () {
  const auth = await connect.getAuthentication()
  const slides = google.slides({ version: 'v1', auth })
  const presentationsGet = util
    .promisify(slides.presentations.get)
    .bind(slides.presentations)
  const { data } = await presentationsGet({ presentationId })
  return data.slides
}

async function sendRequest (requests) {
  const auth = await connect.getAuthentication()
  const slides = google.slides({ version: 'v1', auth })
  const presentationsBatch = util
    .promisify(slides.presentations.batchUpdate)
    .bind(slides.presentations)
  const { data } = await presentationsBatch({
    presentationId,
    resource: {
      requests
    }
  })
  return data
}

const sendRequestTraining = async (auth, requests, presentationId) => {
  try {
    const slidesService = google.slides({ version: 'v1', auth })
    const { data } = await slidesService.presentations.batchUpdate({
      presentationId,
      resource: { requests }
    })
    return data
  } catch (error) {
    logger.error({ message: `${error}` })
    throw error
  }
}

const getNewSlidePagesElements = async (auth, newSlideId, presentationId) => {
  try {
    const slidesService = google.slides({ version: 'v1', auth })
    const getNewSlide = await slidesService.presentations.pages.get({
      presentationId,
      pageObjectId: newSlideId
    })
    const allPageElements = getNewSlide.data.pageElements
    return allPageElements
  } catch (error) {
    logger.error({ message: `${error}` })
    throw error
  }
}

module.exports = {
  getSlides,
  sendRequest,
  sendRequestTraining,
  getNewSlidePagesElements,
  presentationId
}
