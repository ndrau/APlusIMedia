import './assets/main.scss'
import './styles/animations.css'
import './styles/glass-morphism.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import VueWriter from 'vue-writer'

import App from './App.vue'
import router from './router'

// Import Naive UI
import {
  create,
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NLoadingBarProvider
} from 'naive-ui'

// Import i18n messages
import en from './locales/en.json'
import de from './locales/de.json'

const app = createApp(App)

// Configure Naive UI
const naive = create({
  components: [
    NConfigProvider,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NLoadingBarProvider
  ]
})

// Configure i18n following official documentation
const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
})

app.use(router)
app.use(naive)
app.use(i18n)
app.use(VueWriter as any)

app.mount('#app')
