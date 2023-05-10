import {createRouter, createWebHistory} from "vue-router";

import Index from "@/views/Index.vue";
import Blog from "@/views/Blog.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Index},
        {path: '/blog', component: Blog}
    ]
});

export default router