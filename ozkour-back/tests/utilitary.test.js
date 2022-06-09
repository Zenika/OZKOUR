const utilitary = require('../utilitary')
test('convert date in month written', () => {
  expect(utilitary.convDateToMonth('11/11/2021')).toBe('Novembre')
})
