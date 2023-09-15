const { CustomeError } = require('../../Error/customeError')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const validateAndTransformeDates = (start, end) => {
  const formatedDateStart = dayjs(start).format('DD/MM/YYYY')
  const formatedDateEnd = dayjs(end).format('DD/MM/YYYY')

  if (!start && end) {
    throw new CustomeError("La date de début n'est pas définie", 400)
  }
  if (!end && start) {
    throw new CustomeError("La date de fin n'est pas définie", 400)
  }
  if (!start && !end) {
    throw new CustomeError(
      'Les dates de début et de fin ne sont pas défininies ',
      400
    )
  }

  if (!dayjs(start, 'YYYY-MM-DD', true).isValid()) {
    throw new CustomeError('Le format de la date de début est incorrect', 400)
  }

  if (!dayjs(end, 'YYYY-MM-DD', true).isValid()) {
    throw new CustomeError('Le format de la date de fin est incorrect', 400)
  }

  return { start: formatedDateStart, end: formatedDateEnd }
}

module.exports = {
  validateAndTransformeDates
}
