const Todos = {
    namespaced: true,
    state() {
        return {
            todos: null,
            reverse: true,
            filter: {
                query: '',
                type: '',
                userId: ''
            }
        }
    },
    actions: {
        fetchTodos: ({ commit }) => {
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then(res => res.json())
                .then(data => {
                    commit('setTodos', data)
                })
                .catch(err => console.log(err))
        }
    },
    mutations: {
        setTodos: (state, data) => {
            state.todos = data
        },
        pushTodo: (state, data) => {
            state.todos.push(data)
        },
        setFilterQuery: (state, value) => {
            state.filter.query = value
        },
        setFilterType: (state, value) => {
            state.filter.type = value
        },
        setFilterUserId: (state, value) => {
            state.filter.userId = value
        }
    },
    getters: {
        getFilteredTodos: (state) => {
            if ( !!state.todos ) {

                let result = state.todos

                if ( state.filter.type === 'completed' ) {
                    result = result.filter(todo => todo.completed === true)
                }

                if ( state.filter.type === 'uncompleted' ) {
                    result = result.filter(todo => todo.completed === false)
                }

                if ( state.filter.type === 'favorites' ) {
                    let favoritesTodos = window.localStorage.getItem('favoritesTodos')
                    if ( !!favoritesTodos ) {
                        favoritesTodos = favoritesTodos.split(',').map(el => parseInt(el))
                        result = result.filter(todo => favoritesTodos.includes(todo.id))
                    } else {
                        return []
                    }
                }

                if ( state.filter.userId ) {
                    result = result.filter(todo => todo.userId === state.filter.userId)
                }

                if ( state.filter.query ) {
                    result = result.filter(todo => todo.title.startsWith(state.filter.query))
                }
                
                console.log(result)
                return result
            }
            return null
        },
        getLastId: (state) => {
            return state.todos[state.todos.length-1].id
        },
        getIsReverse: (state) => {
            return state.reverse
        }
    }
}

export default Todos