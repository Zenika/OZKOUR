const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

function dateFilter (
  arrayOfTrainingOrTlaks,
  formatedDateStart,
  formatedDateEnd
) {
  const startDate = dayjs(formatedDateStart, 'DD/MM/YYYY')
  const endDate = dayjs(formatedDateEnd, 'DD/MM/YYYY')

  const INDEX_COMPLET_TALK_OR_FORMATION = 0
  const INDEX_GOOGLE_SHEET = 1
  let completArrayOfTrainingOrTalksNotFiltered

  arrayOfTrainingOrTlaks
    ? (completArrayOfTrainingOrTalksNotFiltered =
        arrayOfTrainingOrTlaks[INDEX_COMPLET_TALK_OR_FORMATION])
    : (completArrayOfTrainingOrTalksNotFiltered = null)

  if (
    Array.isArray(arrayOfTrainingOrTlaks) &&
    arrayOfTrainingOrTlaks.length === 1
  ) {
    const talkfOrFormationFiltered = TalkOrFormationFiltered(
      completArrayOfTrainingOrTalksNotFiltered,
      startDate,
      endDate
    )
    return talkfOrFormationFiltered
  }
  if (
    Array.isArray(arrayOfTrainingOrTlaks) &&
    arrayOfTrainingOrTlaks.length > 1
  ) {
    const talkfOrFormationFiltered = TalkOrFormationFiltered(
      completArrayOfTrainingOrTalksNotFiltered,
      startDate,
      endDate
    )
    return [
      talkfOrFormationFiltered,
      arrayOfTrainingOrTlaks[INDEX_GOOGLE_SHEET]
    ]
  }
  return []
}

function TalkOrFormationFiltered (array, startDate, endDate) {
  const arrayFilter = array.filter((el) => {
    const formationDate = dayjs(el.date, 'DD/MM/YYYY')
    return (
      formationDate.isSameOrAfter(startDate, 'day') &&
      formationDate.isSameOrBefore(endDate, 'day')
    )
  })
  return arrayFilter
}

module.exports = {
  dateFilter
}
