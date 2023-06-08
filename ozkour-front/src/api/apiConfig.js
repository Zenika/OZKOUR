import axios from 'axios'
import { client } from '../plugins'

export async function useApi () {
  const token = await client.value.getAccessTokenSilently()
  const api = axios.create({
    baseURL: process.env.VUE_APP_SERVER || 'http://localhost:3000',
    timeout: 60000,
    headers: {
      common: { Authorization: `bearer ${token}` }
    }
  })
  return api
}

export const apiWithoutToken = axios.create({
  baseURL: process.env.VUE_APP_SERVER || 'http://localhost:3000',
  timeout: 60000
})
