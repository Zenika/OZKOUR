const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

function dateFilter (ObjTrainingOrTalks, formatedDateStart, formatedDateEnd) {
  if (
    Array.isArray(ObjTrainingOrTalks.res) &&
    ObjTrainingOrTalks.res.length >= 1
  ) {
    const talkfOrFormationFiltered = TalkOrFormationFiltered(
      ObjTrainingOrTalks.res,
      formatedDateStart,
      formatedDateEnd
    )
    return { res: talkfOrFormationFiltered, warn: ObjTrainingOrTalks.warn }
  }
  if (
    Array.isArray(ObjTrainingOrTalks.warn) &&
    ObjTrainingOrTalks.warn.length >= 1
  ) {
    const talkfOrFormationFiltered = TalkOrFormationFiltered(
      formatedDateStart,
      formatedDateEnd
    )
    return { res: talkfOrFormationFiltered, warn: ObjTrainingOrTalks.warn }
  }
  return {}
}

function TalkOrFormationFiltered (array, startDate, endDate) {
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
  dateFilter
}
