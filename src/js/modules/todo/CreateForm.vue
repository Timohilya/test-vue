<template>
    <div class="todo-create">
        <p class="title">Create todo</p>
        <form>
            <div class="form-field"
                    :class="{error: v$.formData.userId.$errors.length }">
                <input type="text" name="userId" placeholder="User ID" v-model="formData.userId" />
                <template v-if="v$.$dirty">
                    <p class="error" v-if="v$.formData.userId.required.$invalid">User id is required</p>
                    <p class="error" v-if="v$.formData.userId.isNumber.$invalid">User id must be number</p>
                </template>
            </div>
            <div class="form-field"
                    :class="{error: v$.formData.title.$errors.length }">
                <textarea name="title" rows="2" placeholder="Title" v-model="formData.title"></textarea>
                <template v-if="v$.$dirty">
                    <p class="error" v-if="v$.formData.title.required.$invalid">Title is required</p>
                </template>
            </div>
            <button class="btn" @click.prevent="submit()">Create</button>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const isNumber = (value) => !!value.match(/^[0-9]*$/)

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    name: 'CreateForm',
    data() {
        return {
            formData: {
                userId: '',
                title: ''
            }
        }
    },
    validations() {
        return {
            formData: {
                userId: {
                    required,
                    isNumber: (value) => isNumber(value)
                },
                title: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            todoLastId: 'todos/getLastId'
        }),
    },
    methods: {
        ...mapMutations({
            pushTodo: 'todos/pushTodo'
        }),

        resetForm() {
            this.formData.userId = ''
            this.formData.title = ''
            this.v$.$reset()
        },

        submit() {
            this.v$.$touch()
            if ( !this.v$.$invalid ) {
                const data = {
                    userId: this.formData.userId,
                    id: this.todoLastId+1,
                    title: this.formData.title,
                    completed: false
                }
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        this.pushTodo(data)
                        this.resetForm()
                    })
                    .catch(err => console.log(err))
            }
        }
    }
}
</script>

<style scoped>

</style>