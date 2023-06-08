import { ref } from 'vue'

export const client = ref(null)

export function exposeAuth0 () {
  return {
    install (app) {
      client.value = app.config.globalProperties.$auth0
    }
  }
}
