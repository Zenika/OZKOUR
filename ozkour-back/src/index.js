'use strict'
require('module-alias/register')
const server = require('./server')

const start = async () => {
  await server.init()
  await server.start()
}

start()
