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
  const INDEX_COMPLET_TALK_OR_FORMATION = 0

  const startDate = dayjs(formatedDateStart, 'DD/MM/YYYY')
  const endDate = dayjs(formatedDateEnd, 'DD/MM/YYYY')

  const completarrayOfTrainingOrTlaksgNotFiltered =
    arrayOfTrainingOrTlaks[INDEX_COMPLET_TALK_OR_FORMATION]

  const talkfOrFormationFiltered =
    completarrayOfTrainingOrTlaksgNotFiltered.filter((el) => {
      const formationDate = dayjs(el.date, 'DD/MM/YYYY')
      return (
        formationDate.isSameOrAfter(startDate, 'day') &&
        formationDate.isSameOrBefore(endDate, 'day')
      )
    })

  return [talkfOrFormationFiltered, arrayOfTrainingOrTlaks[1]]
}

module.exports = {
  dateFilter
}
