import { createApp } from 'vue'
import App from './App'
import {router} from "@/router"
import store from './store/user'
import './styles/index.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import "animate.css"

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
createApp(App).use(router).use(store).mount('#app')
