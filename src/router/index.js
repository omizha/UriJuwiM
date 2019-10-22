import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/About.vue')
    },
    {
        path: '/map_view',
        name: 'map',
        component: () => import('../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
