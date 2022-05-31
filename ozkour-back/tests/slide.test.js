const slide = require("../google-api/slide");
test("check clustering by date and by EventName", () => {
  expect(slide.clusterByDate(talks)).toEqual(talkClusteredByDate);
});

const talks = [
  {
    date: "19/01/2021",
    universe: "",
    eventType: "Meetup",
    eventName: "GraalVM Night",
    talkTitle: "GraalVM for Sustainable Software Development?",
    speakers: "Adrien Nortain",
  },
  {
    date: "19/01/2021",
    universe: "",
    eventType: "NightClazz",
    eventName: "NightClass",
    talkTitle: "Migration JS vers TS sur du react",
    speakers: "Jules Hablot",
  },
  {
    date: "21/01/2021",
    universe: "",
    eventType: "Meetup",
    eventName: "Webinar Strigo",
    talkTitle: "Nuxt 2021",
    speakers: "Yann Bertrand",
  },
  {
    date: "21/01/2021",
    universe: "",
    eventType: "Autre",
    eventName: "Webinar Strigo",
    talkTitle: "Simplify Remote Hands-On Training and Improve Engagement",
    speakers: "Yoan Rousseau / Oliver Huber",
  },
  {
    date: "25/01/2021",
    universe: "",
    eventType: "NightClazz",
    eventName: "RemoteClazz Nodejs",
    talkTitle: "Techniques minimalistes pour Node.js",
    speakers: "Hugo Wood",
  },
];

const firstEvent = {
  eventName: "GraalVM Night",
  talks: [
    {
      universe: "",
      eventType: "Meetup",
      talkTitle: "GraalVM for Sustainable Software Development?",
      speakers: "Adrien Nortain",
    },
  ],
};
const secondEvent = {
    eventName: "NightClass",
    talks: [
        {
            universe: "",
            eventType: "NightClazz",
            talkTitle: "Migration JS vers TS sur du react",
            speakers: "Jules Hablot",
        },
    ],
  };
  const thirdEvent = {
    eventName: "Webinar Strigo",
    talks: [
      {
        universe: "",
        eventType: "Meetup",
        talkTitle: "Nuxt 2021",
        speakers: "Yann Bertrand",
      },
      {
        universe: "",
        eventType: "Autre",
        talkTitle: "Simplify Remote Hands-On Training and Improve Engagement",
        speakers: "Yoan Rousseau / Oliver Huber",
      },
    ],
  };
  const fourthEvent = {
    eventName: "RemoteClazz Nodejs",
    talks: [
      {
        universe: "",
        eventType: "NightClazz",
        talkTitle: "Techniques minimalistes pour Node.js",
        speakers: "Hugo Wood",
      },
    ],
  };

const talkClusteredByDate = new Map([
    ['19/01/2021', [firstEvent,secondEvent]],
    ['21/01/2021', [thirdEvent]],
    ['25/01/2021', [fourthEvent]]
  ]);
  