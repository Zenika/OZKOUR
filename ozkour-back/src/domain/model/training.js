class Training {
  constructor ({ date, trainingTitle, universe, duration, price, link, checked = true }) {
    this.date = date
    this.trainingTitle = trainingTitle
    this.universe = universe
    this.duration = duration
    this.price = price
    this.link = link
    this.checked = checked
  }

  toString () {
    return `date : ${this.date},trainingTitle : ${this.trainingTitle},universe : ${this.universe},duration : ${this.duration},price : ${this.price},link : ${this.link}`
  }
}

module.exports = {
  Training
}
