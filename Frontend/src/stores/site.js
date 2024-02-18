import { defineStore, storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import axios from 'axios';
import router from '../router';
import { useUserStore } from './user';

export const useSiteStore = defineStore('site', () => {
    const sites = ref([]);
    const activeSite = ref(null);
    const userStore = useUserStore();
    const {isLoggedIn, accessToken} = storeToRefs(userStore);

    function getSites(){
        (async ()=>{
            try{
                const response = await axios.get("/api/sites/list", { headers: { Authorization: `Bearer ${accessToken.value}`}});
                sites.value = response.data.sites;
                if(activeSite.value == null && response.data.sites.length > 0){
                    activeSite.value = response.data.sites[0]._id;
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }

    watch(isLoggedIn, ()=>{
        if(isLoggedIn.value){
            getSites();
        }
    });
    
    if(isLoggedIn.value){
        getSites();
    }

    function updateSite(siteId, siteObj){
        (async ()=>{
            const response = await axios.patch("/api/sites/" + siteId, siteObj, { headers: { Authorization: `Bearer ${accessToken.value}` } });
            getSites();
        })();
    }

    return {sites, activeSite, getSites, updateSite}
});