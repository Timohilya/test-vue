const Users = {
    namespaced: true,
    state() {
        return {
            users: null,
            isAuth: false,
            activeUser: null
        }
    },
    actions: {
        fetchUsers: ({ commit }) => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(res => res.json())
                .then(data => {
                    commit('setUsers', data)
                })
                .catch(err => console.log(err))
        }
    },
    mutations: {
        setUsers: (state, data) => {
            state.users = data
        },
        setActiveUser: (state, data) => {
            state.activeUser = data
            state.isAuth = true
        }
    },
    getters: {
        getUsers: (state) => {
            return state.users
        },
        getActiveUser: (state) => {
            return state.activeUser
        },
        getIsAuth: (state) => {
            return state.isAuth
        }
    }
}

export default Users