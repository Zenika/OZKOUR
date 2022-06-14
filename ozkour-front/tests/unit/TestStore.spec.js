import {jest} from '@jest/globals'
import axios from "axios";
import { setActivePinia, createPinia } from "pinia";

import { useTalkStore } from "../../src/stores/talks";

jest.mock(axios);

describe("Talk Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  }),
  it("updateTalks", () => {
    const talk = useTalkStore();
    expect(talk.retrieved.length).toBe(0);
    talk.updateTalks(talksRetrieved);
    expect(talk.retrieved.length).toBe(5);
  }),
  it("getSelectedTalks give all talks by default ", () => {
    const talk = useTalkStore();
    expect(talk.retrieved.length).toBe(0);
    talk.updateTalks(talksRetrieved);
    expect(talk.getSelectedTalks.length).toBe(5);
  }),
  it("uncheckTalk", () => {
    const talk = useTalkStore();
    talk.updateTalks(talksRetrieved);

    const talkToBeRemoved = {
      date: "19/01/2021",
      universe: "",
      eventType: "Meetup",
      eventName: "GraalVM Night",
      talkTitle: "GraalVM for Sustainable Software Development?",
      speakers: "Adrien Nortain",
    };

    talk.uncheckTalk(talkToBeRemoved);
    expect(talk.getSelectedTalks.length).toBe(4);
    expect(talk.retrieved.length).toBe(5);
  }),
  it("addCheckedTalk", () => {
    const talk = useTalkStore();
    talk.updateTalks(talksRetrieved);

    const talkToBeRemovedAndAdded = {
      date: "19/01/2021",
      universe: "",
      eventType: "Meetup",
      eventName: "GraalVM Night",
      talkTitle: "GraalVM for Sustainable Software Development?",
      speakers: "Adrien Nortain",
    };

    talk.uncheckTalk(talkToBeRemovedAndAdded);
    talk.checkTalk(talkToBeRemovedAndAdded);
    expect(talk.getSelectedTalks.length).toBe(5);
    expect(talk.retrieved.length).toBe(5);
  }),
  it("addCheckedTalk order", () => {
    const talk = useTalkStore();
    talk.updateTalks(talksRetrieved);

    const talkToBeRemovedAndAdded = {
      date: "19/01/2021",
      universe: "",
      eventType: "Meetup",
      eventName: "GraalVM Night",
      talkTitle: "GraalVM for Sustainable Software Development?",
      speakers: "Adrien Nortain",
      checked: true
    };

    talk.uncheckTalk(talkToBeRemovedAndAdded);
    talk.checkTalk(talkToBeRemovedAndAdded);
    expect(talk.getSelectedTalks[0]).toStrictEqual(talkToBeRemovedAndAdded);
  });

  describe.only("generateSlidesForSelectedTalks action", () => {
    it('should return the slide\'s link given status code to be 200', async () => {
      const talk = useTalkStore();

      talk.updateTalks(talksRetrieved);

      axios.get.mockResolvedValueOnce({
        data: {
          link : 'https://monliendeslide.com'
        } 
      })
      const link = await talk.generateSlidesForSelectedTalks(talksRetrieved);

      expected(link).toBe('https://monliendeslide.com')
    })
  })
});

const talksRetrieved = [
  {
    date: "19/01/2021",
    universe: "",
    eventType: "Meetup",
    eventName: "GraalVM Night",
    talkTitle: "GraalVM for Sustainable Software Development?",
    speakers: "Adrien Nortain",
    checked: true
  },
  {
    date: "19/01/2021",
    universe: "",
    eventType: "NightClazz",
    eventName: "NightClass",
    talkTitle: "Migration JS vers TS sur du react",
    speakers: "Jules Hablot",
    checked: true
  },
  {
    date: "21/01/2021",
    universe: "",
    eventType: "Meetup",
    eventName: "Nantes JS #55",
    talkTitle: "Nuxt 2021",
    speakers: "Yann Bertrand",
    checked: true
  },
  {
    date: "21/01/2021",
    universe: "",
    eventType: "Autre",
    eventName: "Webinar Strigo",
    talkTitle: "Simplify Remote Hands-On Training and Improve Engagement",
    speakers: "Yoan Rousseau / Oliver Huber",
    checked: true
  },
  {
    date: "25/01/2021",
    universe: "",
    eventType: "NightClazz",
    eventName: "RemoteClazz Nodejs",
    talkTitle: "Techniques minimalistes pour Node.js",
    speakers: "Hugo Wood",
    checked: true
  },
];
