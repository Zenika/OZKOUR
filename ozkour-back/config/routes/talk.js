
const { getTalkFromDate } = require('../../google-api/sheets')

const { createSlideFromTalks } = require('../../google-api/slide')

module.exports = [
  {
    method: 'GET',
    path: '/talk',
    handler: function (request, h) {
<<<<<<< HEAD
      return getTalkFromDate(request.query.start, request.query.end)
=======
        return getTalkFromDate(request.query.start,request.query.end);
    }},
  
    {
        method: 'POST',
        path: '/selected-talks',
        handler: function (request, h) {
            return createSlideFromTalks(request.payload,h);
        },
>>>>>>> 8290c42 (added backend return message slide request)
    }
  },

  {
    method: 'POST',
    path: '/selected-talks',
    handler: function (request, h) {
      return createSlideFromTalks(request.payload)
    }
  }
]
