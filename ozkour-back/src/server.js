'use strict'

require('dotenv').config()
const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const Qs = require('qs')
const { logger } = require('./logger')

const port = process.env.PORT

const server = Hapi.server({
  port,
  host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
  },
  query: {
    parser: (query) => Qs.parse(query)
  }
})

exports.init = async () => {
  await server.initialize()
  server.route(routes)
  return server
}

exports.start = async () => {
  await server.start()
  logger.info({
    message: `Server running on: ${server.info.uri}`
  })
  return server
}

process.on('unhandledRejection', (err) => {
  logger.error({
    message: `${err}`
  })
  throw err
})

server.ext('onPreResponse', function (request, h) {
  if (request.response.isBoom) {
    logger.error({
      message: `${request.response}`
    })
  }

  return h.continue
})
