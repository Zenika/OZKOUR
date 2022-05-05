
const { getTalkFromDate } = require("../../google-api/sheets");

module.exports = [
    {
    method: 'GET',
    path: '/talk',
    handler: function (request, h) {
        return getTalkFromDate(request.query.start,request.query.end);
    }},
    //{ method: 'GET', path: '/talk/{id}', handler: function () {} }
    {
        method: 'POST',
        path: '/selected-talks',
        handler: function (request, h) {
            return {
                date: request.payload.date,    
                universe: request.payload.universe,
                eventType: request.payload.eventType,
                eventName: request.payload.eventName,
                talkTitle: request.payload.talkTitle,
                speakers: request.payload.speakers,
            }
        },
    }
];
