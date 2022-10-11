const { logger } = require('../logger')
const { Talk } = require('./model/talk')
function sortTalksEmailing (data) {
  const talks = data.map(talk => new Talk(talk))
  logger.debug({
    message: `talks recieved : \n${talks.map(talk => ' ' + talk.toString()).join('\n')}`
  })

  const allTalkComplete = verifyTalkEmailing(data)
  if (!allTalkComplete) {
    throw (new Error('wrong format of talk for Emailing'))
  }
  const mapUniverse = new Map()
  talks.forEach(talk => {
    const newTalk = {
      date: talk.date,
      eventType: talk.eventType,
      eventName: talk.eventName,
      talkTitle: talk.talkTitle,
      speakers: talk.speakers,
      link: talk.link,
      complete: (allTalkComplete || (!!talk.date && !!talk.eventType && !!talk.eventName && !!talk.talkTitle && !!talk.speakers))
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
    ({ date, universe, eventName, talkTitle, speakers }) => {
      if (date === '') { date = undefined }
      if (universe === '') { universe = undefined }
      if (eventName === '') { eventName = undefined }
      if (talkTitle === '') { talkTitle = undefined }
      if (speakers === '') { speakers = undefined }
      return Boolean(date) &&
      Boolean(universe) &&
      Boolean(eventName) &&
      Boolean(talkTitle) &&
      Boolean(speakers)
    }
  )
}
module.exports = {
  sortTalksEmailing,
  verifyTalkEmailing
}
