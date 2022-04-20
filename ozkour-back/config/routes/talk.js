const { getTalkFromDate } = require("../../google-api/sheets");

module.exports = [
    {
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
     method: 'GET',
     path: '/talk',
     handler: function (request, h) {
        return getTalkFromDate(request.query.start,request.query.end);
    }},
    
    //{ method: 'GET', path: '/talk/{id}', handler: function () {} }
];