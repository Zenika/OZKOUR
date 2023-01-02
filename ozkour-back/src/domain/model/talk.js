class Talk {
  constructor ({ date, universe, eventType, eventName, talkTitle, speakers, link, complete = false }) {
    this.date = date
    this.universe = universe
    this.eventType = eventType
    this.eventName = eventName
    this.talkTitle = talkTitle
    this.speakers = speakers
    this.link = link
    this.complete = complete
  }

  toString () {
    return `date : ${this.date},universe : ${this.universe},eventType : ${this.eventType},eventName : ${this.eventName},talkTitle : ${this.talkTitle},speakers : ${this.speakers},link : ${this.link}`
  }
}

module.exports = {
  Talk
}
