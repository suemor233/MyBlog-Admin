import { createApp } from 'vue'
import App from './App'
import {router} from "@/router"

import './styles/index.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import "animate.css"
import { createPinia } from 'pinia'
import { registerStore } from './store'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)


const app = createApp(App)
app.use(createPinia());
registerStore();
app.use(router).mount('#app')
