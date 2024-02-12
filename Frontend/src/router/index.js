import { createRouter, createWebHistory } from 'vue-router'
import roomList from '../views/room-list.vue'
import loginPage from '../views/login.vue'

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
        }
    ]
})

export default router
