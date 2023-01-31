<template>
    <div class="user-info" v-if="data != null">
        <p class="title">{{ data.username }}</p>
        <div class="row">
            <p>Name:</p>
            <p>{{ data.name }}</p>
        </div>
        <div class="row">
            <p>Email:</p>
            <p>{{ data.email }}</p>
        </div>
        <div class="row">
            <p>Phone:</p>
            <p>{{ data.phone }}</p>
        </div>
        <div class="row">
            <p>Website:</p>
            <a :href="data.website" target="_blank">{{ data.website }}</a>
        </div>
    </div>
    <div class="user-info" v-else>
        <p class="title">Loading...</p>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',
    props: {
        data: {
            require: true,
            type: Object
        }
    }
}
</script>

<style scoped>

</style>