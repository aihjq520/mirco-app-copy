import VueRouter from 'vue-router'
import Usage from './views/usage/index.vue'
import Options from './views/options/index.vue'
import ChangeLog from './views/changeLog/index.vue'
// import Basic from './views/examples/Basic.vue'

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: function () {
                return 'usage'
            }
        },
        {
            path: '/usage',
            name: 'usage',
            component: Usage
        },
        {
            path: '/options',
            name: 'options',
            component: Options
        },
        {
            path: '/change-log',
            name: 'change-log',
            component: ChangeLog
        }
        // {
        //     path: '/basic',
        //     name: 'basic',
        //     component: Basic
        // }
    ]
})

export default router
