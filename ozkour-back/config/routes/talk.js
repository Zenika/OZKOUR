
const { getTalk } = require('../../domain/talks-sheet')

const { createSlides } = require('../../domain/slideService')

module.exports = [
  {
    method: 'GET',
    path: '/talk',
    handler: function (request, h) {
      return getTalk(request.query.start, request.query.end)
    }
  },

  {
    method: 'POST',
    path: '/selected-talks',
    handler: async function (request, h) {
      try {
        const talks = request.payload
        const res = await createSlides(talks)
        return h.response(res).code(200)
      } catch (e) {
        console.log(e)
        return h.response(e).code(500)
      }
    }
  }
]
