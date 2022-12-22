export function dataSetFactory () {
  const talks = {
    graalVM: {
      date: '19/01/2021',
      universe: '',
      eventType: 'Meetup',
      eventName: 'GraalVM Night',
      talkTitle: 'GraalVM for Sustainable Software Development?',
      speakers: 'Bob Hinne',
      checked: true
    },
    nightClass: {
      date: '19/01/2021',
      universe: '',
      eventType: 'NightClazz',
      eventName: 'NightClass',
      talkTitle: 'Migration JS vers TS sur du react',
      speakers: 'Claire Delune',
      checked: true
    }
  }

  const allTalks = [
    talks.graalVM,
    talks.nightClass
  ]

  const templates = {
    QUOI_DE_9: {
      id: 'quoide9',
      label: 'QUOI DE 9',
      value: 'QuoiDeNeuf',
      frequency: 'week',
      validated: true
    },
    EMAILING: {
      id: 'emailing',
      label: 'E-MAILING',
      value: 'E-mailing',
      frequency: 'month',
      validated: true
    },
    MEETUP: {
      id: 'meetup',
      label: 'MEET-UP',
      value: 'Meet-up',
      frequency: 'month',
      validated: false
    },
    SLACK: {
      id: 'slack',
      label: 'SLACK',
      value: 'Slack',
      frequency: 'month',
      validated: false
    }
  }

  const allTemplates = [
    templates.EMAILING,
    templates.QUOI_DE_9,
    templates.MEETUP,
    templates.SLACK
  ]

  const columns = [
    { key: 'date', label: 'DATE' },
    { key: 'universe', label: 'UNIVERS' },
    { key: 'eventType', label: 'TYPE' },
    { key: 'eventName', label: "NOM DE L'EVENEMENT" },
    { key: 'talkTitle', label: 'TITRE DU TALK' },
    { key: 'speakers', label: 'SPEAKERS' }
  ]

  return { talks, allTalks, templates, allTemplates, columns }
}
