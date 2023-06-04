class Training {
  constructor ({ trainingTitle, universe, duration, price, link,date, indexLine }) {
    this.trainingTitle = trainingTitle,
    this.universe = universe,
    this.duration = duration, 
    this.price = price,
    this.link = link,
    this.date= date
    this.indexLine = indexLine
  }

  toString () {
    return `trainingTitle : ${this.trainingTitle},
    universe : ${this.universe},
    duration : ${this.duration},
    price : ${this.price},
    link : ${this.link},
    date : ${this.date},
    indexLine : ${this.indexLine},
    `
  }
}

module.exports = {
  Training
}
