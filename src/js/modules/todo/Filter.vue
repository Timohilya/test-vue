<template>
    <div class="todos-filter">
        <p class="title">Filter todo</p>
        <form>
            <div class="form-field">
                <input type="text" name="search" placeholder="Search" v-model="query">
            </div>
            <select v-model="type">
                <option value="" selected>All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
                <option value="favorites">Favorites</option>
            </select>
            <select v-model="userId">
                <option value="" selected>All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'Filter',
    data() {
        return {
            query: '',
            type: '',
            userId: null
        }
    },
    watch: {
        query(value) {
            this.setFilterQuery(value)
        },
        type(value) {
            this.setFilterType(value)
        },
        userId(value) {
            this.setFilterUserId(parseInt(value))
        }
    },
    methods: {
        ...mapMutations({
            setFilterQuery: 'todos/setFilterQuery',
            setFilterType: 'todos/setFilterType',
            setFilterUserId: 'todos/setFilterUserId'
        })
    }
}
</script>

<style scoped>

</style>