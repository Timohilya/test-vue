import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: '/', name: 'login', component: () => import('../pages/Login.vue') },
    { path: '/dashboard', name: 'dashboard', component: () => import('../pages/Dashboard.vue') },
    { path: '/:path(.*)*', redirect: { name: 'login' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router