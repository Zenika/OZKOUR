function triTalksEmailing (talks) {
  if (!verifyTalkEmailing(talks)) {
    console.log('error')
    throw (new Error('error : wrong format for Emailing'))
  }
  const mapUniverse = new Map()
  talks.forEach(talk => {
    if (!mapUniverse.has(talk.universe)) {
      mapUniverse.set(talk.universe, [
        {
          date: talk.date,
          eventType: talk.eventType,
          eventName: talk.eventName,
          talkTitle: talk.talkTitle,
          speakers: talk.speakers,
          link: talk.link
        }
      ])
    } else {
      const newValue = mapUniverse.get(talk.universe)
      newValue.push({
        date: talk.date,
        eventType: talk.eventType,
        eventName: talk.eventName,
        talkTitle: talk.talkTitle,
        speakers: talk.speakers,
        link: talk.link
      })
    }
  })
  return mapUniverse
}

function verifyTalkEmailing (talks) {
  if (!Array.isArray(talks) || talks.length <= 0) {
    return false
  }
  return talks.some(
    ({ date, universe, eventName, talkTitle, speakers }) =>
      Boolean(date) &&
      Boolean(universe) &&
      Boolean(eventName) &&
      Boolean(talkTitle) &&
      Boolean(speakers)
  )
}
module.exports = {
  triTalksEmailing,
  verifyTalkEmailing
}
