import qs from 'qs'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'
import { isEqual } from 'lodash'

export const useTalkStore = defineStore({
  id: 'talk',
  state: () => ({
    retrieved: [],
    retrievedWarning: [],
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
    async generateVisualForSelectedTalks (templateName) {
      switch (templateName) {
      case 'QuoiDeNeuf': {
        const { data } = await api.post(
          '/talk/quoiDeNeuf',
          this.getSelectedTalks
        )
        return { link: data.link, message: data.message }
      }
      case 'E-mailing': {
        const { data } = await api.post(
          '/talk/emailing',
          this.getSelectedTalks
        )
        return { link: data.link, message: data.message }
      }
      default:
        console.error('template :"', templateName, "\" n'est pas reconnu")
        return { link: null, message: 'unknown template' }
      }
    },
    changeSelectionTalk (selected) {
      const { checked, ...selectedTalk } = selected
      this.retrieved.find((talk) => {
        const { checked: tempTalkChecked, ...tempSelectedTalk } = talk
        return isEqual(tempSelectedTalk, selectedTalk)
      }).checked = !checked
    },
    async getTalks (dateStart, dateEnd) {
      this.retreivingTalks = true
      try {
        const { data, status } = await api.get('/talk', {
          params: {
            start: dateStart,
            end: dateEnd
          },
          paramsSerializer: (params) => qs.stringify(params, { encode: false })
        })
        if (status === 200) {
          this.retrieved = data.map((talk) => {
            return {
              ...talk,
              checked: true
            }
          })
          this.retrievedWarning = []
        }
        if (status === 206) {
          this.retrieved = data.res.map((talk) => {
            return {
              ...talk,
              checked: true
            }
          })
          this.retrievedWarning = data.warn
        }
      } finally {
        this.retreivingTalks = false
      }
    },
    async sort (dataSort) {
      const { data } = await api.post('/talk/sort', dataSort.events, {
        params: {
          key: dataSort.selectedColumnKey,
          orderIsAscending: dataSort.orderIsAscending
        },
        paramsSerializer: (params) => qs.stringify(params, { encode: false })
      })
      const res = data
      this.updateTalks(res)
      return res
    }
  }
})
