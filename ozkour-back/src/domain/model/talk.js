class Talk {
  constructor ({ date, universe, eventType, eventName, talkTitle, speakers, url, complete = false }) {
    this.date = date
    this.universe = universe
    this.eventType = eventType
    this.eventName = eventName
    this.talkTitle = talkTitle
    this.speakers = speakers
    this.url = url
    this.complete = complete
  }

  toString () {
    return `date : ${this.date},universe : ${this.universe},eventType : ${this.eventType},eventName : ${this.eventName},talkTitle : ${this.talkTitle},speakers : ${this.speakers},url : ${this.url}`
  }
}

module.exports = {
  Talk
}
