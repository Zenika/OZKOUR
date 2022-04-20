// @ts-check
import { defineStore } from "pinia";

export const useTalkStore = defineStore({
  id: "talk",
  state: () => ({
    talks: [],
  }),
  getters: {
    items: (state) =>
      state.talks.reduce((items) => {
        return items;
      }, []),
  },
  actions: {
    updateTalks(newTalks) {
      this.talks = [];
      console.log(newTalks)
      this.talks.push(newTalks);
    },
  },
});