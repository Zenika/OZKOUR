const { TALK_SHEET } = require('@/ui/utils/constantes')
const { verifyedCompletetData } = require('@/domain/utils/veryfiedCompletData')

const talksOrFormationsArray = [
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
    date: '',
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
    eventType: 'Web',
    eventName: 'RemoteClazz Nodejs',
    universe: 'Back',
    date: '',
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

const resultTestIndex = [11, 14, 15]

describe('validate completeness of data', () => {
  test('should render one object with two arrays', () => {
    const result = verifyedCompletetData(talksOrFormationsArray, TALK_SHEET)
    expect(result).toEqual({ res: result.res, warn: resultTestIndex })
  })
  test('should render the warn array with a length of 3', () => {
    const result = verifyedCompletetData(talksOrFormationsArray, TALK_SHEET)
    expect(result.warn).toHaveLength(3)
  })
  test('should render the second array with values of 11 14 & 15', () => {
    const result = verifyedCompletetData(talksOrFormationsArray, TALK_SHEET)
    expect(result.warn).toEqual(resultTestIndex)
  })
})
