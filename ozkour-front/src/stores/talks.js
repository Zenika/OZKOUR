import qs from 'qs'
import dateFormat from 'dateformat'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'

export const useTalkStore = defineStore({
  id: 'talk',
  state: () => ({
    retrieved: [],
    date: {},
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
    selectedDate (start, end) {
      start = dateFormat(Date.parse(start), 'dd/mm/yyyy')
      end = dateFormat(Date.parse(end), 'dd/mm/yyyy')
      this.date = { start, end }
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
        this.selectedDate(dateStart, dateEnd)
      } finally {
        this.retreivingTalks = false
      }
    }
  }
})
