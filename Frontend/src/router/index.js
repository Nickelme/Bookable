import { createRouter, createWebHistory } from 'vue-router'
import loginPage from '../views/login.vue'
import siteList from '../views/siteList.vue'
import siteSettings from "../views/siteSettings.vue"
import roomSettings from "../views/rooms/roomSettings.vue"
import roomList from "../views/rooms/roomList.vue"
import dashboard from "../views/dashboard.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'RoomList',
            component: dashboard,
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
        },
        {
            path: '/rooms',
            name: 'Rooms',
            component: roomList
        }, {
            path: '/room-settings/:id',
            name: 'Room Settings',
            component: roomSettings
        }
    ]
})

export default router
