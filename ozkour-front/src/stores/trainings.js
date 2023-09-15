import qs from 'qs'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'
import { isEqual } from 'lodash'

export const useTrainingStore = defineStore({
  id: 'training',
  state: () => ({
    retrieved: [],
    warning: [],
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
    updateTrainings (newTrainings, warning, status) {
      if (status === 200) {
        this.retrieved = newTrainings
        this.warning = []
      }
      if (status === 206) {
        this.retrieved = newTrainings
        this.warning = warning
      }
    },
    sortTrainings (sortTraining) {
      this.retrieved = sortTraining
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
      case 'Train-with-us': {
        const { data } = await api.post(
          '/training/Train-with-us',
          this.getSelectedTrainings
        )
        return { link: data.link, message: data.message }
      }
      case 'Train-with-us-green': {
        const { data } = await api.post(
          '/training/Train-with-us-green',
          this.getSelectedTrainings
        )
        return { link: data.link, message: data.message }
      }
      case 'Formez-vous': {
        const { data } = await api.post(
          '/training/Formez-vous',
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
          const res = data.map((talk) => {
            return {
              ...talk,
              checked: true
            }
          })
          this.updateTrainings(res, undefined, status)
          return res
        }
        if (status === 206) {
          const res = data.res.map((talk) => {
            return {
              ...talk,
              checked: true
            }
          })
          this.updateTrainings(res, data.warn, status)
          return res
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
      this.sortTrainings(res)
      return res
    }
  }
})
