'use strict'

require('dotenv').config()
const Hapi = require('@hapi/hapi')
const connect = require('./google-api/connect')
const routes = require('./config/routes')
const Qs = require('qs')

const init = async () => {
  const port = process.env.PORT

  const server = Hapi.server({
    port,
    host: 'localhost',
    routes: {
      cors: {
        origin: [process.env.ALLOWED_DOMAIN],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    },
    query: {
      parser: (query) => Qs.parse(query)
    }
  })

  connect.auth()
  server.route(routes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

const initTest = async () => {
  const port = '3001'

  const server = Hapi.server({
    port,
    host: 'localhost',
    routes: {
      cors: {
        origin: [process.env.ALLOWED_DOMAIN],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    },
    query: {
      parser: (query) => Qs.parse(query)
    }
  })

  connect.auth()
  server.route(routes)
  await server.start()
  await server.stop()
  return true
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

module.exports = {
  initTest
}
