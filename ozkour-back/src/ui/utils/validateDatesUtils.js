const { CustomeError } = require('../../Error/customeError')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const validateDates = (start, end) => {
  const formatedDateStart = dayjs(start).format('DD/MM/YYYY')
  const formatedDateEnd = dayjs(end).format('DD/MM/YYYY')

  if (!formatedDateStart && formatedDateEnd) {
    throw new CustomeError("La date de début n'est pas définie", 400)
  }
  if (!formatedDateEnd && formatedDateStart) {
    throw new CustomeError("La date de fin n'est pas définie", 400)
  }
  if (!formatedDateStart && !formatedDateEnd) {
    throw new CustomeError(
      'Les dates de début et de fin ne sont pas défininies ',
      400
    )
  }
  if (dayjs(formatedDateStart, 'DD/MM/YYYY', true).isValid() === false) {
    throw new CustomeError('Le format de la date de début est incorrect', 400)
  }
  if (dayjs(formatedDateEnd, 'DD/MM/YYYY', true).isValid() === false) {
    throw new CustomeError('Le format de la date de fin est incorrect', 400)
  }
  return true
}

module.exports = {
  validateDates
}
