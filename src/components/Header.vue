<template>
    <ul>
        <li v-for="link in links">
          <router-link :to="link.href">{{link.title}}</router-link>
        </li>
    </ul>
</template>
<script>
export default {
    data() {
         return {
            links: [
                {
                    title: "Главная",
                    href: "/"
                },
                {
                    title: "Логин",
                    href: "/login"
                }
            ]
         }
    },

}
</script>
<style scoped></style>