class Training {
  constructor ({ date, trainingTitle, universe, duration, price, url }) {
    this.date = date
    this.trainingTitle = trainingTitle
    this.universe = universe
    this.duration = duration
    this.price = price
    this.url = url
  }

  toString () {
    return `date : ${this.date},trainingTitle : ${this.trainingTitle},universe : ${this.universe},duration : ${this.duration},price : ${this.price},url : ${this.url}`
  }
}

module.exports = {
  Training
}
