import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router.js'
import './assets/css/app.css'
import App from './App.vue'
import MicroWidget from '../lib/index'
Vue.use(VueRouter)
Vue.use(MicroWidget)
const app = new Vue({
    el: '#app-container',
    router,
    components: {
        App
    },
    template: '<App/>'
})

window.appInstance = app
