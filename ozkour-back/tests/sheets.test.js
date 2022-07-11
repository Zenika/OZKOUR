const sheet = require('../infrastructure/googlesheets/sheets')
test('convert date in month written', () => {
  // sheet.dateFilter(talks, '19/01/2021', '21/01/2021')
  const result = sheet.dateFilter(talks, '19-01-2021', '25-01-2021')
  talks.pop()
  expect(result).toEqual(talks)
})

const talks = [
  [
    'Singapour',
    'Meetup',
    'GraalVM Night',
    '',
    '19/01/2021',
    'Anne Imal',
    'GraalVM for Sustainable Software Development?',
    'https://www.meetup.com/singajug/events/275681145/'
  ],
  [
    'Grenoble',
    'NightClazz',
    'NightClass',
    '',
    '19/01/2021',
    'Yves Rogne',
    'Migration JS vers TS sur du react'
  ],
  [
    'Nantes',
    'Meetup',
    'Nantes JS #55',
    '',
    '21/01/2021',
    'Guy Tarenbois',
    'Nuxt 2021',
    'https://twitter.com/NantesJS/status/1351104198436392964'
  ],
  [
    'Mix',
    'Autre',
    'Webinar Strigo',
    '',
    '21/01/2021',
    'Yoan Rousseau / Oliver Huber',
    'Simplify Remote Hands-On Training and Improve Engagement',
    'https://zoom.us/webinar/register/9516106320701/WN_xAAafGs2SOGbWFub-8dGJg\nhttps://trainingindustry.com/webinar/remote-learning/product-demo-simplify-remote-hands-on-training-and-improve-engagement/'
  ],
  [
    'Nantes',
    'NightClazz',
    'RemoteClazz Nodejs',
    '',
    '25/01/2021',
    'Sophie Stiqué',
    'Techniques minimalistes pour Node.js',
    'https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/'
  ],
  [
    'Rennes',
    'Meetup',
    'DejTech Green IT',
    '',
    '26/01/2021',
    'Serge Hardy',
    'Introduction au numérique responsable',
    'https://www.meetup.com/fr-FR/dejtech/events/275866319'
  ]
]
