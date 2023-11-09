<template>
    <div class="m-4 lg:m-8 xl:max-w-7xl xl:mx-auto">
        <h1 class="text-3xl">kenen on vastuu</h1>
        <router-link to="/">Etusivu</router-link>
        &middot;
        <router-link to="/causes">Syykoodit</router-link>
        <br /><br />
        <router-view></router-view>
        <p class="mt-4 lg:mt-8 text-gray-500 text-xs">Liikennetiedot Fintraffic / <a href="https://rata.digitraffic.fi">Digitraffic</a>, CC 4.0 BY</p>
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
        // console.table(this.causeCategories);
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
