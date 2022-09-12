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
  return wrapper.updateDocument(documentId, requests)
}

function getSuccessMessage (documentId) {
  return {
    message: 'Created !',
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
          namedStyleType: 'HEADING_1'
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

function addTalkInEmailing (index, titleTalk, speakers, date, eventName, url) {
  const line = `${titleTalk}, animé par ${speakers}, le ${date} | ${eventName}` + '\n\n'
  console.log(line)
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
          namedStyleType: 'NORMAL_TEXT'
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
          endIndex: index + titleTalk.length
        }
      }
    })
  }
  return request
}

async function addTextForEmailing (documentId, mapUniverse) {
  const requests = []

  const mapIter = mapUniverse.keys()
  let universe = mapIter.next().value
  let index = 1
  while (universe) {
    requests.push(...addTitle(universe, index))
    index += universe.length + 1
    const talksForUniverse = mapUniverse.get(universe)
    talksForUniverse.forEach(talk => {
      requests.push(...addTalkInEmailing(index,
        talk.talkTitle,
        talk.speakers,
        talk.date,
        talk.eventName,
        talk.link
      ))
      const line = `${talk.talkTitle}, animé par ${talk.speakers}, le ${talk.date} | ${talk.eventName}` + '\n'
      console.log(line)
      index += line.length + 1
    })
    console.log(requests)
    universe = mapIter.next().value
  }
  return wrapper.updateDocument(documentId, requests)
}

module.exports = {
  removeTemplateText,
  addTextForEmailing,
  getSuccessMessage
}
