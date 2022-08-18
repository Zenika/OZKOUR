const { v4: uuidv4 } = require('uuid')
const dateUtils = require('../../Utils/dateUtils')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const slideDataOrganizer = require('../../domain/slideDataOrganizer.js')
const { presentationId, getSlides, sendRequest } = require('./slideWrapper')
dayjs.extend(customParseFormat)

const pictogram = new Map()
pictogram.set('Conférence', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20conference.png')
pictogram.set('Matinale', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20matinale.png')
pictogram.set('Meetup', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20meetup.png')
pictogram.set('NightClazz', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20nightclazz.png')
pictogram.set('Webinar', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20webinar.png')

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
    link:
      'https://docs.google.com/presentation/d/' +
      presentationId +
      '/'
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
    console.log('error on loading image for event : ' + eventType)
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
    const dateFormated =
    dateUtils.displayFullDateWithWords(date)
    requests.push(
      addDateTextWithStyle(idPage, dateFormated, dateId, yNextElmt)
    )

    // create table
    yNextElmt += slideDataOrganizer.slideSpacing.DATE
    requests.push(
      createTableWithStyleForAllEventsInDate(
        idPage,
        dateId,
        yNextElmt,
        events
      )
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
      ImagePromiseList.push(createImage(idPage, arrayOfTalksForAnEvent.eventType, yNextElmt))
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
  const imagesPromises = Promise.allSettled(ImagePromiseList)
  const allPromises = Promise.all([imagesPromises, sendRequest(requests)])
  return allPromises
}

/**
 * delete the elements copied from the model used for the style of the data
 */
async function deleteTemplateInfo (idPage) {
  const res = await getSlides()
  const slide = await res.find(
    (slide) => slide.objectId === idPage
  )
  if (!slide) {
    throw (new Error('error delete template element'))
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
    throw (new Error('missing element on template slide'))
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
  await sendRequest(requests)
  return newIdPage
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
  getSuccessMessage
}
