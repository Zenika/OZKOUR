import axios from 'axios'

export const api = axios.create({
  baseURL : process.env.VUE_APP_SERVER,
  timeout: 60000
})
