import qs from 'qs';
import dateFormat from "dateformat";
import { defineStore } from "pinia";
import { api } from "@/api/apiConfig";

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
    pickedTemplate(chosenTemplate,freq) {
      this.template = {template : chosenTemplate, frequency : freq };
    },
    selectedDate(start, end) {
      start = dateFormat(Date.parse(start.value), "dd/mm/yyyy");
      end = dateFormat(Date.parse(end.value), "dd/mm/yyyy");
      this.date = { start, end };
    },
    async generateSlidesForSelectedTalks() {
      switch (this.template.template) {
      case "Quoi de 9": {
        const {data} = await api
          .post("/selected-talks", this.getSelectedTalks);
        return data.link;
      }
      case "E-mailing": {
        const {data} = await api
          .post("/emailing", this.getSelectedTalks);
        return data.link;
      }
      default:
        console.error("template :\"",this.template.template,"\" n'est pas reconnu")    
        return "/"
      }
    },
    async getTalks(dateStart, dateEnd) {
      const {data} = await api
        .get("/talk", {
          params: {
            start: dateStart.value,
            end: dateEnd.value,
          },
          paramsSerializer: (params) => qs.stringify(params, { encode: false }),
        })
      this.updateTalks(data);       
      this.selectedDate(dateStart, dateEnd);
    }
  },
});
