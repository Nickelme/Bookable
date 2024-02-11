import { createRouter, createWebHistory } from 'vue-router'
import roomList from '../views/room-list.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'RoomList',
            component: roomList,
        },
    ]
})

export default router
