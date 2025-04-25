import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'  // ✅ 加这一行

const app = createApp(App)
app.use(i18n)              // ✅ 加这一行
app.mount('#app')