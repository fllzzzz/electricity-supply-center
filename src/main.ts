import router from './router';
import '@styles/global.css';

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
.use(router)
.mount('#app')