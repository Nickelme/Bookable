import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';

export const useUserStore = defineStore('user', () => {
    const accessToken = ref(null);
    const isLoggedIn = ref(false);
    const isLoggingIn = ref(false);
    const userInfo = ref({});

    accessToken.value = localStorage.getItem("AccessToken");

    console.log(accessToken.value);

    function checkLogin() {
        if (accessToken != null) {
            (async () => {
                try {
                    const response = await axios.get('/api/users/me', {
                        headers: {
                            'authorization': `Bearer ${accessToken.value}`
                        }
                    });
                    userInfo.value = response.data.user;
                    if(isLoggingIn.value){
                        localStorage.setItem("AccessToken", accessToken.value);
                        isLoggingIn.value = false;
                    }
                    isLoggedIn.value = true;
                    if(router.currentRoute.value.path == "/login"){
                        router.push({ path: '/'});
                    }
                } catch (err) {
                    if(isLoggingIn.value){
                        isLoggingIn.value = false;
                    }else{
                        router.push({ path: '/login' });
                    }
                }
            })();
        }
    }
    checkLogin();

    function attemptLogin(email, password) {
        isLoggingIn.value = true;
        (async () => {
            try {
                const response = await axios.post('/api/users/login', { email: email, password: password });

                accessToken.value = response.data.accessToken;
                checkLogin();
            } catch (err) {
                console.log(err);
            }
        })();
    }

    function logout(){
        localStorage.removeItem("AccessToken");
        isLoggedIn.value = false;
        accessToken.value = "";
        userInfo.value = {};
        router.push({ path: '/login'});
    }

    return { accessToken, isLoggedIn, userInfo, attemptLogin, isLoggingIn, logout };
})