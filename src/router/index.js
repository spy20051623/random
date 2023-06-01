import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'default',
        component: () => import('../components/card.vue'),
    },
    {
        path: '/card',
        name: 'card',
        component: () => import('../components/card.vue')
    },
    {
        path: '/equipment',
        name: 'equipment',
        component: () => import('../components/equipment.vue')
    },
    {
        path: '/cat',
        name: 'cat',
        component: () => import('../components/cat.vue')
    },
    {
        path: '/card-g',
        name: 'card-g',
        component: () => import('../components/card-g.vue')
    },
    {
        path: '/equipment-g',
        name: 'equipment-g',
        component: () => import('../components/equipment-g.vue')
    },
    {
        path: '/cat-g',
        name: 'cat-g',
        component: () => import('../components/cat-g.vue')
    },
    {
        path: '/cat-b',
        name: 'cat-b',
        component: () => import('../components/cat-b.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
