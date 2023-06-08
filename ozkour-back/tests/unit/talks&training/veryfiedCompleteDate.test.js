const { verifyedCompletetData } = require('@/utils/veryfiedCompletData')
const { TALK_SHEET } = require('@/constantes/constantes')

const talksWithUndefinedValue = [
  {
    eventType: 'Meetup',
    eventName: 'GraalVM Night',
    universe: 'web',
    date: '19/01/2021',
    speakers: 'Anne Imal',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    url: 'https://www.meetup.com/singajug/events/275681145/',
    indexLine: 10
  },
  {
    eventType: 'NightClazz',
    eventName: 'NightClass',
    universe: 'toto',
    date: '19/01/2021',
    speakers: 'Yves Rogne',
    talkTitle: 'Migration JS vers TS sur du react',
    url: 'https://www.meetup.com/singajug/events/275681145/',
    indexLine: 11
  },
  {
    eventType: 'Meetup',
    eventName: 'Nantes JS #55',
    universe: 'web',
    date: '21/01/2021',
    speakers: 'Guy Tarenbois',
    talkTitle: 'Nuxt 2021',
    url: 'https://twitter.com/NantesJS/status/1351104198436392964',
    indexLine: 12
  },
  {
    eventType: 'Autre',
    eventName: 'Webinar Strigo',
    universe: 'Web',
    date: '21/01/2021',
    speakers: 'Sarah Pelle',
    talkTitle: 'Simplify Remote Hands-On Training and Improve Engagement',
    url: 'https://zoom.us/webinar/register',
    indexLine: 13
  },
  {
    eventType: '',
    eventName: 'RemoteClazz Nodejs',
    universe: 'Back',
    date: '25/01/2021',
    speakers: 'Sophie Stiqué',
    talkTitle: 'Techniques minimalistes pour Node.js',
    url: 'https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/',
    indexLine: 14
  },
  {
    eventType: 'Meetup',
    eventName: 'DejTech Green IT',
    universe: '',
    date: '26/01/2021',
    speakers: 'Alin Verse',
    talkTitle: 'Introduction au numérique responsable',
    url: 'https://www.meetup.com/fr-FR/dejtech/events/275866319',
    indexLine: 15
  }
]

const talksWithNoUndefinedValue = [
  {
    eventType: 'Meetup',
    eventName: 'GraalVM Night',
    universe: 'web',
    date: '19/01/2021',
    speakers: 'Anne Imal',
    talkTitle: 'GraalVM for Sustainable Software Development?',
    url: 'https://www.meetup.com/singajug/events/275681145/',
    indexLine: 10
  },
  {
    eventType: 'NightClazz',
    eventName: 'NightClass',
    universe: 'web',
    date: '19/01/2021',
    speakers: 'Yves Rogne',
    talkTitle: 'Migration JS vers TS sur du react',
    url: 'https://www.meetup.com/singajug/events/275681145/',
    indexLine: 11
  },
  {
    eventType: 'Meetup',
    eventName: 'Nantes JS #55',
    universe: 'web',
    date: '21/01/2021',
    speakers: 'Guy Tarenbois',
    talkTitle: 'Nuxt 2021',
    url: 'https://twitter.com/NantesJS/status/1351104198436392964',
    indexLine: 12
  },
  {
    eventType: 'Autre',
    eventName: 'Webinar Strigo',
    universe: 'web',
    date: '21/01/2021',
    speakers: 'Sarah Pelle',
    talkTitle: 'Simplify Remote Hands-On Training and Improve Engagement',
    url: 'https://zoom.us/webinar/register',
    indexLine: 13
  },
  {
    eventType: 'NightClazz',
    eventName: 'RemoteClazz Nodejs',
    universe: 'web',
    date: '25/01/2021',
    speakers: 'Sophie Stiqué',
    talkTitle: 'Techniques minimalistes pour Node.js',
    url: 'https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/',
    indexLine: 14
  },
  {
    eventType: 'Meetup',
    eventName: 'DejTech Green IT',
    universe: 'web',
    date: '26/01/2021',
    speakers: 'Alin Verse',
    talkTitle: 'Introduction au numérique responsable',
    url: 'https://www.meetup.com/fr-FR/dejtech/events/275866319',
    indexLine: 14
  }
]

const resultTestIndex = [14, 15]

describe('validate completeness of data', () => {
  test('should render two arrays', () => {
    const result = verifyedCompletetData(talksWithUndefinedValue, TALK_SHEET)
    expect(result).toHaveLength(2)
  })
  test('should render the second array with a length of 2', () => {
    const result = verifyedCompletetData(talksWithUndefinedValue, TALK_SHEET)
    expect(result[1]).toHaveLength(2)
  })
  test('should render the second array with values of 14 & 15', () => {
    const result = verifyedCompletetData(talksWithUndefinedValue, TALK_SHEET)
    expect(result[1]).toEqual(resultTestIndex)
  })
  test('should return only one array with 6 objects', () => {
    const result = verifyedCompletetData(talksWithNoUndefinedValue, TALK_SHEET)
    expect(result[0]).toHaveLength(6)
  })
  test('should return one array with length = 0', () => {
    const result = verifyedCompletetData(TALK_SHEET)
    expect(result).toHaveLength(0)
  })
})
