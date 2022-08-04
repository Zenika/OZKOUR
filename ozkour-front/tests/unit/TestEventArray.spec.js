import { mount } from "@vue/test-utils";
import EventArray from "@/components/EventArray.vue";
import { createTestingPinia } from "@pinia/testing";
import { useTalkStore } from "../../src/stores/talks";

function isAscending(arr) {
  return arr.every(function (x, i) {
    return i === 0 || x >= arr[i - 1];
  });
}
function isDescending(arr) {
  return arr.every(function (x, i) {
    return i === 0 || x <= arr[i - 1];
  });
}

describe("ListEvent Component", () => {
  it("Display title when no talk", () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const todo = wrapper.get("h2");
    expect(todo.text()).toBe("Pas de talks entre les dates recherchées");
  }),
  it("Display Title when talks", () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              talk: { retrieved: talksRetrieved },
            },
          }),
        ],
      },
    });

    const todo = wrapper.get("h2");
    expect(todo.text()).toBe("Liste des événements sélectionnés");
  });
  it("Right amount of columns when talks", () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              talk: { retrieved: talksRetrieved },
            },
          }),
        ],
      },
    });

    expect(wrapper.findAll("th")).toHaveLength(7);
  });
  it("Same number of talks", () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              talk: { retrieved: talksRetrieved },
            },
          }),
        ],
      },
    });
    expect(wrapper.findAll('[data-test="talks"]')).toHaveLength(5);
  }),
  it("uncheck is working", async () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              talk: { retrieved: talksRetrieved },
            },
          }),
        ],
      },
    });

    const talk = useTalkStore();
    const inputCheckbox = wrapper.find('[type="checkbox"]');
    await inputCheckbox.setChecked(false);

    expect(inputCheckbox.element.checked).toBe(false);
    expect(talk.uncheckTalk).toHaveBeenCalledTimes(1);
  }),
  it("check talk is working", async () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              talk: { retrieved: talksRetrieved },
            },
          }),
        ],
      },
    });

    const talk = useTalkStore();
    const inputCheckbox = wrapper.find('[type="checkbox"]');

    await inputCheckbox.setChecked(false);
    await inputCheckbox.setChecked(true);

    expect(inputCheckbox.element.checked).toBe(true);
    expect(talk.checkTalk).toHaveBeenCalledTimes(1);
  }),
  it("check order(ascending/discending) when clicking on column", async () => {
    // Create an instance of our component
    const wrapper = mount(EventArray, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              talk: { retrieved: talksRetrieved },
            },
          }),
        ],
      },
    });

    const talk = useTalkStore();

    let columns = wrapper.find('[data-test="speakers"]');
    let talksLines = wrapper.findAll('[data-test="talks"]');
    let listSpeakersOrderedAsTheyAppear = [];

    await columns.trigger("click");

    talksLines = wrapper.findAll('[data-test="talks"]');//reload talks

    talksLines.forEach((element) => {
      listSpeakersOrderedAsTheyAppear.push(element.findAll("td")[6].text());
    });

    expect(isAscending(listSpeakersOrderedAsTheyAppear)).toBe(true);

    await columns.trigger("click");

    talksLines = wrapper.findAll('[data-test="talks"]');//reload talks
    listSpeakersOrderedAsTheyAppear = [];

    talksLines.forEach((element) => {
      listSpeakersOrderedAsTheyAppear.push(element.findAll("td")[6].text());
    });

    expect(isDescending(listSpeakersOrderedAsTheyAppear)).toBe(true);

  });
});

const talksRetrieved = [
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
    checked: true,
  },
  {
    date: "21/01/2021",
    universe: "",
    eventType: "Autre",
    eventName: "Webinar Strigo",
    talkTitle: "Simplify Remote Hands-On Training and Improve Engagement",
    speakers: "Yoan Rousseau / Oliver Huber",
    checked: true,
  },
  {
    date: "25/01/2021",
    universe: "",
    eventType: "NightClazz",
    eventName: "RemoteClazz Nodejs",
    talkTitle: "Techniques minimalistes pour Node.js",
    speakers: "Hugo Wood",
    checked: true,
  },
];
