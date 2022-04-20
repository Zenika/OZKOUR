require('dotenv').config()
const Hapi = require('@hapi/hapi');
const connect = require('./google-api/connect.js');
const test = require('./google-api/sheets');
const test2 = require('./utilitary');
const routes = require('./config/routes');
const Qs = require('qs');

const port = process.env.PORT

const init = async () => {

    const server = Hapi.server({
        port: port,
        host: 'localhost',
        query: {
            parser: (query) => Qs.parse(query)
        }
    });

    connect.auth();
    server.route(routes);

    // console.log(test2.convDateToMonth('10/01/2022'))
    // console.log(await test.getTalkFromDate('01/01/2021','28/02/2021'))

    await server.start();

    //console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init()