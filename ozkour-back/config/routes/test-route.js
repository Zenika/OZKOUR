module.exports = [
  {
    method: 'GET',
    path: '/ping',
    handler: function (request, h) {
      return h.response('OK!').code(200)
    }
  }
]
