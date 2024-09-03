import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import Bootstrap
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"

//import Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css"

createApp(App).use(router).mount('#app')
