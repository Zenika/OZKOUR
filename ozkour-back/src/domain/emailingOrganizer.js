const { logger } = require('../logger')
function sortTalksEmailing (talks) {
  logger.debug({
    message: 'talk recieved :' + talks.map(talk => talk.toString()).join('\n')
  })

  if (!verifyTalkEmailing(talks)) {
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
      link: talk.link
    }
    if (!mapUniverse.has(talk.universe)) {
      mapUniverse.set(talk.universe, [newTalk])
    } else {
      const newValue = mapUniverse.get(talk.universe)
      newValue.push(newTalk)
    }
  })
  return mapUniverse
}

function verifyTalkEmailing (talks) {
  if (!Array.isArray(talks) || talks.length <= 0) {
    return false
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
module.exports = {
  sortTalksEmailing,
  verifyTalkEmailing
}
