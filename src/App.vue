<template>
    <div class="m-4 lg:m-8">
        <h1 class="text-3xl">kenenonvastuu</h1>
        <router-link to="/">Etusivu</router-link>
        &middot;
        <router-link to="/causes">Syykoodit</router-link>
        <br /><br />
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    methods: {},
    data() {
        return {
            loading: false,
            error: null,
        };
    },
    mounted() {
        console.table(this.causeCategories);
    },
};
</script>

<style>
#app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
