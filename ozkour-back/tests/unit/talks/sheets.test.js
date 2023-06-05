const sheet = require('../../../src/domain/talks-sheet')

describe('sheets', () => {
  it('should return only talk between 19-01-2021 and 25-01-2021', () => {
    const result = sheet.dateFilter(talks, '19-01-2021', '25-01-2021')
    expect(result).toMatchSnapshot()
  })
})

const talks = [
  {
    location: 'Singapour',
    eventType: 'Meetup',
    eventName: 'GraalVM Night',
    universe: '',
    date: '19/01/2021',
    speakers: 'Anne Imal',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    link: 'https://www.meetup.com/singajug/events/275681145/'
  },
  {
    location: 'Grenoble',
    eventType: 'NightClazz',
    eventName: 'NightClass',
    universe: '',
    date: '19/01/2021',
    speakers: 'Yves Rogne',
    talkTitle: 'Migration JS vers TS sur du react'
  },
  {
    location: 'Nantes',
    eventType: 'Meetup',
    eventName: 'Nantes JS #55',
    universe: '',
    date: '21/01/2021',
    speakers: 'Guy Tarenbois',
    talkTitle: 'Nuxt 2021',
    link: 'https://twitter.com/NantesJS/status/1351104198436392964'
  },
  {
    location: 'Mix',
    eventType: 'Autre',
    eventName: 'Webinar Strigo',
    universe: '',
    date: '21/01/2021',
    speakers: 'Sarah Pelle',
    talkTitle: 'Simplify Remote Hands-On Training and Improve Engagement',
    link: 'https://zoom.us/webinar/register/9516106320701/WN_xAAafGs2SOGbWFub-8dGJg\nhttps://trainingindustry.com/webinar/remote-learning/product-demo-simplify-remote-hands-on-training-and-improve-engagement/'
  },
  {
    location: 'Nantes',
    eventType: 'NightClazz',
    eventName: 'RemoteClazz Nodejs',
    universe: '',
    date: '25/01/2021',
    speakers: 'Sophie Stiqué',
    talkTitle: 'Techniques minimalistes pour Node.js',
    link: 'https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/'
  },
  {
    location: 'Rennes',
    eventType: 'Meetup',
    eventName: 'DejTech Green IT',
    universe: '',
    date: '26/01/2021',
    speakers: 'Alin Verse',
    talkTitle: 'Introduction au numérique responsable',
    link: 'https://www.meetup.com/fr-FR/dejtech/events/275866319'
  }
]
