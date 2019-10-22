import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/Explore',
        name: 'Explore',
        component: () => import('../views/Explore.vue')
    },
    {
        path: '/Search',
        name: 'Search',
        component: () => import('../views/Search.vue')
    },
    {
        path: '/Share',
        name: 'Share',
        component: () => import('../views/Share.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
