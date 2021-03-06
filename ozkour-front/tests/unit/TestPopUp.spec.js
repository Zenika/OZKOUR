import { shallowMount } from "@vue/test-utils";
import RecapModal from "@/components/RecapModal.vue"

describe("RecapModal Component", () => {
  //--- Afficher le visuel choisi par l'utilisateur
  it("Display the template chosen", async () => {
    const wrapper = shallowMount(RecapModal, {
      props : {
        talks : [],
        dates : {},
        template : 'E-mailing'
      }
    });

    const template = wrapper.find('[data-test="template-detail"]').text()
        
    expect(template).toBe('Visuel : E-mailing')
  })

  //--- Afficher la plage de dates choisi par l'utilisateur
  it("Display the date range chosen", async () => {
    const wrapper = shallowMount(RecapModal, {
      props : {
        talks : [],
        template : 'E-mailing',
        dates : { 
          start : '11/01/2021', 
          end : '12/02/2021'
        }
      }
    });

    const dateText = wrapper.find('[data-test="date-detail"]').text()

    expect(dateText).toBe('Dates : 11/01/2021 au 12/02/2021')

    // console.log(dateText.html()); => affiche la partie HTML du code
  }),

  //--- Afficher la liste des titres des talks choisi par l'utilisateur 
  it("Display a list of the chosen talks, only their titles", async () => {
    const wrapper = shallowMount(RecapModal, {
      props : {
        talks,
        template : 'E-mailing',
        dates : { 
          start : '11/01/2021', 
          end : '12/02/2021'
        }
      }
    });
    
    const talkTitle = wrapper.find('.events').html()

    expect(talkTitle).toMatchSnapshot()
  })

  //--- Bouton fermer la pop up
  it("should emit a close event when the close button is triggered", async () => {
    const wrapper = shallowMount (RecapModal, {
      props : {
        talks,
        template : 'E-mailing',
        dates : { 
          start : '11/01/2021', 
          end : '12/02/2021'
        }
      }
    });

    await wrapper.find('.close-btn').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

const talks =
  [
    {
      date: "19/01/2021",
      universe: "",
      eventType: "Meetup",
      eventName: "GraalVM Night",
      talkTitle: "GraalVM for Sustainable Software Development?",
      speakers: "Adrien Nortain",
      checked: true,
    },
    {
      date: "19/01/2021",
      universe: "",
      eventType: "NightClazz",
      eventName: "NightClass",
      talkTitle: "Migration JS vers TS sur du react",
      speakers: "Jules Hablot",
      checked: true,
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
      checked: false,
    }
  ];
