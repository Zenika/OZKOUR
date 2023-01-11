import qs from 'qs'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'
import { isEqual } from 'lodash'

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
      }),
    getSelectedTalksTitle: (state) =>
      state.getSelectedTalks.map((talk) => talk.talkTitle)
  },
  actions: {
    updateTalks (newTalks) {
      this.retrieved = newTalks
    },
    async generateVisualForSelectedTalks (templateName, token) {
      switch (templateName) {
      case 'QuoiDeNeuf': {
        const { data } = await api
          .post('/talk/quoiDeNeuf', this.getSelectedTalks,
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
        return { link: data.link, message: data.message }
      }
      case 'E-mailing': {
        const { data } = await api
          .post('/talk/emailing', this.getSelectedTalks,
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
        return { link: data.link, message: data.message }
      }
      default:
        console.error('template :"', templateName, "\" n'est pas reconnu")
        return { link: null, message: 'unknown template' }
      }
    },
    changeSelectionTalk (selected) {
      const { checked, ...selectedTalk } = selected
      this.retrieved.find(talk => {
        const { checked: tempTalkChecked, ...tempSelectedTalk } = talk
        return isEqual(tempSelectedTalk, selectedTalk)
      }).checked = !checked
    },
    async getTalks (dateStart, dateEnd, token) {
      this.retreivingTalks = true
      try {
        const { data } = await api
          .get('/talk', {
            params: {
              start: dateStart,
              end: dateEnd
            },
            headers: {
              Authorization: 'Bearer ' + token
            },
            paramsSerializer: (params) => qs.stringify(params, { encode: false })
          })
        const res = data.map((talk) => {
          return {
            ...talk,
            checked: true
          }
        })
        this.updateTalks(res)
        return res
      } finally {
        this.retreivingTalks = false
      }
    },
    async sort (dataSort, token) {
      const { data } = await api
        .post('/talk/sort', dataSort.events, {
          params: {
            key: dataSort.selectedColumnKey,
            orderIsAscending: dataSort.orderIsAscending
          },
          headers: {
            Authorization: 'Bearer ' + token
          },
          paramsSerializer: (params) => qs.stringify(params, { encode: false })
        })
      const res = data
      this.updateTalks(res)
      return res
    }
  }
})
