// @ts-check
import { defineStore } from "pinia";

export const useTalkStore = defineStore({
  id: "talk",
  state: () => ({
    retrived: [],
    selected: [],
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
      console.log(newTalks)
      //this.talks.push(newTalks);
    },
    // updateCheckedTalks(newTalks) {
    //   this.checkedTalks = [];
    //   console.log(newTalks)
    //   this.checkedTalks.push(newTalks);
    // },
  },
});