import { setActivePinia, createPinia } from "pinia";
import { useTalkStore } from "../../src/stores/talks";

describe("Talk Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  }),
    it("updateTalks", () => {
      const talk = useTalkStore();
      expect(talk.retrived.length).toBe(0);
      talk.updateTalks(talksRetrieved);
      expect(talk.retrived.length).toBe(5);
    }),
    it("updateCheckedTalks", () => {
      const talk = useTalkStore();
      expect(talk.selected.length).toBe(0);
      talk.updateCheckedTalks(talkSelected);
      expect(talk.selected.length).toBe(5);
    }),
    it("removeCheckedTalk", () => {
      const talk = useTalkStore();
      talk.updateCheckedTalks(talkSelected);

      const talkRemove = {
        date: "19/01/2021",
        universe: "",
        eventType: "Meetup",
        eventName: "GraalVM Night",
        talkTitle: "GraalVM for Sustainable Software Development?",
        speakers: "Adrien Nortain",
      };

      talk.removeCheckedTalk(talkRemove);
      expect(talk.selected.length).toBe(4);
    }),
    it("addCheckedTalk", () => {
      const talk = useTalkStore();
      talk.updateCheckedTalks(talkSelected);

      const talkAction = {
        date: "19/01/2021",
        universe: "",
        eventType: "Meetup",
        eventName: "GraalVM Night",
        talkTitle: "GraalVM for Sustainable Software Development?",
        speakers: "Adrien Nortain",
      };

      talk.removeCheckedTalk(talkAction);
      talk.addCheckedTalk(talkAction);
      expect(talk.selected.length).toBe(5);
    }),
    it("addCheckedTalk order", () => {
      const talk = useTalkStore();
      talk.updateCheckedTalks(talkSelected);

      const talkAction = {
        date: "19/01/2021",
        universe: "",
        eventType: "Meetup",
        eventName: "GraalVM Night",
        talkTitle: "GraalVM for Sustainable Software Development?",
        speakers: "Adrien Nortain",
      };

      talk.removeCheckedTalk(talkAction);
      talk.addCheckedTalk(talkAction);
      expect(talk.selected[1]).toStrictEqual(talkAction);
    });
});

const talksRetrieved = [
  [
    "Singapour",
    "Meetup",
    "GraalVM Night",
    "",
    "19/01/2021",
    "Adrien Nortain",
    "GraalVM for Sustainable Software Development?",
    "https://www.meetup.com/singajug/events/275681145/",
  ],
  [
    "Grenoble",
    "NightClazz",
    "NightClass",
    "",
    "19/01/2021",
    "Jules Hablot",
    "Migration JS vers TS sur du react",
  ],
  [
    "Nantes",
    "Meetup",
    "Nantes JS #55",
    "",
    "21/01/2021",
    "Yann Bertrand",
    "Nuxt 2021",
    "https://twitter.com/NantesJS/status/1351104198436392964",
  ],
  [
    "Mix",
    "Autre",
    "Webinar Strigo",
    "",
    "21/01/2021",
    "Yoan Rousseau / Oliver Huber",
    "Simplify Remote Hands-On Training and Improve Engagement",
    "https://zoom.us/webinar/register/9516106320701/WN_xAAafGs2SOGbWFub-8dGJg\nhttps://trainingindustry.com/webinar/remote-learning/product-demo-simplify-remote-hands-on-training-and-improve-engagement/",
  ],
  [
    "Nantes",
    "NightClazz",
    "RemoteClazz Nodejs",
    "",
    "25/01/2021",
    "Hugo Wood",
    "Techniques minimalistes pour Node.js",
    "https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/",
  ],
];

const talkSelected = [
  {
    date: "19/01/2021",
    universe: "",
    eventType: "Meetup",
    eventName: "GraalVM Night",
    talkTitle: "GraalVM for Sustainable Software Development?",
    speakers: "Adrien Nortain",
  },
  {
    date: "19/01/2021",
    universe: "",
    eventType: "NightClazz",
    eventName: "NightClass",
    talkTitle: "Migration JS vers TS sur du react",
    speakers: "Jules Hablot",
  },
  {
    date: "21/01/2021",
    universe: "",
    eventType: "Meetup",
    eventName: "Nantes JS #55",
    talkTitle: "Nuxt 2021",
    speakers: "Yann Bertrand",
  },
  {
    date: "21/01/2021",
    universe: "",
    eventType: "Autre",
    eventName: "Webinar Strigo",
    talkTitle: "Simplify Remote Hands-On Training and Improve Engagement",
    speakers: "Yoan Rousseau / Oliver Huber",
  },
  {
    date: "25/01/2021",
    universe: "",
    eventType: "NightClazz",
    eventName: "RemoteClazz Nodejs",
    talkTitle: "Techniques minimalistes pour Node.js",
    speakers: "Hugo Wood",
  },
];
