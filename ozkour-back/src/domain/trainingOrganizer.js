const { logger } = require('../logger')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
require('dayjs/locale/fr')
dayjs.extend(customParseFormat)
dayjs.locale('fr')

const clusterCommonUniverseAndDate = (training) => {
  const groupedByUniverse = {}

  training.forEach((obj) => {
    const { universe, date, title } = obj

    if (!groupedByUniverse[universe]) {
      groupedByUniverse[universe] = []
    }

    const existingDateObject = groupedByUniverse[universe].find(
      (item) => item.date === date
    )

    if (existingDateObject) {
      existingDateObject.events.push(title)
    } else {
      groupedByUniverse[universe].push({
        date,
        events: [title]
      })
    }
  })
  return groupedByUniverse
}

const sortByDate = (data) => {
  data.sort((a, b) => a.date.localeCompare(b.date))
  return data
}

const transformDateAndSelectData = (data) => {
  const dataUpdated = []
  data.forEach((obj) => {
    const startDate = dayjs(obj.date, 'DD-MM-YYYY').format('DD MMMM')
    const endDate = dayjs(obj.date, 'DD-MM-YYYY')
      .add(obj.duration - 1, 'day')
      .format('DD MMMM')

    if (obj.duration > 1) {
      dataUpdated.push({
        title: obj.title,
        universe: obj.universe,
        date: 'Du ' + startDate + ' au ' + endDate + '.'
      })
    } else {
      dataUpdated.push({
        title: obj.title,
        universe: obj.universe,
        date: 'Le ' + startDate + '.'
      })
    }
  })
  logger.info({
    message: 'Each trainings has this date transformed'
  })
  return dataUpdated
}

const trainingDataOrganizer = (data) => {
  if (data) {
    const trainingSortedByDate = sortByDate(data)
    const tranformDate = transformDateAndSelectData(trainingSortedByDate)
    const clusterUnivers = clusterCommonUniverseAndDate(tranformDate)
    return clusterUnivers
  } else {
    logger.error({
      message: 'Missing datas to transform the objects'
    })
    throw new Error('Données manquantes pour générer le slide', 400)
  }
}

module.exports = {
  sortByDate,
  transformDateAndSelectData,
  clusterCommonUniverseAndDate,
  trainingDataOrganizer
}
