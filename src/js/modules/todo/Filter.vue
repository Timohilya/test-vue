<template>
    <div class="todos-filter">
        <p class="title">Filter todo</p>
        <form>
            <div class="form-field">
                <input type="text" name="search" placeholder="Search" v-model="query">
            </div>
            <Select :label="'Type'"
                    :options="typeOptions"
                    v-model="type" />
            <Select :label="'UserId'"
                    :options="userIdOptions"
                    v-model="userId" />
        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Select from '../../components/Select.vue'

export default {
    name: 'Filter',
    data() {
        return {
            query: '',
            type: '',
            userId: null,
            typeOptions: [
                { value: '', name: 'All', selected: true },
                { value: 'completed', name: 'Completed' },
                { value: 'uncompleted', name: 'Uncompleted' },
                { value: 'favorites', name: 'Favorites' }
            ]
        }
    },
    components: {
        Select
    },
    computed: {
        ...mapGetters({
            userIds: 'todos/getUserIds'
        }),

        userIdOptions() {
            const result = [{ value: '', name: 'All', selected: true }]
            if ( this.userIds === null ) return result
            this.userIds.forEach(id => {
                result.push({ value: id, name: id })
            })
            return result
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