// @ts-check
import dateFormat from "dateformat";
import { defineStore } from "pinia";

export const useTalkStore = defineStore({
  id: "talk",
  state: () => ({
    retrived: [],
    selected: [],
    blured: false,
    template: "",
    date: {}
  }),
  getters: {
    items: (state) =>
      state.retrived.reduce((items) => {
        return items;
      }, []),
  },
  actions: {
    updateTalks(newTalks) {
      this.retrived = newTalks;
    },
    updateCheckedTalks(newTalks) {
      this.selected = newTalks;
    },
    addCheckedTalk(newTalk) {
      let index = -1;
      let founded = false;
      while (index <= this.selected.length - 1 && !founded) {
        index++;
        // console.log("old " +this.selected[index]?.date)
        // console.log("new "+newTalk.date)
        // console.log("res " + this.selected[index]?.date > newTalk.date)
        if (this.selected[index]?.date > newTalk.date) founded = true;
      }
      this.selected.splice(index, 0, newTalk);
      //this.selected.push(newTalk);
    },
    removeCheckedTalk(oldTalk) {
      this.selected = this.selected.filter(function (value) {
        // console.log(value.talkTitle)
        // console.log(oldTalk.talkTitle)
        // console.log(value.talkTitle != oldTalk.talkTitle)
        return value.talkTitle != oldTalk.talkTitle;
      });
    },
    blur(){
      this.blured = true;
    },
    clarify(){
      this.blured = false;
    },
    // Visuel choisi
    pickedTemplate(chosenTemplate) {
      this.template = chosenTemplate
      console.log('template',chosenTemplate);
    },
    // Plage de date choisie
    selectedDate(start, end) {
      start = dateFormat(Date.parse(start.value), "dd/mm/yyyy");
      end = dateFormat(Date.parse(end.value), "dd/mm/yyyy");
      this.date = {start, end}
      console.log('start date',start);
      console.log('end date',end);
    }
  },
});


