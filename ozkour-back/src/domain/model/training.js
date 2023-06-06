class Training {
  constructor ({ title, universe, duration, price, url,date, indexLine }) {
    this.title = title,
    this.universe = universe,
    this.duration = duration, 
    this.price = price,
    this.url = url,
    this.date= date,
    this.indexLine = indexLine
  }

  toString () {
    return `title : ${this.title},
    universe : ${this.universe},
    duration : ${this.duration},
    price : ${this.price},
    url : ${this.url},
    date : ${this.date},
    indexLine : ${this.indexLine},
    `
  }
}

module.exports = {
  Training
}
