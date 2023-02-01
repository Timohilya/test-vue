<template>
    <section class="dashboard">
        <div class="wrapper">
            <h1>Dashboard</h1>
            <div class="dashboard-row">
                <div class="dashboard-col">
                    <UserInfo :data="activeUser" />
                </div>
                <div class="dashboard-col">
                    <CreateForm />
                </div>
            </div>
            <Filter />
            <List />
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import UserInfo from '../modules/users/UserInfo.vue'
import Filter from '../modules/todo/Filter.vue'
import List from '../modules/todo/List.vue'
import CreateForm from '../modules/todo/CreateForm.vue'

export default {
    name: 'Dashboard',
    components: {
        UserInfo,
        Filter,
        List,
        CreateForm
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