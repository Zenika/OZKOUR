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
    async generateVisualForSelectedTrainings (templateName, token) {
      switch (templateName) {
      case 'E-mailing': {
        const { data } = await api
          .post('/training/emailing', this.getSelectedTrainings,
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
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
    async getTrainings (dateStart, dateEnd, token) {
      this.retreivingTrainings = true
      try {
        const { data } = await api
          .get('/training', {
            params: {
              start: dateStart,
              end: dateEnd
            },
            headers: {
              Authorization: 'Bearer ' + token
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
    async sort (dataSort, token) {
      const { data } = await api
        .post('/training/sort', dataSort.events, {
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
      this.updateTrainings(res)
      return res
    }
  }
})
