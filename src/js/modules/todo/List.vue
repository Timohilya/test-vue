<template>
    <div class="todos-list">
        <p class="title">Todos list</p>
        <div class="list" v-if="todos != null && todos.length">
            <div class="item">
                <div><p>UserId</p></div>
                <div><p>Title</p></div>
                <div><p>Is Completed</p></div>
            </div>
            <div v-for="todo in todosList"
                 class="item">
                <div><p>{{ todo.userId }}</p></div>
                <div><p>{{ todo.title }}</p></div>
                <div>
                    <img v-if="todo.completed" src="../../../assets/done.svg" alt="Completed" />
                    <img v-else src="../../../assets/not-done.svg" alt="Not completed" />
                </div>
                <div>
                    <button @click="changeFavorite(todo.id)">
                        <img :src="'../../../assets/' + (favorites.includes(todo.id) ? 'favorite.png' : 'not-favorite.png')" alt="Favorite" />
                    </button>
                </div>
            </div>
        </div>
        <div class="todos-list" v-else-if="todos != null && todos.length === 0">
            <p class="text">Empty list</p>
        </div>
        <div class="todos-list" v-else>
            <p class="text">Loading...</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'List',
    data() {
        return {
            favorites: []
        }
    },
    computed: {
        ...mapGetters({
            todos: 'todos/getFilteredTodos',
            reverse: 'todos/getIsReverse'
        }),

        todosList() {
            return this.reverse ? this.todos.map(el => el).reverse() : this.todos
        }
    },
    methods: {
        fetchTodos() {
            this.$store.dispatch('todos/fetchTodos')
        },

        getFavorites() {
            const favoritesTodos = window.localStorage.getItem('favoritesTodos')
            if ( !!favoritesTodos ) {
                this.favorites = favoritesTodos.split(',').map(el => parseInt(el))
            }
        },

        setFavorites() {
            window.localStorage.setItem('favoritesTodos', this.favorites)
        },

        changeFavorite(id) {
            if ( this.favorites.includes(id) ) {
                for( var i = 0; i < this.favorites.length; i++){ 
                    if ( this.favorites[i] === id) { 
                        this.favorites.splice(i, 1); 
                    }
                }
            } else {
                this.favorites.push(id)
            }
            this.setFavorites()
        },
    },
    mounted() {
        this.getFavorites()
        this.fetchTodos()
    }
}
</script>

<style scoped>

</style>