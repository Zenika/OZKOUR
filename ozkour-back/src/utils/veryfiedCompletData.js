function verifyedCompletetData (array, variables) {
  const TRAINING_SHEET_CONST = 'training_sheet'
  const TALK_SHEET_CONST = 'talk_sheet'
  const incompletArrayOfData = []
  const completArrayOfData = []
  const arrayReceived = array

  if (Array.isArray(array) && array.length > 0) {
    if (variables === TRAINING_SHEET_CONST) {
      arrayReceived.forEach(function (el) {
        completArrayOfData.push(el)
        if (
          !el.title ||
          !el.universe ||
          !el.duration ||
          !el.price ||
          !el.url ||
          !el.date
        ) {
          incompletArrayOfData.push(el.indexLine)
        }
      })
    }
    if (variables === TALK_SHEET_CONST) {
      arrayReceived.forEach(function (el) {
        completArrayOfData.push(el)
        if (
          !el.date ||
          !el.universe ||
          !el.eventType ||
          !el.eventName ||
          !el.talkTitle ||
          !el.speakers ||
          !el.url
        ) {
          incompletArrayOfData.push(el.indexLine)
        }
      })
    }
    return { res: completArrayOfData, warn: incompletArrayOfData }
  }
  return {}
}

module.exports = {
  verifyedCompletetData
}
