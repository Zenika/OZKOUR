'use strict';

require('dotenv').config()
const Hapi = require('@hapi/hapi');
const test = require('./google-api/slide');
const credentials = require("./config/auth/credentials.json");
//const test2 = require('./utilitary');
const connect = require('./google-api/connect')
const routes = require('./config/routes');
const Qs = require('qs');

const init = async () => {
    const port = process.env.PORT

    const server = Hapi.server({
        port: port,
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

    const auth = await connect.auth();
    console.log('CRED ', credentials)
    // server.route(routes);

    // const talkSelected = [
    //     {
    //       date: "19/01/2021",
    //       universe: "",
    //       eventType: "Meetup",
    //       eventName: "GraalVM Night",
    //       talkTitle: "GraalVM for Sustainable Software Development?",
    //       speakers: "Adrien Nortain",
    //     },
    //     {
    //       date: "19/01/2021",
    //       universe: "",
    //       eventType: "NightClazz",
    //       eventName: "NightClass",
    //       talkTitle: "Migration JS vers TS sur du react",
    //       speakers: "Jules Hablot",
    //     },
    //     {
    //       date: "21/01/2021",
    //       universe: "",
    //       eventType: "Meetup",
    //       eventName: "Webinar Strigo",
    //       talkTitle: "Nuxt 2021",
    //       speakers: "Yann Bertrand",
    //     },
    //     {
    //       date: "21/01/2021",
    //       universe: "",
    //       eventType: "Autre",
    //       eventName: "Webinar Strigo",
    //       talkTitle: "Simplify Remote Hands-On Training and Improve Engagement",
    //       speakers: "Yoan Rousseau / Oliver Huber",
    //     },
    //     {
    //       date: "25/01/2021",
    //       universe: "",
    //       eventType: "NightClazz",
    //       eventName: "RemoteClazz Nodejs",
    //       talkTitle: "Techniques minimalistes pour Node.js",
    //       speakers: "Hugo Wood",
    //     },
    //   ];
    
    // //console.log(test.createSlideFromTalks(talkSelected))
    // // console.log(await test.getTalkFromDate('01/01/2021','28/02/2021'))
    // console.log(connect.auth());
    //await server.start();
    // console.log(connect.auth());
    // console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init()