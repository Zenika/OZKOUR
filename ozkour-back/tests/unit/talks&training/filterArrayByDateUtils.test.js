const {
  dateAndCompletDataFilter
} = require('@/domain/utils/veryfiedCompletData')

const ArrayTrainingOrTalks = [
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

const variables = 'talk_sheet'

describe('date filter', () => {
  it('should return only talk between 19/01/2021 and 25/012021', () => {
    const result = dateAndCompletDataFilter(
      ArrayTrainingOrTalks,
      variables,
      '19/01/2021',
      '25/01/2021'
    )
    expect(result).toMatchSnapshot()
  })
  it('should return an array with a length of 4', () => {
    const result = dateAndCompletDataFilter(
      ArrayTrainingOrTalks,
      variables,
      '19/01/2021',
      '24/01/2021'
    )
    expect(result.res.length).toEqual(4)
  })
})
