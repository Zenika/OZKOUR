class Talk {
  constructor (date, universe, eventType, eventName, talkTitle, speakers, checked = true) {
    this.date = date
    this.universe = universe
    this.eventType = eventType
    this.eventName = eventName
    this.talkTitle = talkTitle
    this.speakers = speakers
    this.checked = checked
  }
}

module.exports = {
  Talk
}
