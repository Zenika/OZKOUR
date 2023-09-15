const { CustomeError } = require('@/Error/customeError')
const { validateAndTransformeDates } = require('@/ui/utils/validateDatesUtils')

const formatedDateStart = '01/06/2023'
const formatedDateEnd = '30/06/2023'

describe('validates date Format', () => {
  it('should render an object with two values', () => {
    const result = validateAndTransformeDates('2023-06-01', '2023-06-30')
    expect(result).toEqual({ start: formatedDateStart, end: formatedDateEnd })
  })
  it("should render La date de début n'est pas définie, status 400", () => {
    expect(() => {
      validateAndTransformeDates(undefined, '2023-06-30')
    }).toThrow(new CustomeError("La date de début n'est pas définie", 400))
  })
  it("should render La date de fin n'est pas définie, status 400", () => {
    expect(() => {
      validateAndTransformeDates('2023-06-30', undefined)
    }).toThrow(new CustomeError("La date de fin n'est pas définie", 400))
  })
  it("should render La date de début et la date de fin n'e sont pas définies, status 400", () => {
    expect(() => {
      validateAndTransformeDates(undefined, undefined)
    }).toThrow(
      new CustomeError(
        'Les dates de début et de fin ne sont pas défininies ',
        400
      )
    )
  })
  it('should render Le format de la date de début est incorrect, status 400', () => {
    expect(() => {
      validateAndTransformeDates('2023-15-01', '2023-06-30')
    }).toThrow(
      new CustomeError('Le format de la date de début est incorrect', 400)
    )
  })
  it('should render Le format de la date de fin est incorrect, status 400', () => {
    expect(() => {
      validateAndTransformeDates('2023-06-01', '2023-06-32')
    }).toThrow(
      new CustomeError('Le format de la date de fin est incorrect', 400)
    )
  })
})
