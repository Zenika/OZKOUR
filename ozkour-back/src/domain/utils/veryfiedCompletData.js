const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

function dateAndCompletDataFilter (array, variables, start, end) {
  const TRAINING_SHEET_CONST = 'training_sheet'
  const TALK_SHEET_CONST = 'talk_sheet'
  const incompletArrayOfData = []
  const completArrayOfData = []
  const arrayOfData = array

  if (Array.isArray(array) && array.length > 0) {
    const filteredArray = filterArrayOfData(arrayOfData)
    if (variables === TRAINING_SHEET_CONST) {
      const talkfOrFormationFiltered = talkOrFormationFiltered(
        filteredArray,
        start,
        end
      )
      talkfOrFormationFiltered.forEach(function (el) {
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
      const talkfOrFormationFiltered = talkOrFormationFiltered(
        filteredArray,
        start,
        end
      )
      talkfOrFormationFiltered.forEach(function (el) {
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

function filterArrayOfData (array) {
  const filterArray = array.filter((el) => el.date !== undefined)
  return filterArray
}

function talkOrFormationFiltered (array, startDate, endDate) {
  const start = dayjs(startDate, 'DD/MM/YYYY')
  const end = dayjs(endDate, 'DD/MM/YYYY')
  const arrayFilter = array.filter((el) => {
    const formationDate = dayjs(el.date, 'DD/MM/YYYY')
    return (
      formationDate.isSameOrAfter(start, 'day') &&
      formationDate.isSameOrBefore(end, 'day')
    )
  })
  return arrayFilter
}

module.exports = {
  dateAndCompletDataFilter
}
