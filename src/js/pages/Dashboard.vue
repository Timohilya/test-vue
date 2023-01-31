<template>
    <section class="dashboard">
        <div class="wrapper">
            <h1>Dashboard</h1>
            <UserInfo :data="activeUser" />
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import UserInfo from '../modules/users/UserInfo.vue'

export default {
    name: 'Dashboard',
    components: {
        UserInfo
    },
    computed: {
        ...mapGetters({
            activeUser: 'users/getActiveUser',
            isAuth: 'users/getIsAuth'
        })
    },
    methods: {
        checkOnAuth() {
            if ( !this.isAuth ) {
                this.redirectToLogin()
            }
        },

        redirectToLogin() {
            this.$router.push({ name: 'login' })
        }
    },
    mounted() {
        this.checkOnAuth()
    }
}
</script>

<style scoped>

</style>