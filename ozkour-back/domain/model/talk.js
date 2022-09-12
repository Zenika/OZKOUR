class Talk {
  constructor (date, universe, eventType, eventName, talkTitle, speakers, checked = true, link) {
    this.date = date
    this.universe = universe
    this.eventType = eventType
    this.eventName = eventName
    this.talkTitle = talkTitle
    this.speakers = speakers
    this.checked = checked
    this.link = link
  }
}

module.exports = {
  Talk
}
