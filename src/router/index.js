import {createRouter, createWebHistory} from "vue-router";

import Index from "@/views/Index.vue";
import Login from '@/views/auth/login.vue';
import Register from "@/views/auth/register.vue";
import Profile from "@/views/profile/index.vue";
import Settings from "@/views/profile/Settings.vue";
import Analytics from "@/views/Analytics.vue";
import Finance from "@/views/Finance.vue";
import Abc from "@/views/Abc.vue";

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
    router.push({ path: '/login' })
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
            return router.push({ path: '/' });
        }
    }
    return true;
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Index, beforeEnter: [checkAuth]},
        {path: '/login', component: Login, beforeEnter: [returnMainPage]},
        {path: '/register', component: Register, beforeEnter: [returnMainPage]},
        {path: '/profile', component: Profile, beforeEnter: [checkAuth]},
        {path: '/settings', component: Settings, beforeEnter: [checkAuth]},
        {path: '/analytics', component: Analytics, beforeEnter: [checkAuth]},
        {path: '/finance', component: Finance, beforeEnter: [checkAuth]},

        {path: '/abc', component: Abc, beforeEnter: [checkAuth]},
        {path: '/abc/size', component: Abc, beforeEnter: [checkAuth]}

        // {path: '/stock', component: Analytics, beforeEnter: [checkAuth]},
        // {path: '/promotion', component: Analytics, beforeEnter: [checkAuth]},
        // {path: '/competitors', component: Analytics, beforeEnter: [checkAuth]}
    ]
});

export default router


//Делаем настройки, затем главный экран +++
//Делаем выбор периода!!! +++
//потом делаем линки на страницу с регистрацией и тд
//затем графики