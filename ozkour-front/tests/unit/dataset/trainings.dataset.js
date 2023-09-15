export function dataSetFactory() {
  const trainings = {
    springCore: {
      date: "19/01/2021",
      title: "Spring Core",
      universe: "Architecture, Langages & Algo",
      duration: "4",
      price: "2095€",
      url: "https://training.zenika.com/fr-fr/training/spring/description",
      checked: true,
      indexLine: 8,
    },
    kafkaConfluent: {
      date: "19/01/2021",
      title: "Kafka Streams & Confluent KSQL",
      universe: "Architecture, Big Data & Data Science",
      duration: "3",
      price: "2100€",
      url: "https://training.zenika.com/fr-fr/training/kafka-ksql/description",
      checked: true,
      indexLine: 12,
    },
  };
  const allTrainings = [trainings.springCore, trainings.kafkaConfluent];

  const allTrainingsWithPartialDatas = {
    res: [trainings.springCore, trainings.kafkaConfluent],
    warn: [2, 3],
  };

  const templates = {
    EMAILING: {
      id: "emailing",
      label: "E-MAILING",
      value: "E-mailing",
      frequency: "month",
      validated: true,
    },
    FORMEZ_VOUS: {
      id: "formezvous",
      label: "FORMEZ-VOUS",
      value: "Formez-vous",
      frequency: "month",
      validated: false,
    },
    TRAIN_WITH_US: {
      id: "trainwithus",
      label: "TRAIN-WITH-US",
      value: "Train-with-us",
      frequency: "month",
      validated: true,
    },
    TRAIN_WITH_US_GREEN: {
      id: "trainwithusgreen",
      label: "TRAIN-WITH-US-GREEN",
      value: "Train-with-us-green",
      frequency: "month",
      validated: true,
    },
  };

  const allTemplates = [templates.EMAILING, templates.SLIDE];

  return {
    trainings,
    allTrainings,
    templates,
    allTemplates,
    allTrainingsWithPartialDatas,
  };
}
