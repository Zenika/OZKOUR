
const { getTalkFromDate } = require("../../google-api/sheets");

const { createSlideFromTalks } = require("../../google-api/slide");

module.exports = [
    {
    method: 'GET',
    path: '/talk',
    handler: function (request, h) {
        return getTalkFromDate(request.query.start,request.query.end);
    }},
  
    {
        method: 'POST',
        path: '/selected-talks',
        handler: function (request, h) {
            return createSlideFromTalks(request.payload);
        },
    }
];
