'use strict'

require('dotenv').config()
const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const Qs = require('qs')
const { logger } = require('./logger')
const jwt = require('@hapi/jwt')

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
  await initAuth()
  await server.initialize()
  server.route(routes)
  return server
}

const initAuth = async () => {
  await server.register(jwt)
  server.auth.strategy('my_jwt_strategy', 'jwt', {
    keys: {
      uri: process.env.AUTH_JWKS_URI,
      headers: { 'x-org-name': process.env.AUTH_ORG_NAME },
      algorithms: ['RS256']
    },
    verify: {
      aud: process.env.AUTH_AUDIENCE,
      iss: process.env.AUTH_ISSUER,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 7200, // 2 hours
      timeSkewSec: 15
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.user }
      }
    }
  })
  server.auth.default('my_jwt_strategy')
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
