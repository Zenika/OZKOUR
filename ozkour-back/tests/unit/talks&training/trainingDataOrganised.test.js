const {
  clusterCommonUniverseAndDate,
  transformDateAndSelectData,
  sortByDate
} = require('../../../src/domain/trainingOrganizer')

const data = [
  {
    title: 'Développeurs Blockchain : Ethereum',
    universe: 'Blockchain',
    duration: '0',
    price: '1 530€',
    url: 'https://training.zenika.com/fr-fr/training/dev-blockchain-ethereum/description',
    date: '12/06/2023',
    indexLine: 30,
    checked: true
  },
  {
    title: 'Kafka : Confluent Administration',
    universe: 'Data & Data Science',
    duration: '3',
    price: '2 100€',
    url: 'https://training.zenika.com/fr-fr/training/confluent-operations-kafka/description',
    date: '12/06/2023',
    indexLine: 63,
    checked: true
  },
  {
    title: 'Professional Scrum Master Certifiante (Scrum.org)',
    universe: 'Agilité',
    duration: '2',
    price: '1 390€',
    url: 'https://training.zenika.com/fr-fr/training/psm/description',
    date: '12/06/2023',
    indexLine: 93,
    checked: true
  },
  {
    title: 'Java Design Patterns',
    universe: 'Craftsmanship',
    duration: '4',
    price: '2 250€',
    url: 'https://training.zenika.com/fr-fr/training/design-patterns/description',
    date: '13/06/2023',
    indexLine: 60,
    checked: true
  }
]

const dataSortByDate = [
  {
    title: 'Développeurs Blockchain : Ethereum',
    universe: 'Blockchain',
    duration: '0',
    price: '1 530€',
    url: 'https://training.zenika.com/fr-fr/training/dev-blockchain-ethereum/description',
    date: '12/06/2023',
    indexLine: 30,
    checked: true
  },
  {
    title: 'Kafka : Confluent Administration',
    universe: 'Data & Data Science',
    duration: '3',
    price: '2 100€',
    url: 'https://training.zenika.com/fr-fr/training/confluent-operations-kafka/description',
    date: '12/06/2023',
    indexLine: 63,
    checked: true
  },
  {
    title: 'Professional Scrum Master Certifiante (Scrum.org)',
    universe: 'Agilité',
    duration: '2',
    price: '1 390€',
    url: 'https://training.zenika.com/fr-fr/training/psm/description',
    date: '12/06/2023',
    indexLine: 93,
    checked: true
  },
  {
    title: 'Java Design Patterns',
    universe: 'Craftsmanship',
    duration: '4',
    price: '2 250€',
    url: 'https://training.zenika.com/fr-fr/training/design-patterns/description',
    date: '13/06/2023',
    indexLine: 60,
    checked: true
  }
]

const dataResult = [
  {
    title: 'Développeurs Blockchain : Ethereum',
    universe: 'Blockchain',
    date: 'Le 12 juin.'
  },
  {
    title: 'Kafka : Confluent Administration',
    universe: 'Data & Data Science',
    date: 'Du 12 juin au 14 juin.'
  },
  {
    title: 'Professional Scrum Master Certifiante (Scrum.org)',
    universe: 'Agilité',
    date: 'Du 12 juin au 13 juin.'
  },
  {
    title: 'Java Design Patterns',
    universe: 'Craftsmanship',
    date: 'Du 13 juin au 16 juin.'
  }
]

describe('When service get the data', () => {
  it('then it should sort by date', () => {
    const transformedData = sortByDate(data)
    expect(transformedData).toEqual(dataSortByDate)
  })

  it('then transform in date format', () => {
    const transformedDate = transformDateAndSelectData(data)
    expect(transformedDate[0].date).toEqual('Le ' + '12 juin' + '.')
    expect(transformedDate[1].date).toEqual(
      'Du ' + '12 juin' + ' au ' + '14 juin' + '.'
    )
    expect(transformedDate[3].date).toEqual(
      'Du ' + '13 juin' + ' au ' + '16 juin' + '.'
    )
  })
  it('then return structure data changed', () => {
    const newdata = transformDateAndSelectData(dataSortByDate)
    expect(newdata).toEqual(dataResult)
  })

  it('then should transorm data and select propreties', () => {
    const newdata = transformDateAndSelectData(dataSortByDate)
    expect(newdata).toEqual(dataResult)
  })
  it('then should cluster the data by commun univers and date', () => {
    const training = [
      {
        title: 'Initiation aux tests automatisés',
        universe: 'Devops',
        date: 'Du 29 juin au 30 juin.'
      },
      {
        title: 'Professional Scrum Product Owner Certifiante (Scrum.org)',
        universe: 'Agilité',
        date: 'Du 29 juin au 30 juin.'
      }
    ]
    const clusterTraining = clusterCommonUniverseAndDate(training)
    expect(clusterTraining).toHaveProperty('Agilité')
    expect(clusterTraining).toEqual({
      Devops: [
        {
          date: 'Du 29 juin au 30 juin.',
          events: ['Initiation aux tests automatisés']
        }
      ],
      Agilité: [
        {
          date: 'Du 29 juin au 30 juin.',
          events: ['Professional Scrum Product Owner Certifiante (Scrum.org)']
        }
      ]
    })
  })
})
