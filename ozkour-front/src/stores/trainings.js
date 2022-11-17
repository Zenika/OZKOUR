import qs from 'qs'
import dateFormat from 'dateformat'
import { defineStore } from 'pinia'
import { api } from '@/api/apiConfig'

export const useTrainingStore = defineStore({
  id: 'training',
  state: () => ({
    retrieved: [],
    date: {},
    retreivingTrainings: false
  }),
  getters: {
    getSelectedTrainings: (state) =>
      state.retrieved.filter((training) => {
        return training.checked
      })
  },
  actions: {
    updateTrainings (newTrainings) {
      this.retrieved = newTrainings
    },
    checkTraining (selected) {
      this.retrieved.find(training =>
        training.trainingTitle === selected.trainingTitle).checked = true
    },
    uncheckTraining (selected) {
      this.retrieved.find(training =>
        training.trainingTitle === selected.trainingTitle).checked = false
    },
    selectedDate (start, end) {
      start = dateFormat(Date.parse(start), 'dd/mm/yyyy')
      end = dateFormat(Date.parse(end), 'dd/mm/yyyy')
      this.date = { start, end }
    },
    async generateVisualForSelectedTrainings (templateName) {
      switch (templateName) {
      case 'E-mailing': {
        const { data } = await api
          .post('/training/emailing', this.getSelectedTrainings)
        return data.link
      }
      default:
        console.error('template :"', templateName, "\" n'est pas reconnu")
        return '/'
      }
    },
    async getTrainings (dateStart, dateEnd) {
      this.retreivingTrainings = true
      try {
        const { data } = await api
          .get('/training', {
            params: {
              start: dateStart,
              end: dateEnd
            },
            paramsSerializer: (params) => qs.stringify(params, { encode: false })
          })
        this.updateTrainings(data)
        this.selectedDate(dateStart, dateEnd)
        console.log(this.retrieved)
      } finally {
        this.retreivingTrainings = false
      }
    }
  }
})
