const { logger } = require('../logger')
module.exports = [
  {
    method: '*',
    path: '/{any*}',
    options: {
      auth: false
    },
    handler: function (request, h) {
      logger.warn({
        message: `request on: ${request.path} generated a 404 error`
      })
      const reply = {
        statusCode: 404,
        error: 'Not Found'
      }
      return h.response(reply).code(404)
    }
  }
]
