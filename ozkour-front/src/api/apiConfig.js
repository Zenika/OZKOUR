import axios from 'axios'
import { client } from '../plugins'

export const api = axios.create({
  baseURL: process.env.VUE_APP_SERVER || 'http://localhost:3000',
  timeout: 60000,
  headers: {}
})

api.interceptors.request.use(async (config) => {
  const token = await client.value.getAccessTokenSilently()
  config.headers.Authorization = `Bearer ${token}`
})
