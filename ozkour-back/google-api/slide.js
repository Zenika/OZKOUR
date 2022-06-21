const { google } = require('googleapis')
const utilitary = require('../utilitary')
const connect = require('./connect.js')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const presentationId = '1Mwzl0-13stcTZRn_0iyIJLZveuY80SW2cmv9p2Wgpug'

const defaultForegroundColor = {
  opaqueColor: {
    rgbColor: {
      blue: 1.0,
      green: 1.0,
      red: 1.0
    }
  }
}

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

const slideSpacing = {
  EVENT: 50,
  TALK: 45,
  DATE: 40
}

const DEFAULT_START_Y_INDEX = 100

const END_OF_SLIDE = 520

async function createSlideFromTalks (talks, h) {
  try {
    const res = await connect.authMethode(createSlides, talks)
    return h.response(res).code(200)
  } catch (e) {
    return h.response(e).code(500)
  }
}

/**
 * cluster all the talks by date
 * @param {Array} The talks that need to be clustered
 * @return {dataOrganized} dataOrganized where the keys are the date and the values are the talks
 */
function clusterByDate (data) {
  const dataOrganized = new Map()
  for (let i = 0; i < data.length; i++) {
    if (!dataOrganized.has(data[i].date)) {
      dataOrganized.set(data[i].date, [
        {
          universe: data[i].universe,
          eventType: data[i].eventType,
          eventName: data[i].eventName,
          talkTitle: data[i].talkTitle,
          speakers: data[i].speakers
        }
      ])
    } else {
      const newValue = dataOrganized.get(data[i].date)
      newValue.push({
        universe: data[i].universe,
        eventType: data[i].eventType,
        eventName: data[i].eventName,
        talkTitle: data[i].talkTitle,
        speakers: data[i].speakers
      })
    }
  }
  return divideInMultipleSlides(clusterByEventName(dataOrganized))
}

function divideInMultipleSlides (dataOrganized) {
  const mapIter = dataOrganized.keys()
  let date = mapIter.next().value
  let isEndOfData = false
  let isEndOfSlideReached = false
  const dataOrganizedBySlides = []
  const map = new Map()
  dataOrganizedBySlides.push(map)

  while (!isEndOfData) {
    let yNextElmt = DEFAULT_START_Y_INDEX
    let yNextElmtAvantDate = 0
    isEndOfSlideReached = false
    while (!isEndOfData && !isEndOfSlideReached) {
      let DoesDateFits = true
      yNextElmtAvantDate = yNextElmt
      const resDate = testDate(yNextElmt, dataOrganized.get(date))
      DoesDateFits = resDate.DoesDateFits
      yNextElmt = resDate.yNextElmt

      if (!DoesDateFits) { // toute la date ne rentre pas
        yNextElmt = yNextElmtAvantDate
        let i = 0
        let listOfEventThatFits = []
        const allEventsInADate = dataOrganized.get(date)
        let atLeastOneEventCanFit = false
        let firstIteration = true
        let worthToContinue = true
        // let atLeastOneTalkCanFit = false
        while (i < allEventsInADate.length && worthToContinue) {
          if (firstIteration) {
            firstIteration = false
          } else if (!atLeastOneEventCanFit) {
            worthToContinue = false
          }
          let DoesEventFits = true
          const event = allEventsInADate[i]
          const resEvent = testEvent(yNextElmt, event)
          DoesEventFits = resEvent.DoesEventFits
          yNextElmt = resEvent.yNextElmt
          if (DoesEventFits) {
            atLeastOneEventCanFit = true
            listOfEventThatFits.push(event)
          } else {
            if (atLeastOneEventCanFit) {
              // on ajoute ce qui rentre
              dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, listOfEventThatFits)

              // on prepare la prochaine fois que ça rentre
              listOfEventThatFits = []
              const map = new Map()
              dataOrganizedBySlides.push(map)
              listOfEventThatFits.push(event)
            } else {
              i = allEventsInADate.length
            }
          }
          i++
          if (i >= allEventsInADate.length && atLeastOneEventCanFit) {
            dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, listOfEventThatFits)
          }
        }
        if (!atLeastOneEventCanFit) {
          isEndOfSlideReached = true
          const map = new Map()
          map.set(date, dataOrganized.get(date))
          dataOrganizedBySlides.push(map)
        }
      } else { // toute la date rentre
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, dataOrganized.get(date))
      }

      // on verifie s'il reste des données
      date = mapIter.next().value
      if (date === undefined) {
        isEndOfData = true
      }
    }
  }
  return dataOrganizedBySlides
}

function testDate (yNextElmt, data) {
  yNextElmt += slideSpacing.DATE
  const nbEvent = data.length
  for (let i = 0; i < nbEvent; i++) {
    const event = data[i]
    const res = testEvent(yNextElmt, event)
    yNextElmt = res.yNextElmt
  }
  return { yNextElmt, DoesDateFits: yNextElmt <= END_OF_SLIDE }
}

function testEvent (yNextElmt, event) {
  yNextElmt += slideSpacing.EVENT
  for (let j = 0; j < event.talks.length; j++) {
    yNextElmt += slideSpacing.TALK
  }

  return { yNextElmt, DoesEventFits: yNextElmt <= END_OF_SLIDE }
}

/**
 * cluster all the talks by name of events
 * @param {dataOrganized} The talks already clustured by dates
 * @return {dataOrganized} dataOrganized where the keys are the date and the values are an object
 * with 2 attributes: one for the event name and one for the left data
 */
function clusterByEventName (dataOrganized) {
  const mapIter = dataOrganized.keys()
  let date = mapIter.next().value

  while (date !== undefined) {
    const EventNameAdded = []
    const EventArray = []
    for (let i = 0; i < dataOrganized.get(date).length; i++) {
      // pour chaque date
      const talk = dataOrganized.get(date)[i]

      if (EventNameAdded.includes(talk.eventName)) {
        EventArray[EventNameAdded.indexOf(talk.eventName)].talks.push({
          universe: talk.universe,
          talkTitle: talk.talkTitle,
          speakers: talk.speakers
        })
      } else {
        EventArray.push({
          eventName: talk.eventName,
          eventType: talk.eventType,
          talks: [
            {
              universe: talk.universe,
              talkTitle: talk.talkTitle,
              speakers: talk.speakers
            }
          ]
        })
        EventNameAdded.push(talk.eventName)
      }
    }
    dataOrganized.set(date, EventArray)
    date = mapIter.next().value
  }
  return dataOrganized
}

async function createSlides (auth, talks) {
  const slides = google.slides({ version: 'v1', auth })
  const promiseCreateSlide = new Promise((resolve, reject) => {
    slides.presentations.get(
      {
        presentationId
      },
      async (err, res) => {
        if (err) reject(err.message)
        const dataOrganizedBySlide = clusterByDate(talks)
        dataOrganizedBySlide.forEach(dataOrganized =>
          copySlide(auth, res.data.slides[0].objectId, dataOrganized)
            .then((result) => {
              resolve({
                message: result,
                link:
                    'https://docs.google.com/presentation/d/' +
                    presentationId +
                    '/'
              })
            })
            .catch((e) => {
              reject(e)
            })
        )
      }
    )
  })
  return promiseCreateSlide
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
    magnitude: 30,
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
            translateX: 70,
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
            magnitude: 17,
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

function CreateTableWithStyleForAllEventsInDate (
  idPage,
  dateId,
  Y,
  data
) {
  const objectId = dateId + '-table'
  // calculate size of Table
  let nbTalkForDate = data.length
  for (let i = 0; i < data.length; i++) { nbTalkForDate += data[i].talks.length }
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
            magnitude: 320,
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
            magnitude: 130,
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
            magnitude: 20,
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
            magnitude: 14,
            unit
          },
          foregroundColor: defaultForegroundColor
        },
        fields: 'bold,foregroundColor,fontFamily,fontSize'
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
          bold: true,
          fontSize: {
            magnitude: 14,
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
 * @param {string} presentationId The presentation ID.
 * @param {string} pageId The presentation page ID.
 */
function createImage (pageId, eventType, yNextElmt) {
  const pictogram = new Map()
  // Problem de droit avec les images
  // pictogram.set('Conference', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20conference.png')
  // pictogram.set('Matinale', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20matinale.png')
  // pictogram.set('Meetup', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20meetup.png')
  // pictogram.set('NightClazz', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20nightclazz.png')
  // pictogram.set('Webinar', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20webinar.png')

  // image temporaire en attendant
  pictogram.set('Conference', 'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg')
  pictogram.set('Matinale', 'https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
  pictogram.set('Meetup', 'https://static.fnac-static.com/multimedia/Images/FD/Comete/114332/CCP_IMG_ORIGINAL/1481839.jpg')
  pictogram.set('NightClazz', 'https://cdn.mos.cms.futurecdn.net/HsDtpFEHbDpae6wBuW5wQo-1200-80.jpg')
  pictogram.set('Webinar', 'https://docs.microsoft.com/fr-fr/windows/apps/design/controls/images/image-licorice.jpg')

  const imageUrl = pictogram.get(eventType)
  // Create a new image, using the supplied object ID, with content downloaded from imageUrl.
  const imageId = function () {
    return Date.now().toString(36) + Math.random().toString(36).replace('.', '-')
  }

  const imgSize = {
    magnitude: 110,
    unit
  }

  return [{
    createImage: {
      objectId: imageId,
      url: imageUrl,
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: imgSize,
          width: imgSize
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 455,
          translateY: yNextElmt,
          unit
        }
      }
    }
  }]
}

/**
 * generate the requests to add a date text to a slide
 * @param {string} the id of the page where the elements need to be deleted
 * @param {string} the date we need to add to the slide
 * @param {int} the place (only axis y) where we need put the date
 * @return {Array} return an array of the requests
 */

function addTableData (auth, idPage, dataOrganized) {
  const slides = google.slides({ version: 'v1', auth })

  const requests = []
  const mapIter = dataOrganized.keys()

  let date = mapIter.next().value
  let IndexRowInTableToInsert = 0
  let yNextElmt = DEFAULT_START_Y_INDEX

  while (date !== undefined) {
    const dateId = date.replaceAll('/', '-') + Math.random().toString(36).replaceAll('.', ':')
    IndexRowInTableToInsert = 0
    const dateFormated = date.substring(0, 2) + ' ' + utilitary.convDateToMonth(date) + ' ' + date.substring(6)
    requests.push(addDateTextWithStyle(idPage, dateFormated, dateId, yNextElmt))
    yNextElmt += slideSpacing.DATE
    requests.push(
      CreateTableWithStyleForAllEventsInDate(
        idPage,
        dateId,
        yNextElmt,
        dataOrganized.get(date)
      )
    )

    const nbEvent = dataOrganized.get(date).length
    for (let i = 0; i < nbEvent; i++) {
      const arrayOfTalksForAnEvent = dataOrganized.get(date)[i]
      requests.push(
        addEventNameWithStyleToTable(
          dateId,
          arrayOfTalksForAnEvent.eventName,
          IndexRowInTableToInsert
        ),
        createImage(idPage, arrayOfTalksForAnEvent.eventType, yNextElmt)
      )
      IndexRowInTableToInsert++

      yNextElmt += slideSpacing.EVENT

      // add all talk for the event
      for (let j = 0; j < arrayOfTalksForAnEvent.talks.length; j++) {
        const talk = arrayOfTalksForAnEvent.talks[j]
        requests.push(
          addTalkTitleWithStyleToTable(dateId, talk, IndexRowInTableToInsert),
          addSpeakersWithStyleToTable(dateId, talk, IndexRowInTableToInsert)
        )
        yNextElmt += slideSpacing.TALK
        IndexRowInTableToInsert++
      }
    }
    date = mapIter.next().value
  }

  const promiseAddTableData = new Promise((resolve, reject) => {
    // Execute the request.
    slides.presentations.batchUpdate(
      {
        presentationId,
        resource: {
          requests
        }
      },
      (err, res) => {
        try {
          if (err) {
            reject(err.message)
          } else {
            resolve('Table Added')
          }
        } catch (e) {
          reject(new Error('error catch copy'))
        }
      }
    )
  })
  return promiseAddTableData
}

/**
 * delete the elements copied from the model used for the style of the data
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {string} the id of the page where the elements need to be deleted
 * @param {string} the id of the google slide presentation
 */
function deleteTemplateInfo (auth, idPage) {
  const slides = google.slides({ version: 'v1', auth })
  const promiseDeleteTemplateInfo = new Promise((resolve, reject) => {
    slides.presentations.get(
      {
        presentationId
      },
      async (err, res) => {
        if (err) reject(new Error(err))

        const slide = res.data.slides.find(slide => slide.objectId === idPage)
        if (slide !== undefined) {
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
            slides.presentations.batchUpdate(
              {
                presentationId,
                resource: {
                  requests
                }
              },
              (err, res) => {
                if (err) {
                  reject(err)
                } else {
                  resolve('style template element deleted')
                }
              }
            )
          } catch (e) {
            reject(new Error('missing element on template slide'))
          }
        } else {
          reject(new Error('error delete template element'))
        }
      }
    )
  })
  return promiseDeleteTemplateInfo
}

function copySlide (auth, idPage, talkSelected) {
  const slides = google.slides({ version: 'v1', auth })
  const newIdPage = Date.now().toString(36) + Math.random().toString(36).replace('.', '-') // New id is supposed to be unique
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
  const promiseCopySlide = new Promise((resolve, reject) => {
    slides.presentations.batchUpdate(
      {
        presentationId,
        resource: {
          requests
        }
      },
      async (err, res) => {
        try {
          if (err) {
            reject(err.message)
          }
          await deleteTemplateInfo(auth, newIdPage)
          await addTableData(auth, newIdPage, talkSelected)
          resolve('Created !')
        } catch (e) {
          reject(e)
        }
      }
    )
  })
  return promiseCopySlide
}

module.exports = {
  createSlideFromTalks,
  clusterByDate,
  clusterByEventName
}
