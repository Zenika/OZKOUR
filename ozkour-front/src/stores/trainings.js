import qs from 'qs'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'
import { isEqual } from 'lodash'

export const useTrainingStore = defineStore({
  id: 'training',
  state: () => ({
    retrieved: [],
    retrievedWarning: [],
    retreivingTrainings: false
  }),
  getters: {
    getSelectedTrainings: (state) =>
      state.retrieved.filter((training) => {
        return training.checked
      }),
    getSelectedTrainingsTitle: (state) =>
      state.getSelectedTrainings.map((training) => training.title)
  },
  actions: {
    updateTrainings (newTrainings) {
      this.retrieved = newTrainings
    },
    async generateVisualForSelectedTrainings (templateName) {
      switch (templateName) {
      case 'E-mailing': {
        const { data } = await api.post(
          '/training/emailing',
          this.getSelectedTrainings
        )
        return { link: data.link, message: data.message }
      }
      default:
        console.error('template :"', templateName, "\" n'est pas reconnu")
        return null
      }
    },
    changeSelectionTraining (selected) {
      const { checked, ...selectedTraining } = selected
      this.retrieved.find((training) => {
        const { checked: tempTrainingChecked, ...tempSelectedTraining } =
          training
        return isEqual(tempSelectedTraining, selectedTraining)
      }).checked = !checked
    },
    async getTrainings (dateStart, dateEnd) {
      this.retreivingTrainings = true
      try {
        const { data, status } = await api.get('/training', {
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
        this.retreivingTrainings = false
      }
    },
    async sort (dataSort) {
      const { data } = await api.post('/training/sort', dataSort.events, {
        params: {
          key: dataSort.selectedColumnKey,
          orderIsAscending: dataSort.orderIsAscending
        },
        paramsSerializer: (params) => qs.stringify(params, { encode: false })
      })
      const res = data
      this.updateTrainings(res)
      return res
    }
  }
})
