import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'
import { exposeAuth0 } from './plugins'

const app = createApp(App)
const pinia = createPinia()

app.use(
  createAuth0({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
    audience: process.env.VUE_APP_AUTH0_API_ID
  })
).use(exposeAuth0())

app.use(pinia)
app.use(router)
app.mount('#app')
