const slide = require('../google-api/slide')
test('check clustering by date and by EventName', () => {
  expect(slide.clusterByDate(talks)).toEqual(talkClusteredByDate)
})

const talks = [
  {
    date: '19/01/2021',
    universe: '',
    eventType: 'Meetup',
    eventName: 'GraalVM Night',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    speakers: 'Adrien Nortain'
  },
  {
    date: '19/01/2021',
    universe: '',
    eventType: 'NightClazz',
    eventName: 'NightClass',
    talkTitle: 'Migration JS vers TS sur du react',
    speakers: 'Jules Hablot'
  },
  {
    date: '21/01/2021',
    universe: '',
    eventType: 'Meetup',
    eventName: 'Webinar Strigo',
    talkTitle: 'Nuxt 2021',
    speakers: 'Yann Bertrand'
  },
  {
    date: '21/01/2021',
    universe: '',
    eventType: 'Autre',
    eventName: 'Webinar Strigo',
    talkTitle: 'Simplify Remote Hands-On Training and Improve Engagement',
    speakers: 'Yoan Rousseau / Oliver Huber'
  },
  {
    date: '25/01/2021',
    universe: '',
    eventType: 'NightClazz',
    eventName: 'RemoteClazz Nodejs',
    talkTitle: 'Techniques minimalistes pour Node.js',
    speakers: 'Hugo Wood'
  }
]

const firstEvent = {
  eventName: 'GraalVM Night',
  eventType: 'Meetup',
  talks: [
    {
      universe: '',
      talkTitle: 'GraalVM for Sustainable Software Development?',
      speakers: 'Adrien Nortain'
    }
  ]
}
const secondEvent = {
  eventName: 'NightClass',
  eventType: 'NightClazz',
  talks: [
    {
      universe: '',
      talkTitle: 'Migration JS vers TS sur du react',
      speakers: 'Jules Hablot'
    }
  ]
}
const thirdEvent = {
  eventName: 'Webinar Strigo',
  eventType: 'Meetup',
  talks: [
    {
      universe: '',
      talkTitle: 'Nuxt 2021',
      speakers: 'Yann Bertrand'
    },
    {
      universe: '',
      talkTitle: 'Simplify Remote Hands-On Training and Improve Engagement',
      speakers: 'Yoan Rousseau / Oliver Huber'
    }
  ]
}
const fourthEvent = {
  eventName: 'RemoteClazz Nodejs',
  eventType: 'NightClazz',
  talks: [
    {
      universe: '',
      talkTitle: 'Techniques minimalistes pour Node.js',
      speakers: 'Hugo Wood'
    }
  ]
}

const talkClusteredByDate = [
  new Map([
    ['19/01/2021', [firstEvent, secondEvent]]]),
  new Map([
    ['21/01/2021', [thirdEvent]],
    ['25/01/2021', [fourthEvent]]])
]
