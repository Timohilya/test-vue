<template>
    <section class="login">
        <div class="wrapper">
            <div class="box">
                <div class="title">
                    <p>description</p>
                </div>
                <form>
                    <p class="text">description</p>
                    <div class="form-field"
                         :class="{error: v$.formData.username.$errors.length }">
                        <input type="text" name="username" placeholder="Username" v-model="formData.username" />
                        <template v-if="v$.$dirty">
                            <p class="error" v-if="v$.formData.username.required.$invalid">Username is required</p>
                            <p class="error" v-if="v$.formData.username.isAlpha.$invalid">Use only english alphabet</p>
                        </template>
                        <p class="error" v-if="userNotFound">Login error</p>
                    </div>
                    <div class="form-field"
                         :class="{error: v$.formData.phone.$errors.length }">
                        <input type="text" name="phone" placeholder="Phone number" v-model="formData.phone" />
                        <template v-if="v$.$dirty">
                            <p class="error" v-if="v$.formData.phone.required.$invalid">Phone number is required</p>
                            <p class="error" v-if="v$.formData.phone.isPhone.$invalid">Phone number is invalid</p>
                        </template>
                    </div>
                    <button class="btn" @click.prevent="submit()">Login</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const isAlpha = (value) => !!value.match(/^[a-zA-Z ]*$/)
const isPhone = (value) => !!value.match(/^[0-9()\-.x ]*$/)

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    name: 'Login',
    data() {
        return {
            formData: {
                username: 'Bret',
                phone: '1-770-736-8031 x56442'
            },
            userNotFound: false
        }
    },
    validations() {
        return {
            formData: {
                username: {
                    required,
                    isAlpha: (value) => isAlpha(value)
                },
                phone: {
                    required,
                    isPhone: (value) => isPhone(value)
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            users: 'users/getUsers'
        }),
    },
    methods: {
        ...mapMutations({
            setActiveUser: 'users/setActiveUser'
        }),

        submit() {
            this.v$.$touch()
            if ( !this.v$.$invalid && this.users != null ) {
                const user = this.users.find(el => el.username === this.formData.username && el.phone === this.formData.phone)
                if ( !!user ) {
                    this.setActiveUser(user)
                    this.redirectToDashboard()
                } else {
                    this.userNotFound = true
                }
            }
        },

        redirectToDashboard() {
            this.$router.push({ name: 'dashboard' })
        }
    },
    mounted() {
        this.$store.dispatch('users/fetchUsers')
    }
}
</script>

<style scoped>

</style>