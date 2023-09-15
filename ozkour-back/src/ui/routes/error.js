const { logger } = require('../../logger')
module.exports = [
  {
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      logger.warn({
        message: `request on: ${request.path} generated a 404 error`
      })
      return '404 Error! Page Not Found!'
    }
  }
]
