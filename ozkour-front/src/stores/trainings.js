import qs from 'qs'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'
import { isEqual } from 'lodash'

export const useTrainingStore = defineStore({
  id: 'training',
  state: () => ({
    retrieved: [],
    retreivingTrainings: false
  }),
  getters: {
    getSelectedTrainings: (state) =>
      state.retrieved.filter((training) => {
        return training.checked
      }),
    getSelectedTrainingsTitle: (state) =>
      state.getSelectedTrainings.map((training) => training.trainingTitle)
  },
  actions: {
    updateTrainings (newTrainings) {
      this.retrieved = newTrainings
    },
    async generateVisualForSelectedTrainings (templateName) {
      switch (templateName) {
      case 'E-mailing': {
        const { data } = await api
          .post('/training/emailing', this.getSelectedTrainings)
        return { link: data.link, message: data.message }
      }
      default:
        console.error('template :"', templateName, "\" n'est pas reconnu")
        return null
      }
    },
    changeSelectionTraining (selected) {
      const { checked, ...selectedTraining } = selected
      this.retrieved.find(training => {
        const { checked: tempTrainingChecked, ...tempSelectedTraining } = training
        return isEqual(tempSelectedTraining, selectedTraining)
      }).checked = !checked
    },
    async getTrainings (dateStart, dateEnd) {
      this.retreivingTrainings = true
      try {
        const instanceAxios = await api
        const { data } = await instanceAxios
          .get('/training', {
            params: {
              start: dateStart,
              end: dateEnd
            },
            paramsSerializer: (params) => qs.stringify(params, { encode: false })
          })
        const res = data.map((training) => {
          return {
            ...training,
            checked: true
          }
        })
        this.updateTrainings(res)
        return res
      } finally {
        this.retreivingTrainings = false
      }
    },
    async sort (dataSort) {
      const instanceAxios = await api
      const { data } = await instanceAxios
        .post('/training/sort', dataSort.events, {
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
