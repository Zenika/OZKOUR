const arrayTest = [
  {
    trainingTitle: 'Angular Avancé',
    universe: 'Web',
    duration: '3',
    price: '1 970€',
    link: 'https://training.zenika.com/fr-fr/training/angular-avance/description',
    date: '07/06/2023',
    indexLine: 8
  },
  {
    trainingTitle: 'JAVA',
    universe: 'DevOps',
    duration: '2',
    price: '1 440€',
    link: 'https://training.zenika.com/fr-fr/training/ansible/description',
    date: '07/06/2023',
    indexLine: 10
  },
  {
    trainingTitle: 'Web',
    universe: 'Craftsmanship',
    duration: '3',
    price: '1 950€',
    link: 'https://training.zenika.com/fr-fr/training/clean-code/description',
    date: '05/06/2023',
    indexLine: 17
  },
  {
    trainingTitle: 'Design Thinking',
    universe: 'Design (UX/UI)',
    duration: '2',
    price: '1 640€',
    link: 'https://training.zenika.com/fr-fr/training/design-thinking/description',
    date: '05/06/2023',
    indexLine: 25
  },
  {
    trainingTitle: 'Développeurs Blockchain : Ethereum',
    universe: 'Blockchain',
    duration: '2',
    price: '1 530€',
    link: 'https://training.zenika.com/fr-fr/training/dev-blockchain-ethereum/description',
    date: '12/06/2023',
    indexLine: 30
  },
  {
    trainingTitle: 'Docker Officielle : CN100 - Docker Containerization Essentials',
    universe: 'Cloud, DevOps',
    duration: '1',
    price: '950€',
    link: 'https://training.zenika.com/fr-fr/training/docker-containerization-essentials/description',
    date: '01/06/2023',
    indexLine: 34
  },
  {
    trainingTitle: 'Domain Driven Design',
    universe: 'Craftsmanship',
    duration: '3',
    price: '2 079€',
    link: 'https://training.zenika.com/fr-fr/training/domain-driven-design-03/description',
    date: '07/06/2023',
    indexLine: 36
  },
  {
    trainingTitle: 'Elastic Stack',
    universe: 'Web',
    duration: '3',
    price: '2 050€',
    link: 'https://training.zenika.com/fr-fr/training/elastic-stack/description',
    date: '05/06/2023',
    indexLine: 39
  },
  {
    trainingTitle: 'Elasticsearch',
    universe: 'Devops',
    duration: '3',
    price: '1 860€',
    link: 'https://training.zenika.com/fr-fr/training/elasticsearch/description',
    date: '05/06/2023',
    indexLine: 40
  },
  {
    trainingTitle: 'Elasticsearch Ops',
    universe: 'Devops',
    duration: '3',
    price: '2 050€',
    link: 'https://training.zenika.com/fr-fr/training/elasticsearch-ops/description',
    date: '19/06/2023',
    indexLine: 41
  },
  {
    trainingTitle: 'Google Cloud Fundamentals: Core Infrastructure',
    universe: 'Cloud',
    duration: '1',
    price: '1 100€',
    link: 'https://training.zenika.com/fr-fr/training/gcp-core-infra/description',
    date: '05/06/2023',
    indexLine: 49
  },
  {
    trainingTitle: 'GraphQL',
    universe: 'Web',
    duration: '2',
    price: '1 640€',
    link: 'https://training.zenika.com/fr-fr/training/graphql/description',
    date: '05/06/2023',
    indexLine: 50
  },
  {
    trainingTitle: 'Infrastructure as Code avec Terraform',
    universe: 'Devops',
    duration: '2',
    price: '1 530€',
    link: 'https://training.zenika.com/fr-fr/training/iac-terraform/description',
    date: '07/06/2023',
    indexLine: 52
  },
  {
    trainingTitle: 'Initiation aux tests automatisés',
    universe: 'Devops',
    duration: '2',
    price: '1 420€',
    link: 'https://training.zenika.com/fr-fr/training/tests-auto/description',
    date: '29/06/2023',
    indexLine: 54
  },
  {
    trainingTitle: 'Java Design Patterns',
    universe: 'Craftsmanship',
    duration: '4',
    price: '2 250€',
    link: 'https://training.zenika.com/fr-fr/training/design-patterns/description',
    date: '13/06/2023',
    indexLine: 60
  },
  {
    trainingTitle: 'Kafka : Confluent Administration',
    universe: 'Data & Data Science',
    duration: '3',
    price: '2 100€',
    link: 'https://training.zenika.com/fr-fr/training/confluent-operations-kafka/description',
    date: '12/06/2023',
    indexLine: 63
  },
  {
    trainingTitle: 'Kafka Streams & Confluent KSQL',
    universe: 'Data & Data Science',
    duration: '3',
    price: '2 100€',
    link: 'https://training.zenika.com/fr-fr/training/kafka-ksql/description',
    date: '19/06/2023',
    indexLine: 66
  },
  {
    trainingTitle: 'Kafka Streams Avancé',
    universe: 'Data & Data Science',
    duration: '3',
    price: '2 100€',
    link: 'https://training.zenika.com/fr-fr/training/kafka-avance/description',
    date: '26/06/2023',
    indexLine: 67
  },
  {
    trainingTitle: 'Keycloak',
    universe: 'Architecture',
    duration: '3',
    price: '1 890€',
    link: 'https://training.zenika.com/fr-fr/training/keycloak/description',
    date: '21/06/2023',
    indexLine: 68
  },
  {
    trainingTitle: 'Kotlin',
    universe: 'Langages & Algo',
    duration: '2',
    price: '1 490€',
    link: 'https://training.zenika.com/fr-fr/training/kotlin/description',
    date: '26/06/2023',
    indexLine: 69
  },
  {
    trainingTitle: 'Kubernetes Admin',
    universe: 'DevOps',
    duration: '3',
    price: '2 080€',
    link: 'https://training.zenika.com/fr-fr/training/kubernetes-adm/description',
    date: '07/06/2023',
    indexLine: 71
  },
  {
    trainingTitle: 'Kubernetes Application Developer',
    universe: 'DevOps, Cloud',
    duration: '3',
    price: '1 860€',
    link: 'https://training.zenika.com/fr-fr/training/kubernetes/description',
    date: '07/06/2023',
    indexLine: 72
  },
  {
    trainingTitle: 'Leading SAFe®',
    universe: 'Agilité',
    duration: '2',
    price: '1 400€',
    link: 'https://training.zenika.com/fr-fr/training/leading-safe/description',
    date: '05/06/2023',
    indexLine: 79
  },
  {
    trainingTitle: 'Management 3.0 certifiante',
    universe: 'Agilité',
    duration: '2',
    price: '1 695€',
    link: 'https://training.zenika.com/fr-fr/training/manager-agile/description',
    date: '05/06/2023',
    indexLine: 84
  },
  {
    trainingTitle: 'Node.js',
    universe: 'Web',
    duration: '3',
    price: '1 860€',
    link: 'https://training.zenika.com/fr-fr/training/nodejs/description',
    date: '07/06/2023',
    indexLine: 88
  },
  {
    trainingTitle: 'Product Management',
    universe: 'Agilité',
    duration: '2',
    price: '1 420€',
    link: 'https://training.zenika.com/fr-fr/training/product-management/description',
    date: '15/06/2023',
    indexLine: 92
  },
  {
    trainingTitle: 'Professional Scrum Master Certifiante (Scrum.org)',
    universe: 'Agilité',
    duration: '2',
    price: '1 390€',
    link: 'https://training.zenika.com/fr-fr/training/psm/description',
    date: '12/06/2023',
    indexLine: 93
  },
  {
    trainingTitle: 'Professional Scrum Product Owner Certifiante (Scrum.org)',
    universe: 'Agilité',
    duration: '2',
    price: '1 390€',
    link: 'https://training.zenika.com/fr-fr/training/pspo/description',
    date: '29/06/2023',
    indexLine: 94
  },
  {
    trainingTitle: 'Python',
    universe: 'Data & Data Science',
    duration: '3',
    price: '1 690€',
    link: 'https://training.zenika.com/fr-fr/training/python/description',
    date: '26/06/2023',
    indexLine: 95
  },
  {
    trainingTitle: 'React',
    universe: 'Web',
    duration: '3',
    price: '1 860€',
    link: 'https://training.zenika.com/fr-fr/training/react/description',
    date: '19/06/2023',
    indexLine: 97
  },
  {
    trainingTitle: 'Scrum Master Avancée ( SCRUM ALLIANCE )',
    universe: 'Agilité',
    duration: '2',
    price: '1 540',
    link: 'https://training.zenika.com/fr-fr/training/advanced-scrum-master/description',
    date: '22/06/2023',
    indexLine: 114
  },
  {
    trainingTitle: 'Sensibilisation au Software Craftsmanship',
    universe: 'Craftsmanship',
    duration: '2',
    price: '1 530€',
    link: 'https://training.zenika.com/fr-fr/training/sensibilisation-software-craftsmanship/description',
    date: '01/06/2023',
    indexLine: 122
  },
  {
    trainingTitle: 'Spring Core',
    universe: 'Architecture',
    duration: '4',
    price: '1 530€',
    link: 'https://training.zenika.com/fr-fr/training/spring/description',
    date: '05/06/2023',
    indexLine: 125
  }]

module.exports = { arrayTest }
