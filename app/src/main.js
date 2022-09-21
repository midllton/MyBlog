import { createApp } from 'vue'
// import ViewUIPlus from 'view-ui-plus' // viewUI for vue3
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-ui-plus/dist/styles/viewuiplus.css' // css for viewUI

createApp(App).use(store).use(router).mount('#app')
