import { defineStore, storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import axios from 'axios';
import router from '../router';
import { useUserStore } from './user';
import { useSiteStore } from './site'

export const useRoomStore = defineStore('room', () => {
    const rooms = ref([]);
    const userStore = useUserStore();
    const siteStore = useSiteStore();
    const {isLoggedIn, accessToken} = storeToRefs(userStore);

    function getRooms(){
        (async ()=>{
            try{
                const response = await axios.get("/api/rooms/list", { headers: { Authorization: `Bearer ${accessToken.value}`}});
                rooms.value = response.data.rooms;

            } catch (err) {
                console.log(err);
            }
        })();
    }

    watch(isLoggedIn, ()=>{
        if(isLoggedIn.value){
            getRooms();
        }
    });
    
    if(isLoggedIn.value){
        getRooms();
    }

    function updateRoom(roomId, roomObj){
        (async ()=>{
            const response = await axios.patch("/api/rooms/" + roomId, roomObj, { headers: { Authorization: `Bearer ${accessToken.value}` } });
            getRooms();
        })();
    }

    function createNewRoom(roomName){
        (async ()=>{
            const response = await axios.post("/api/rooms/create", { roomName, siteId: siteStore.activeSite }, { headers: { Authorization: `Bearer ${accessToken.value}` } });
            getRooms();
        })();
    }

    return { rooms, getRooms, updateRoom, createNewRoom}
});