import { createStore } from "vuex"
import users from '../modules/users/store'

const store = createStore({
    modules: {
        users
    }
})

export default store