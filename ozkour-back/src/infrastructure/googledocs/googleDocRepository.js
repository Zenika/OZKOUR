const wrapper = require('./docsWrapper')

function removeTemplateText (documentId) {
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

function getSuccessMessage (documentId, message) {
  return {
    message,
    link:
        'https://docs.google.com/document/d/' +
        documentId +
        '/'
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

async function addTextForEmailing (documentId, mapUniverse) {
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

module.exports = {
  addTitle,
  addTalkInEmailing,
  removeTemplateText,
  addTextForEmailing,
  getSuccessMessage
}
