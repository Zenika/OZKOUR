import axios from 'axios'

export const api = axios.create({
  baseURL : process.env.VUE_APP_SERVER || "http://localhost:3000",
  timeout: 60000
})
