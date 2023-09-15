export function dataSetFactory() {
  const talks = {
    graalVM: {
      date: "19/01/2021",
      universe: "web",
      eventType: "Meetup",
      eventName: "GraalVM Night",
      talkTitle: "GraalVM for Sustainable Software Development?",
      speakers: "Bob Hinne",
      checked: true,
      indexLine: 8,
    },
    nightClass: {
      date: "19/01/2021",
      universe: "Data",
      eventType: "NightClazz",
      eventName: "NightClass",
      talkTitle: "Migration JS vers TS sur du react",
      speakers: "Claire Delune",
      checked: true,
      indexLine: 12,
    },
  };

  const allTalks = [talks.graalVM, talks.nightClass];

  const allTalksWithPartialDatas = {
    res: [talks.graalVM, talks.nightClass],
    warn: [2, 3],
  };

  const templates = {
    QUOI_DE_9: {
      id: "quoide9",
      label: "QUOI DE 9",
      value: "QuoiDeNeuf",
      frequency: "week",
      validated: true,
    },
    EMAILING: {
      id: "emailing",
      label: "E-MAILING",
      value: "E-mailing",
      frequency: "month",
      validated: true,
    },
    MEETUP: {
      id: "meetup",
      label: "MEET-UP",
      value: "Meet-up",
      frequency: "month",
      validated: false,
    },
    SLACK: {
      id: "slack",
      label: "SLACK",
      value: "Slack",
      frequency: "month",
      validated: false,
    },
  };

  const allTemplates = [
    templates.EMAILING,
    templates.QUOI_DE_9,
    templates.MEETUP,
    templates.SLACK,
  ];

  const columns = [
    { key: "date", label: "DATE" },
    { key: "universe", label: "UNIVERS" },
    { key: "eventType", label: "TYPE" },
    { key: "eventName", label: "NOM DE L'EVENEMENT" },
    { key: "talkTitle", label: "TITRE DU TALK" },
    { key: "speakers", label: "SPEAKERS" },
  ];

  return {
    allTalksWithPartialDatas,
    talks,
    allTalks,
    templates,
    allTemplates,
    columns,
  };
}
