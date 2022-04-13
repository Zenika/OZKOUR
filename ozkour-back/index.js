'use strict';

const Hapi = require('@hapi/hapi');
const connect = require('./google-api/connect.js');
const sheets = require('./google-api/sheets.js');
const routes = require('./config/routes');
const Qs = require('qs');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        query: {
            parser: (query) => Qs.parse(query)
        }
    });

    connect.auth();
    server.route(routes);
    await server.start();
    //console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init()