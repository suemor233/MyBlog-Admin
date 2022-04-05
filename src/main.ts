import { createApp } from 'vue'
import App from './App'
import router from "@/router"
import store from './store'
import './styles/index.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'


createApp(App).use(router).use(store).mount('#app')
