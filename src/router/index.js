import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Intro',
        component: () => import('../views/Intro.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/dashboard/:cname',
        name: 'Dashboard2',
        component: () => import('../components/PlaceIntroduction.vue')
    },
    {
        path: '/explore',
        name: 'Explore',
        component: () => import('../views/Explore.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search.vue')
    },
    {
        path: '/share',
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
