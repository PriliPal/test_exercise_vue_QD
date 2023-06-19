import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import tasks from '@/store/tasks.js'
import './assets/css/app.css'

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules:{
        tasks,
    }
})

createApp(App).use(router).use(store).mount('#app')
