const { logger } = require('../logger')
const { Talk } = require('./model/talk')
const { Training } = require('./model/training')
function sortTalksEmailing (data) {
  const talks = data.map(talk => new Talk(talk))
  logger.debug({
    message: `talks recieved : \n${talks.map(talk => ' ' + talk.toString()).join('\n')}`
  })

  const allTalkComplete = verifyTalkEmailing(data)
  if (!allTalkComplete) {
    logger.warn({
      message: 'wrong format of talk for Emailing'
    })
  }
  const mapUniverse = new Map()
  talks.forEach(talk => {
    const thisTalkIsComplete = (!!talk.date && !!talk.eventType && !!talk.eventName && !!talk.talkTitle && !!talk.speakers)
    const newTalk = {
      date: talk.date,
      eventType: talk.eventType,
      eventName: talk.eventName,
      talkTitle: talk.talkTitle,
      speakers: talk.speakers,
      link: talk.link,
      complete: (allTalkComplete || thisTalkIsComplete)
    }
    if (!mapUniverse.has(talk.universe)) {
      mapUniverse.set(talk.universe, [newTalk])
    } else {
      const newValue = mapUniverse.get(talk.universe)
      newValue.push(newTalk)
    }
  })
  return { mapUniverse, allTalkComplete }
}

function verifyTalkEmailing (talks) {
  if (!Array.isArray(talks) || talks.length <= 0) {
    throw new Error('Can\'t create visual without talks')
  }
  return talks.every(
    ({ date, universe, eventName, talkTitle, speakers }) =>
      Boolean(date) &&
      Boolean(universe) &&
      Boolean(eventName) &&
      Boolean(talkTitle) &&
      Boolean(speakers)
  )
}

function sortTrainingsEmailing (data) {
  if (!verifyTrainingEmailing(data)) {
    throw (new Error('wrong format of training for Emailing'))
  }

  const trainings = data.map(training => new Training(training))
  logger.debug({
    message: `trainings recieved : \n${trainings.map(training => ' ' + training.toString()).join('\n')}`
  })
  const mapUniverse = new Map()
  trainings.forEach(training => {
    const newTraining = {
      date: training.date,
      trainingTitle: training.trainingTitle,
      universe: training.universe,
      duration: training.duration,
      price: training.price,
      link: training.link,
      checked: training.checked
    }
    if (!mapUniverse.has(training.universe)) {
      mapUniverse.set(training.universe, [newTraining])
    } else {
      const newValue = mapUniverse.get(training.universe)
      newValue.push(newTraining)
    }
  })
  return { mapUniverse }
}

function verifyTrainingEmailing (trainings) {
  if (!Array.isArray(trainings) || trainings.length <= 0) {
    throw new Error('Can\'t create visual without trainings')
  }
  return trainings.every(
    ({ date, universe, trainingTitle, duration, link }) =>
      Boolean(date) &&
      Boolean(universe) &&
      Boolean(trainingTitle) &&
      Boolean(duration) &&
      Boolean(link)
  )
}

module.exports = {
  sortTalksEmailing,
  verifyTalkEmailing,
  sortTrainingsEmailing,
  verifyTrainingEmailing
}
