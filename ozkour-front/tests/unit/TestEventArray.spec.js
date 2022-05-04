import { mount } from '@vue/test-utils'
import EventArray from '@/components/EventArray.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTalkStore } from "../../src/stores/talks";
import { defineStore } from 'pinia'


describe('ListEvent Component', () => {
  it('Display title when no talk', () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const todo = wrapper.get('h2')
    expect(todo.text()).toBe('Pas de talks entre les dates recherchées')
  }),
  it('Display Title when talks', () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [createTestingPinia({initialState: {
          talk: { retrived: talksRetrieved }
        },})],
      },
    });

    const todo = wrapper.get('h2')
    expect(todo.text()).toBe('Liste des événements sélectionnés')
  })
  it('Right amount of columns when talks', () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [createTestingPinia({initialState: {
          talk: { retrived: talksRetrieved }
        },})],
      },
    });

    expect(wrapper.findAll('th')).toHaveLength((7))
  })
  it('Same number of talks', () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [createTestingPinia({initialState: {
          talk: { retrived: talksRetrieved }
        },})],
      },
    });
    expect(wrapper.findAll('[data-test="talks"]')).toHaveLength((5))
  })
})

const talksRetrieved = [
  [
      "Singapour",
      "Meetup",
      "GraalVM Night",
      "",
      "19/01/2021",
      "Adrien Nortain",
      "GraalVM for Sustainable Software Development?",
      "https://www.meetup.com/singajug/events/275681145/"
  ],
  [
      "Grenoble",
      "NightClazz",
      "NightClass",
      "",
      "19/01/2021",
      "Jules Hablot",
      "Migration JS vers TS sur du react"
  ],
  [
      "Nantes",
      "Meetup",
      "Nantes JS #55",
      "",
      "21/01/2021",
      "Yann Bertrand",
      "Nuxt 2021",
      "https://twitter.com/NantesJS/status/1351104198436392964"
  ],
  [
      "Mix",
      "Autre",
      "Webinar Strigo",
      "",
      "21/01/2021",
      "Yoan Rousseau / Oliver Huber",
      "Simplify Remote Hands-On Training and Improve Engagement",
      "https://zoom.us/webinar/register/9516106320701/WN_xAAafGs2SOGbWFub-8dGJg\nhttps://trainingindustry.com/webinar/remote-learning/product-demo-simplify-remote-hands-on-training-and-improve-engagement/"
  ],
  [
      "Nantes",
      "NightClazz",
      "RemoteClazz Nodejs",
      "",
      "25/01/2021",
      "Hugo Wood",
      "Techniques minimalistes pour Node.js",
      "https://www.meetup.com/NightClazz-by-Zenika-Nantes/events/275720340/"
  ]
]