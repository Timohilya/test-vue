import { createStore } from "vuex"
import users from '../modules/users/store'
import todos from '../modules/todo/store'

const store = createStore({
    modules: {
        users,
        todos
    }
})

export default store