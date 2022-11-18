import qs from 'qs'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'

export const useTalkStore = defineStore({
  id: 'talk',
  state: () => ({
    retrieved: [],
    retreivingTalks: false
  }),
  getters: {
    getSelectedTalks: (state) =>
      state.retrieved.filter((talk) => {
        return talk.checked
      })
  },
  actions: {
    updateTalks (newTalks) {
      this.retrieved = newTalks
    },
    checkTalk (selected) {
      this.retrieved.find(talk =>
        talk.talkTitle === selected.talkTitle).checked = true
    },
    uncheckTalk (selected) {
      this.retrieved.find(talk =>
        talk.talkTitle === selected.talkTitle).checked = false
    },
    async generateVisualForSelectedTalks (templateName) {
      switch (templateName) {
      case 'QuoiDeNeuf': {
        const { data } = await api
          .post('/talk/quoiDeNeuf', this.getSelectedTalks)
        return { link: data.link, message: data.message }
      }
      case 'E-mailing': {
        const { data } = await api
          .post('/talk/emailing', this.getSelectedTalks)
        return { link: data.link, message: data.message }
      }
      default:
        console.error('template :"', templateName, "\" n'est pas reconnu")
        return { link: '/', message: 'unknown template' }
      }
    },
    async getTalks (dateStart, dateEnd) {
      this.retreivingTalks = true
      try {
        const { data } = await api
          .get('/talk', {
            params: {
              start: dateStart,
              end: dateEnd
            },
            paramsSerializer: (params) => qs.stringify(params, { encode: false })
          })
        this.updateTalks(data)
      } finally {
        this.retreivingTalks = false
      }
    }
  }
})
