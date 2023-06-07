const date = require('../../../src/utils/filterArrayByDateUtils')

const talks = [
  [
    {
      location: 'Singapour',
      eventType: 'Meetup',
      eventName: 'GraalVM Night',
      universe: 'web',
      date: '19/01/2021',
      speakers: 'Anne Imal',
      talkTitle: 'GraalVM for Sustainable Software Development?',
      link: 'https://www.meetup.com/singajug/events/275681145/',
      indexLine: 10
    },
    {
      location: 'Grenoble',
      eventType: 'NightClazz',
      eventName: 'NightClass',
      universe: 'web',
      date: '19/01/2021',
      speakers: 'Yves Rogne',
      talkTitle: 'Migration JS vers TS sur du react',
      link: 'https://www.meetup.com/singajug/events/275681145/',
      indexLine: 11
    },
    {
      location: 'Nantes',
      eventType: 'Meetup',
      eventName: 'Nantes JS #55',
      universe: 'web',
      date: '21/01/2021',
      speakers: 'Guy Tarenbois',
      talkTitle: 'Nuxt 2021',
      link: 'https://twitter.com/NantesJS/status/1351104198436392964',
      indexLine: 12
    },
    {
      location: 'Mix',
      eventType: 'Autre',
      eventName: 'Webinar Strigo',
      universe: 'web',
      date: '21/01/2021',
      speakers: 'Sarah Pelle',
      talkTitle: 'Simplify Remote Hands-On Training and Improve Engagement',
      link: 'https://zoom.us/webinar/register',
      indexLine: 13
    },
    {
      location: 'Nantes',
      eventType: 'NightClazz',
      eventName: 'RemoteClazz Nodejs',
      universe: 'web',
      date: '25/01/2021',
      speakers: 'Sophie Stiqué',
      talkTitle: 'Techniques minimalistes pour Node.js',
      link: 'https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/',
      indexLine: 14
    },
    {
      location: 'Rennes',
      eventType: 'Meetup',
      eventName: 'DejTech Green IT',
      universe: 'web',
      date: '26/01/2021',
      speakers: 'Alin Verse',
      talkTitle: 'Introduction au numérique responsable',
      link: 'https://www.meetup.com/fr-FR/dejtech/events/275866319',
      indexLine: 14
    }
  ]
]

const talksWithUndefinedValue = [
  [
    {
      location: 'Singapour',
      eventType: 'Meetup',
      eventName: 'GraalVM Night',
      universe: 'web',
      date: '19/01/2021',
      speakers: 'Anne Imal',
      talkTitle: 'GraalVM for Sustainable Software Development?',
      link: 'https://www.meetup.com/singajug/events/275681145/',
      indexLine: 10
    },
    {
      location: 'Grenoble',
      eventType: 'NightClazz',
      eventName: 'NightClass',
      universe: 'web',
      date: '19/01/2021',
      speakers: 'Yves Rogne',
      talkTitle: 'Migration JS vers TS sur du react',
      link: 'https://www.meetup.com/singajug/events/275681145/',
      indexLine: 11
    },
    {
      location: 'Nantes',
      eventType: 'Meetup',
      eventName: 'Nantes JS #55',
      universe: '',
      date: '21/01/2021',
      speakers: 'Guy Tarenbois',
      talkTitle: 'Nuxt 2021',
      link: 'https://twitter.com/NantesJS/status/1351104198436392964',
      indexLine: 12
    },
    {
      location: 'Mix',
      eventType: 'Autre',
      eventName: 'Webinar Strigo',
      universe: '',
      date: '21/01/2021',
      speakers: 'Sarah Pelle',
      talkTitle: 'Simplify Remote Hands-On Training and Improve Engagement',
      link: 'https://zoom.us/webinar/register',
      indexLine: 13
    },
    {
      location: 'Nantes',
      eventType: 'NightClazz',
      eventName: 'RemoteClazz Nodejs',
      universe: '',
      date: '25/01/2021',
      speakers: 'Sophie Stiqué',
      talkTitle: 'Techniques minimalistes pour Node.js',
      link: 'https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/',
      indexLine: 14
    },
    {
      location: 'Rennes',
      eventType: 'Meetup',
      eventName: 'DejTech Green IT',
      universe: 'web',
      date: '26/01/2021',
      speakers: 'Alin Verse',
      talkTitle: 'Introduction au numérique responsable',
      link: 'https://www.meetup.com/fr-FR/dejtech/events/275866319',
      indexLine: 14
    }
  ],
  [14, 13, 12]
]

describe('date filter', () => {
  it('should return an empty array', () => {
    const result = date.dateFilter()
    expect(result).toHaveLength(0)
  })
  it('should return only talk between 19-01-2021 and 25-012021', () => {
    const result = date.dateFilter(talks, '19-01-2021', '25-01-2021')
    expect(result).toMatchSnapshot()
  })
  it('should return an array with a length of 2', () => {
    const result = date.dateFilter(
      talksWithUndefinedValue,
      '19-01-2021',
      '25-01-2021'
    )
    expect(result.length).toBe(2)
  })
})
