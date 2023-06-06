const { CustomeError } = require('../../../../src/Error/customeError')
const date = require('../../../../src/Utils/validateDates')

describe('validates date Format', () => {
  it('should render true', () => {
    const result = date.validateDates('2023-06-01', '2023-06-30')
    expect(result).toBe(true)
  })
  it("should render La date de début n'est pas définie, status 400", () => {
    expect(() => {
      date.validateDates(undefined, '2023-06-30')
    }).toThrow(new CustomeError("La date de début n'est pas définie", 400))
  })
  it("should render La date de fin n'est pas définie, status 400", () => {
    expect(() => {
      date.validateDates('2023-06-30', undefined)
    }).toThrow(new CustomeError("La date de fin n'est pas définie", 400))
  })
  it("should render La date de début et la date de fin n'e sont pas définies, status 400", () => {
    expect(() => {
      date.validateDates(undefined, undefined)
    }).toThrow(
      new CustomeError(
        'Les dates de début et de fin ne sont pas défininies ',
        400
      )
    )
  })
  it('should render Le format de la date de début est incorrect, status 400', () => {
    expect(() => {
      date.validateDates('2023-15-01', '2023-06-30')
    }).toThrow(
      new CustomeError('Le format de la date de début est incorrect', 400)
    )
  })
  it('should render Le format de la date de fin est incorrect, status 400', () => {
    expect(() => {
      date.validateDates('2023-06-01', '2023-06-32')
    }).toThrow(
      new CustomeError('Le format de la date de fin est incorrect', 400)
    )
  })
})
