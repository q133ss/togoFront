import {createRouter, createWebHistory} from "vue-router";

import Index from "@/views/Index.vue";
import Login from '@/views/auth/login.vue';

//проверка на токен
function checkAuth() {
    let name = "token";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            //return c.substring(name.length, c.length);
            return true;
        }
    }
    return window.location.href = '/login';
}

//возвращает на главную со страниц с авторизацией
function returnMainPage() {
    let name = "token";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            //return c.substring(name.length, c.length);
            return window.location.href = '/';
        }
    }
    return true;
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Index, beforeEnter: [checkAuth]},
        {path: '/login', component: Login, beforeEnter: [returnMainPage]}
    ]
});

export default router