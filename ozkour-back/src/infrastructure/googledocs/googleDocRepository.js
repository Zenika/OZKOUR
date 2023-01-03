const { convDateToMonthInLetterWithDeterminer, convDateAndDurationToDateIntervalInLetter } = require('../../Utils/dateUtils')
const wrapper = require('./docsWrapper')

function getSuccessMessage (documentId, message) {
  return {
    message,
    link:
        'https://docs.google.com/document/d/' +
        documentId +
        '/'
  }
}

// TALK
function removeTemplateTextEmailingTalk (documentId) {
  const requests = [
    {
      deleteContentRange: {
        range: {
          startIndex: 1,
          endIndex: 75
        }
      }
    }
  ]
  try {
    return wrapper.updateDocument(documentId, requests)
  } catch (e) {
    throw new Error(`error while trying to remove tempate text on document : ${documentId} (${e})`)
  }
}

function addTitle (title, index) {
  const end = index + (title.length)
  const requests = [
    {
      insertText: {
        text: title + '\n',
        location: {
          index
        }
      }
    },
    {
      updateParagraphStyle: {
        paragraphStyle: {
          namedStyleType: title === 'Sans Univers' ? 'HEADING_2' : 'HEADING_1'
        },
        fields: 'namedStyleType',
        range: {
          startIndex: index,
          endIndex: end
        }
      }
    }
  ]
  return requests
}

function addTalkInEmailing (index, talk) {
  const { talkTitle, speakers, date, eventName, url } = talk
  console.log(talk)
  const line = `${talkTitle}, animé par ${speakers}, le ${date} | ${eventName}` + '\n\n'
  const end = index + (line.length)
  const request = [
    {
      insertText: {
        text: line,
        location: {
          index
        }
      }
    },
    {
      updateParagraphStyle: {
        paragraphStyle: {
          namedStyleType: talk.complete ? 'NORMAL_TEXT' : 'SUBTITLE'
        },
        fields: 'namedStyleType',
        range: {
          startIndex: index,
          endIndex: end
        }
      }
    }
  ]

  if (url) {
    request.push({
      updateTextStyle: {
        textStyle: {
          link: {
            url
          }
        },
        fields: 'link',
        range: {
          startIndex: index,
          endIndex: index + talkTitle.length
        }
      }
    })
  }
  return request
}

async function addTextForTalkEmailing (documentId, mapUniverse) {
  const requests = []
  let index = 1
  mapUniverse.forEach((talksForUniverse, universe) => {
    if (universe === '') { universe = 'Sans Univers' }
    requests.push(addTitle(universe, index))
    index += universe.length + 1
    talksForUniverse.forEach(talk => {
      requests.push(addTalkInEmailing(index,
        talk
      ))
      const line = `${talk.talkTitle}, animé par ${talk.speakers}, le ${talk.date} | ${talk.eventName}` + '\n'
      index += line.length + 1
    })
  })
  try {
    return wrapper.updateDocument(documentId, requests)
  } catch (e) {
    throw new Error(`error while trying to add text for emaling on document : ${documentId} (${e})`)
  }
}

// TRAINING
function removeTemplateTextEmailingTraining (documentId) {
  const requests = [
    {
      deleteContentRange: {
        range: {
          startIndex: 54,
          endIndex: 61
        }
      }
    }
  ]
  try {
    return wrapper.updateDocument(documentId, requests)
  } catch (e) {
    throw new Error(`error while trying to remove tempate text on document : ${documentId} (${e})`)
  }
}

function addMonth (mapUniverse) {
  const [firstValue] = mapUniverse.values()
  const requests = [
    {
      insertText: {
        text: convDateToMonthInLetterWithDeterminer(firstValue[0].date),
        location: {
          index: 54
        }
      }
    }
  ]
  return requests
}

function addUniverseTraining (index, universe, trainings) {
  const startIndex = index
  const requests = [
    {
      insertTable: {
        rows: 1,
        columns: 1,
        location: {
          index
        }
      }
    }
  ]
  index += 4 // get the index in the table
  requests.push(addTitleUniverseTraining(index, universe))
  index += (universe).length + 1
  const [newRequest, newIndex] = addTrainingsInUniverse(index, trainings)
  requests.push(newRequest)
  index = newIndex
  index += 2 // get the index out of the table
  const indexAdded = index - startIndex
  return [requests, indexAdded]
}

function addTitleUniverseTraining (index, universe) {
  const request = [
    {
      insertText: {
        text: universe + '\n',
        location: {
          index
        }
      }
    },
    {
      updateParagraphStyle: {
        paragraphStyle: {
          namedStyleType: 'HEADING_2'
        },
        fields: 'namedStyleType',
        range: {
          startIndex: index,
          endIndex: index + universe.length
        }
      }
    }
  ]
  return request
}
function addTrainingsInUniverse (index, trainings) {
  const requests = []
  const startIndex = index
  trainings.forEach(training => {
    const writtenTraining = training.trainingTitle + ' : ' +
    convDateAndDurationToDateIntervalInLetter(training.date, training.duration)
    requests.push({
      insertText: {
        text: '\n' + writtenTraining,
        location: {
          index
        }
      }
    })
    index += 1 // '\n'
    requests.push(addStyleToTraining(index, training.url, training.trainingTitle))
    index += writtenTraining.length
  })
  requests.push({
    createParagraphBullets: {
      range: {
        startIndex: startIndex + 1,
        endIndex: index
      },
      bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE'
    }
  })
  return [requests, index]
}

function addStyleToTraining (index, url, trainingTitle) {
  return {
    updateTextStyle: {
      textStyle: {
        underline: true,
        link: {
          url
        },
        foregroundColor: {
          color: {
            rgbColor:
              {
                red: 0.33,
                green: 0.33,
                blue: 0.33
              }
          }
        }
      },
      fields: 'underline, link, foregroundColor',
      range: {
        startIndex: index,
        endIndex: index + trainingTitle.length + 2 // space + ':'
      }
    }
  }
}

async function addTextForTrainingEmailing (documentId, mapUniverse) {
  const requests = []
  let indexFirstColumn = 309
  let indexSecondColumn = 311
  requests.push(addMonth(mapUniverse))
  let n = 1
  mapUniverse.forEach((trainingsForUniverse, universe) => {
    if (n % 2 !== 0) {
      const [requestAdded, indexAdded] = addUniverseTraining(indexFirstColumn, universe, trainingsForUniverse)
      requests.push(requestAdded)
      indexFirstColumn += indexAdded
      indexSecondColumn += indexAdded
    } else {
      const [requestAdded, indexAdded] = addUniverseTraining(indexSecondColumn, universe, trainingsForUniverse)
      requests.push(requestAdded)
      indexSecondColumn += indexAdded
    }
    n++
  })
  try {
    return wrapper.updateDocument(documentId, requests)
  } catch (e) {
    throw new Error(`error while trying to add text for training emaling on document : ${documentId} (${e})`)
  }
}

module.exports = {
  addTitle,
  addTalkInEmailing,
  removeTemplateTextEmailingTalk,
  removeTemplateTextEmailingTraining,
  addTextForTalkEmailing,
  addTextForTrainingEmailing,
  getSuccessMessage
}
