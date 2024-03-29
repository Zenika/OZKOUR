const { v4: uuidv4 } = require('uuid')
const dateUtils = require('../../domain/utils/dateUtils')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const slideDataOrganizer = require('@/domain/quoiDe9Organizer')
const {
  getSlides,
  sendRequest,
  sendRequestTraining,
  presentationId,
  getNewSlidePagesElements
} = require('./slideWrapper')
dayjs.extend(customParseFormat)
const { logger } = require('../../logger')
const {
  TRAINING_WITH_US,
  TRAINING_WITH_US_GREEN,
  FORMEZ_VOUS,
  QUOI_DE_NEUF
} = require('../../ui/utils/constantes')

const PRESENTATION_TRAINING_ID = process.env.PRESENTATION_FILE_TRAINING_ID
const PRESENTATION_TALKS_ID = process.env.PRESENTATION_FILE_TALKS_ID
const TRAIN_WITH_US_SLIDE_ID = process.env.SLIDE_TEMPLATE_TRAIN_WITH_US_ID
const FORMEZ_VOUS_SLIDE_ID = process.env.SLIDE_TEMPLATE_FORMEZ_VOUS_ID
const TRAIN_WITH_US_GREEN_SLIDE_ID = process.env.SLIDE_TRAIN_WITH_US_GREEN_ID

const INDEX_FIRST_IMAGE_TO_REPLACE_TRAINING_WITH_US = 8
const INDEX_SECOND_IMAGE_TO_REPLACE_TRAINING_WITH_US = 9
const INDEX_FIRST_IMAGE_TO_REPLACE_FORMEZ_VOUS = 9
const INDEX_SECOND_IMAGE_TO_REPLACE_FORMEZ_VOUS = 9

const pictogram = new Map()
pictogram.set(
  'Conférence',
  'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20conference.png'
)
pictogram.set(
  'Matinale',
  'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20matinale.png'
)
pictogram.set(
  'Meetup',
  'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20meetup.png'
)
pictogram.set(
  'NightClazz',
  'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20nightclazz.png'
)
pictogram.set(
  'Webinar',
  'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20webinar.png'
)

const defaultForegroundColor = {
  opaqueColor: {
    rgbColor: {
      blue: 1.0,
      green: 1.0,
      red: 1.0
    }
  }
}

const ImagePromiseList = []

const unit = 'PT'

const greyForegroundColor = {
  opaqueColor: {
    rgbColor: {
      blue: 0.7,
      green: 0.7,
      red: 0.7
    }
  }
}

function getSuccessMessage () {
  return {
    message: 'Created !',
    link: 'https://docs.google.com/presentation/d/' + presentationId + '/'
  }
}

const getSuccessMessageTrainings = (template) => {
  const presentationId = getIdOftheFilePresentation(template)
  return {
    message: 'Created !',
    link: 'https://docs.google.com/presentation/d/' + presentationId + '/'
  }
}

/**
 * generate the requests to add a date text to a slide
 * @param {string} the id of the page where the elements need to be deleted
 * @param {string} the date we need to add to the slide
 * @param {int} the place (only axis y) where we need put the date
 * @return {Array} return an array of the requests
 */
function addDateTextWithStyle (idPage, date, objectId, Y) {
  const pt350 = {
    magnitude: 350,
    unit
  }
  const pt30 = {
    magnitude: slideDataOrganizer.slideSpacing.DATE,
    unit
  }

  return [
    {
      // create a shape to put text in it
      createShape: {
        objectId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: idPage,
          size: {
            height: pt30,
            width: pt350
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 140,
            translateY: Y,
            unit
          }
        }
      }
    },
    {
      insertText: {
        // add date to the text
        objectId,
        insertionIndex: 0,
        text: date
      }
    },
    {
      updateTextStyle: {
        // add style to the date
        objectId,
        style: {
          underline: true,
          fontFamily: 'Nunito',
          fontSize: {
            magnitude: 24,
            unit
          },
          foregroundColor: defaultForegroundColor
        },
        fields: 'underline,foregroundColor,fontFamily,fontSize'
      }
    },
    {
      // center the date
      updateParagraphStyle: {
        objectId,
        style: {
          alignment: 'CENTER'
        },
        fields: 'alignment'
      }
    }
  ]
}

function createTableWithStyleForAllEventsInDate (idPage, dateId, Y, data) {
  const objectId = dateId + '-table'
  // calculate size of Table
  let nbTalkForDate = data.length
  for (let i = 0; i < data.length; i++) {
    nbTalkForDate += data[i].talks.length
  }
  return [
    {
      createTable: {
        objectId,
        elementProperties: {
          pageObjectId: idPage,
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateY: Y,
            translateX: 20,
            unit
          }
        },
        rows: nbTalkForDate,
        columns: 2
      }
    },
    {
      updateTableBorderProperties: {
        objectId,
        borderPosition: 'ALL',
        tableBorderProperties: {
          tableBorderFill: {
            solidFill: {
              color: {
                rgbColor: {
                  red: 0,
                  green: 0,
                  blue: 0
                }
              },
              alpha: 0
            }
          }
        },
        fields: 'tableBorderFill'
      }
    },
    // Set the size of the first column of the table
    {
      updateTableColumnProperties: {
        objectId,
        columnIndices: [0],
        tableColumnProperties: {
          columnWidth: {
            magnitude: 410,
            unit
          }
        },
        fields: 'columnWidth'
      }
    },
    // Set the size of the second column of the table
    {
      updateTableColumnProperties: {
        objectId,
        columnIndices: [1],
        tableColumnProperties: {
          columnWidth: {
            magnitude: 180,
            unit
          }
        },
        fields: 'columnWidth'
      }
    }
  ]
}

function addEventNameWithStyleToTable (
  dateId,
  eventName,
  IndexRowInTableToInsert
) {
  const objectId = dateId + '-table'
  return [
    {
      insertText: {
        objectId,
        cellLocation: {
          rowIndex: IndexRowInTableToInsert,
          columnIndex: 0
        },
        insertionIndex: 0,
        text: eventName
      }
    },
    {
      updateTextStyle: {
        objectId,
        cellLocation: {
          rowIndex: IndexRowInTableToInsert,
          columnIndex: 0
        },
        style: {
          fontFamily: 'Nunito',
          bold: true,
          fontSize: {
            magnitude: 28,
            unit
          },
          foregroundColor: defaultForegroundColor
        },
        fields: 'bold,foregroundColor,fontFamily,fontSize',
        textRange: {
          type: 'ALL'
        }
      }
    }
  ]
}

function addTalkTitleWithStyleToTable (date, talk, IndexRowInTableToInsert) {
  const objectId = date + '-table'
  return [
    {
      insertText: {
        objectId,
        cellLocation: {
          rowIndex: IndexRowInTableToInsert,
          columnIndex: 0
        },
        text: talk.talkTitle
      }
    },
    {
      updateTextStyle: {
        objectId,

        cellLocation: {
          rowIndex: IndexRowInTableToInsert,
          columnIndex: 0
        },
        style: {
          fontFamily: 'Nunito',
          bold: true,
          fontSize: {
            magnitude: 20,
            unit
          },
          foregroundColor: defaultForegroundColor
        },
        fields: 'bold,foregroundColor,fontFamily,fontSize'
      }
    },
    {
      createParagraphBullets: {
        objectId,
        cellLocation: {
          rowIndex: IndexRowInTableToInsert,
          columnIndex: 0
        }
      }
    }
  ]
}

function addSpeakersWithStyleToTable (date, talk, IndexRowInTableToInsert) {
  const objectId = date + '-table'
  return [
    {
      insertText: {
        objectId,
        cellLocation: {
          rowIndex: IndexRowInTableToInsert,
          columnIndex: 1
        },
        insertionIndex: 0,
        text: talk.speakers
      }
    },
    {
      updateTextStyle: {
        objectId,
        cellLocation: {
          rowIndex: IndexRowInTableToInsert,
          columnIndex: 1
        },
        style: {
          fontFamily: 'Nunito',
          bold: false,
          fontSize: {
            magnitude: 18,
            unit
          },
          foregroundColor: greyForegroundColor
        },
        fields: 'bold,foregroundColor,fontFamily,fontSize',
        textRange: {
          type: 'ALL'
        }
      }
    }
  ]
}

/**
 * Adds an image to a presentation.
 */

function createImage (idPage, eventType, yNextElmt) {
  const imageUrl = pictogram.get(eventType)
  const imgSize = {
    magnitude: 110,
    unit
  }
  const requests = [
    {
      createImage: {
        url: imageUrl,
        elementProperties: {
          pageObjectId: idPage,
          size: {
            height: imgSize,
            width: imgSize
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 658,
            translateY: yNextElmt,
            unit
          }
        }
      }
    }
  ]
  try {
    return sendRequest(requests)
  } catch (error) {
    logger.error({
      message: `error on loading image for event : ${eventType}`
    })
  }
}

/**
 * get the id of the template (supposed to be the first slide)
 */
async function getIdSlideTemplate () {
  const res = await getSlides()
  return res[0].objectId
}

/**
 * add a table to the slides files with data
 */
function fillSlideWithData (idPage, dataOrganized) {
  const requests = []
  let IndexRowInTableToInsert = 0
  let yNextElmt = slideDataOrganizer.DEFAULT_START_Y_INDEX

  dataOrganized.forEach((events, date) => {
    // add date
    const dateId = uuidv4()
    const dateFormated = dateUtils.displayFullDateWithWords(date)
    requests.push(
      addDateTextWithStyle(idPage, dateFormated, dateId, yNextElmt)
    )

    // create table
    yNextElmt += slideDataOrganizer.slideSpacing.DATE
    requests.push(
      createTableWithStyleForAllEventsInDate(idPage, dateId, yNextElmt, events)
    )

    // fill table
    IndexRowInTableToInsert = 0
    const nbEvent = events.length
    for (let i = 0; i < nbEvent; i++) {
      // add event
      const arrayOfTalksForAnEvent = events[i]
      requests.push(
        addEventNameWithStyleToTable(
          dateId,
          arrayOfTalksForAnEvent.eventName,
          IndexRowInTableToInsert
        )
      )
      ImagePromiseList.push(
        createImage(idPage, arrayOfTalksForAnEvent.eventType, yNextElmt)
      )
      IndexRowInTableToInsert++
      yNextElmt += slideDataOrganizer.slideSpacing.EVENT

      // add all talk for the event
      for (let j = 0; j < arrayOfTalksForAnEvent.talks.length; j++) {
        const talk = arrayOfTalksForAnEvent.talks[j]
        requests.push(
          addTalkTitleWithStyleToTable(dateId, talk, IndexRowInTableToInsert),
          addSpeakersWithStyleToTable(dateId, talk, IndexRowInTableToInsert)
        )
        yNextElmt += slideDataOrganizer.slideSpacing.TALK
        IndexRowInTableToInsert++
      }
    }
  })
  try {
    const imagesPromises = Promise.allSettled(ImagePromiseList)
    const allPromises = Promise.all([imagesPromises, sendRequest(requests)])
    return allPromises
  } catch (e) {
    throw new Error(`error encountered while trying to fill a slide (${e})`)
  }
}

/**
 * delete the elements copied from the model used for the style of the data
 */
async function deleteTemplateInfo (idPage, template) {
  const res = await getSlides()
  const slide = await res.find((slide) => slide.objectId === idPage)
  if (!slide) {
    throw new Error(
      'cannot find the slide on which we want to delete the template info'
    )
  }
  // if the page is the one we're looking for
  const pageElements = slide.pageElements
  const requests = []
  try {
    requests.push({
      deleteObject: {
        // delete icon
        objectId: pageElements[pageElements.length - 1].objectId
      }
    })
    requests.push({
      deleteObject: {
        // delete table event
        objectId: pageElements[pageElements.length - 2].objectId
      }
    })
    requests.push({
      deleteObject: {
        // delete date
        objectId: pageElements[pageElements.length - 3].objectId
      }
    })
    return sendRequest(requests)
  } catch (e) {
    throw new Error(`missing element(s) on template slide (${e})`)
  }
}

/**
 * duplicate the first slide
 */
async function copySlide (idPage) {
  const newIdPage = uuidv4()
  const requests = [
    {
      duplicateObject: {
        objectId: idPage,
        objectIds: {
          [idPage]: newIdPage
        }
      }
    }
  ]
  try {
    await sendRequest(requests)
    return newIdPage
  } catch (e) {
    throw new Error(`error encounterred while trying to copy a slide (${e})`)
  }
}

async function deleteLastSlide () {
  const res = await getSlides()
  const indexAddedSlide = 1
  const idPage = res[indexAddedSlide].objectId
  const requests = [
    {
      deleteObject: {
        objectId: idPage
      }
    }
  ]
  try {
    await sendRequest(requests)
  } catch (e) {
    throw new Error(`error encounterred while trying to delete a slide (${e})`)
  }
}

const getCopySlideIdTraining = async (auth, template) => {
  const newIdPage = uuidv4()
  const requests = []
  const idFilePresentation = getIdOftheFilePresentation(template)
  if (template === TRAINING_WITH_US) {
    requests.push({
      duplicateObject: {
        objectId: TRAIN_WITH_US_SLIDE_ID,
        objectIds: { [TRAIN_WITH_US_SLIDE_ID]: newIdPage }
      }
    })
  }

  if (template === TRAINING_WITH_US_GREEN) {
    requests.push({
      duplicateObject: {
        objectId: TRAIN_WITH_US_GREEN_SLIDE_ID,
        objectIds: { [TRAIN_WITH_US_GREEN_SLIDE_ID]: newIdPage }
      }
    })
  }

  if (template === FORMEZ_VOUS) {
    requests.push({
      duplicateObject: {
        objectId: FORMEZ_VOUS_SLIDE_ID,
        objectIds: { [FORMEZ_VOUS_SLIDE_ID]: newIdPage }
      }
    })
  }

  try {
    await sendRequestTraining(auth, requests, idFilePresentation)
    return newIdPage
  } catch (error) {
    logger.error({ message: error.message })
    throw error
  }
}

const getCopySlidePageElements = async (auth, newSlideId, template) => {
  try {
    return await getNewSlidePagesElements(
      auth,
      newSlideId,
      getIdOftheFilePresentation(template)
    )
  } catch (error) {
    logger.error({ message: error.message })
    throw error
  }
}

const getIdOftheFilePresentation = (template) => {
  let presentationId = ''
  if (
    [TRAINING_WITH_US, TRAINING_WITH_US_GREEN, FORMEZ_VOUS].includes(template)
  ) {
    presentationId = PRESENTATION_TRAINING_ID
  } else if (template === QUOI_DE_NEUF) presentationId = PRESENTATION_TALKS_ID
  return presentationId
}

const updateNewCopySlide = async (
  auth,
  template,
  copySlidePageElements,
  imagesUrls
) => {
  const request = []
  try {
    const idFirstImage = getIdForTheFirstImageToReplace(
      template,
      copySlidePageElements
    )
    const idSecondImage = getIdOfTheSecondImageToReplace(
      template,
      copySlidePageElements
    )

    request.push(
      replaceExistingImageRequest(imagesUrls, idFirstImage, idSecondImage)
    )

    return await sendRequestTraining(
      auth,
      request,
      getIdOftheFilePresentation(template)
    )
  } catch (error) {
    logger.error({ message: error.message })
    throw error
  }
}

const replaceExistingImageRequest = (
  arrOfTwoUrl,
  idFirstImage,
  idSecondImage
) => {
  if (Array.isArray(arrOfTwoUrl) && arrOfTwoUrl.length > 0) {
    const res = []
    const [firstUrl, secondUrl] = arrOfTwoUrl
    if (firstUrl && idFirstImage) {
      res.push({
        replaceImage: {
          imageObjectId: idFirstImage,
          imageReplaceMethod: 'CENTER_INSIDE',
          url: firstUrl
        }
      })
    }
    if (secondUrl && idFirstImage) {
      res.push({
        replaceImage: {
          imageObjectId: idSecondImage,
          imageReplaceMethod: 'CENTER_INSIDE',
          url: secondUrl
        }
      })
    }
    return res
  }
  return []
}

const getIdForTheFirstImageToReplace = (template, getNewSlide) => {
  let idOfTheFirstImageToReplace = ''

  if ([TRAINING_WITH_US, TRAINING_WITH_US_GREEN].includes(template)) {
    idOfTheFirstImageToReplace =
      getNewSlide[INDEX_FIRST_IMAGE_TO_REPLACE_TRAINING_WITH_US].objectId
  } else if (template === FORMEZ_VOUS) {
    idOfTheFirstImageToReplace =
      getNewSlide[INDEX_FIRST_IMAGE_TO_REPLACE_FORMEZ_VOUS].objectId
  }

  return idOfTheFirstImageToReplace
}

const getIdOfTheSecondImageToReplace = (template, getNewSlide) => {
  let idOfTheSecondImageToReplace = ''

  if ([TRAINING_WITH_US, TRAINING_WITH_US].includes(template)) {
    idOfTheSecondImageToReplace =
      getNewSlide[INDEX_SECOND_IMAGE_TO_REPLACE_TRAINING_WITH_US].objectId
  } else if (template === FORMEZ_VOUS) {
    idOfTheSecondImageToReplace =
      getNewSlide[INDEX_SECOND_IMAGE_TO_REPLACE_FORMEZ_VOUS].objectId
  }
  return idOfTheSecondImageToReplace
}

module.exports = {
  addDateTextWithStyle,
  createTableWithStyleForAllEventsInDate,
  addEventNameWithStyleToTable,
  addTalkTitleWithStyleToTable,
  addSpeakersWithStyleToTable,
  createImage,
  deleteTemplateInfo,
  fillSlideWithData,
  copySlide,
  getIdSlideTemplate,
  getCopySlidePageElements,
  getSuccessMessage,
  getSuccessMessageTrainings,
  deleteLastSlide,
  getCopySlideIdTraining,
  updateNewCopySlide
}
