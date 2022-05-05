'use strict';

require('dotenv').config()
const Hapi = require('@hapi/hapi');
const connect = require('./google-api/connect.js');
const test = require('./google-api/sheets');
const test2 = require('./utilitary');
const routes = require('./config/routes');
const Qs = require('qs');

const init = async () => {
    const port = process.env.PORT

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: [process.env.ALLOWED_DOMAIN],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        query: {
            parser: (query) => Qs.parse(query)
        }
    });

    // "Home" Route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    // "Error" Route
    server.route({
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return '404 Error! Page Not Found!';
        }
    });

    connect.auth();
    server.route(routes);

    // console.log(test2.convDateToMonth('10/01/2022'))
    // console.log(await test.getTalkFromDate('01/01/2021','28/02/2021'))

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init()