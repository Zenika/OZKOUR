import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import PopUp from "@/components/RecapModal.vue"
import { useTalkStore } from "../../src/stores/talks";

describe("RecapModal Component", () => {
    //--- Affiche le visuel choisi par l'utilisateur
    it("Display the template chosen", async () => {
        const wrapper = mount(PopUp, {
            global: {
              plugins: [createTestingPinia()],
            },
        });

        const template = wrapper.find('[name="template"]')

        await template.setValue("E-mailing")

        expect(template.element.value).toBe("E-mailing");
    })

    //--- Affiche la plage de dates choisi par l'utilisateur
    it("Display the date range chosen", async () => {
        const wrapper = mount(PopUp, {
            global: {
              plugins: [
                createTestingPinia({
                  initialState: {
                    talk: { selected: talksSelected },
                  },
                }),
              ],
            },
        });

        const dateStart = wrapper.find(talk.date.start)

        await dateStart.setValue('2021-01-11')

        const dateEnd = wrapper.find(talk.date.end)

        await dateEnd.setValue('2021-02-12')

        expect(dates)
    }),

    //--- Affiche la liste des titres des talks choisi par l'utilisateur 
    it("Display a list of the chosen talks, only their titles", async () => {
        const wrapper = mount(PopUp, {
            global: {
              plugins: [
                createTestingPinia({
                  initialState: {
                    talk: { selected: talksSelected },
                  },
                }),
              ],
            },
        });
    
        const talksTitles = wrapper.find(talk.talkTitle)
    })
})

const talksSelected =
  [
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
    }
];
