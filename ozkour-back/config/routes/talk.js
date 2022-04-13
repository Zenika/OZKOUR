const { getTalkFromDate } = require("../../google-api/sheets");
//const sheets = require('../google-api/sheets')
function test(request){
    console.log(request)
}

module.exports = [
    {
     method: 'GET',
     path: '/talk',
     handler: function (request, h) {
        return getTalkFromDate(request.query.start,request.query.end);
    }},
    // {method: 'POST',
    // path: '/talks',
    // handler: function (request, h) {

    //     const payload = request.payload;

    //     return `Welcome ${payload.username}!`;
    // }},
    
    //{ method: 'GET', path: '/users/{id}', handler: function () {} }
];