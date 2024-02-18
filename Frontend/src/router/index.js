import { createRouter, createWebHistory } from 'vue-router'
import roomList from '../views/room-list.vue'
import loginPage from '../views/login.vue'
import siteList from '../views/siteList.vue'
import siteSettings from "../views/siteSettings.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'RoomList',
            component: roomList,
        },
        {
            path: '/login',
            name: 'Login',
            component: loginPage
        },
        {
            path: '/sites',
            name: 'Sites',
            component: siteList
        },
        {
            path: '/site-settings/:id',
            name: 'Site Settings',
            component: siteSettings
        }
    ]
})

export default router
