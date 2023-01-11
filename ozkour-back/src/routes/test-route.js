module.exports = [
  {
    method: 'GET',
    path: '/ping',
    options: {
      auth: false
    },
    handler: function (request, h) {
      return h.response('OK!').code(200)
    }
  }
]
