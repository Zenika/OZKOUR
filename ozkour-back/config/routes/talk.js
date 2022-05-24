
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
            return request.payload
        },
    }
];
