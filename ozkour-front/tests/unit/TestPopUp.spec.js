import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import RecapModal from "@/components/RecapModal.vue"
import { useTalkStore } from "../../src/stores/talks";

// On utilise 'shallowMount' pour ne pas mount les composants enfants (ici ValidateBtn)

describe("RecapModal Component", () => {
    //--- Affiche le visuel choisi par l'utilisateur
    it("Display the template chosen", async () => {
        const wrapper = shallowMount(RecapModal, {
            global: {
              plugins: [
                createTestingPinia({
                  initialState: {
                    talk: { 
                        selected: talksSelected,
                        template : 'E-mailing'
                    },
                  },
                }),
              ],
            },
        });

        const template = wrapper.find('[data-test="template-detail"]').text()

        expect(template).toBe('Visuel : E-mailing')
    })

    //--- Affiche la plage de dates choisi par l'utilisateur
    it("Display the date range chosen", async () => {
        const wrapper = shallowMount(RecapModal, {
            global: {
              plugins: [
                createTestingPinia({
                  initialState: {
                    talk: { 
                        selected: talksSelected,
                        date : { 
                            start : '11/01/2021', 
                            end : '12/02/2021'
                        }
                    },
                  },
                }),
              ],
            },
        });

        const dateText = wrapper.find('[data-test="date-detail"]').text()

        expect(dateText).toBe('Dates : 11/01/2021 au 12/02/2021')

        // console.log(dateText.html()); => affiche la partie HTML du code
    }),

    //--- Affiche la liste des titres des talks choisi par l'utilisateur 
    it("Display a list of the chosen talks, only their titles", async () => {
        const wrapper = shallowMount(RecapModal, {
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
    
        const talkTitle = wrapper.find('.events').html()

        expect(talkTitle).toMatchSnapshot()
    })

    // Bouton fermer la pop up
    // it("Close de the pop up when you click on the cross button", async () => {
    //     const wrapper = shallowMount (RecapModal, {
    //         global: {
    //             plugins: [createTestingPinia]
    //         }
    //     })
    // })

    // Envoie de données dans le back lorsque l'on clique sur le bouton 'Valider'
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
