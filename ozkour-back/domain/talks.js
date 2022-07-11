const dayjs = require('dayjs')
const { getTalkFromDate } = require('../infrastructure/googlesheets/sheets.js')

const getTalk = async (start, end = dayjs()) => {
  const formatedDateStart = dayjs(start)
  const formatedDateEnd = dayjs(end)
  if (formatedDateStart.format('MM/YYYY') === formatedDateEnd.format('MM/YYYY')) {
    const param = { start: formatedDateStart.format('DD/MM/YYYY'), end: formatedDateEnd.format('DD/MM/YYYY') }
    const res = await getTalkFromDate(param)
    return res
  } else {
    let res = []
    let tempDateStart = formatedDateStart
    let tempDateEnd = formatedDateStart.add(1, 'month')
    while (tempDateStart.format('MM/YYYY') !== formatedDateEnd.format('MM/YYYY')) {
      const param = { start: tempDateStart.format('DD/MM/YYYY'), end: tempDateEnd.format('DD/MM/YYYY') }
      res = res.concat(await getTalkFromDate(param))
      tempDateStart = tempDateStart.add(1, 'month')
      tempDateEnd = tempDateStart.add(1, 'month')
    }
    const param = { start: tempDateStart.format('DD/MM/YYYY'), end: formatedDateEnd.format('DD/MM/YYYY') }
    res = res.concat(await getTalkFromDate(param))

    return res
  }
}

module.exports = {
  getTalk
}
