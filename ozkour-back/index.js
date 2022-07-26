'use strict'
const server = require('./server')

const start = async () => {
  await server.init()
  await server.start()
}

start()
