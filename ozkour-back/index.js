'use strict'

require('dotenv').config()
const Hapi = require('@hapi/hapi')
const connect = require('./google-api/connect')
const routes = require('./config/routes')
const Qs = require('qs')

const init = async () => {
  const port = '3000'
  const server = Hapi.server({
    port,
    host: '0.0.0.0',
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

  connect.auth()
  server.route(routes)

  await server.start()
  console.log(connect.auth())
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
