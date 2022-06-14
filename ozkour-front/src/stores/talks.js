// @ts-check
import dateFormat from "dateformat";
import { defineStore } from "pinia";

export const useTalkStore = defineStore({
  id: "talk",
  state: () => ({
    retrieved: [],
    template: {template : "", frequency : ""},
    date: {},
  }),
  getters: {
    getSelectedTalks: (state) =>
      state.retrieved.filter((talk) => {
        return talk.checked;
      }),
  },
  actions: {
    updateTalks(newTalks) {
      this.retrieved = newTalks;
    },
    checkTalk(selected) {
      this.retrieved.find(talk => 
        talk.talkTitle === selected.talkTitle).checked = true;
    },
    uncheckTalk(selected) {
      this.retrieved.find(talk => 
        talk.talkTitle === selected.talkTitle).checked = false;
    },
    blur() {
      this.blured = true;
    },
    clarify() {
      this.blured = false;
    },
    // Visuel choisi
    pickedTemplate(chosenTemplate,freq) {
      this.template = {template : chosenTemplate, frequency : freq };
    },
    //--- Plage de date choisie
    selectedDate(start, end) {
      start = dateFormat(Date.parse(start.value), "dd/mm/yyyy");
      end = dateFormat(Date.parse(end.value), "dd/mm/yyyy");
      this.date = { start, end };
    },
  },
});
