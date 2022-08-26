<template>
    <form id="form" @submit.prevent="goToTrain">
        <input
            v-model="trainNumber"
            type="number"
            class="border border-gray-700 border-b-0 p-1 w-48 h-8 block"
            placeholder="Junanumero" required
        />
        <input v-model="date" type="date" class="border border-gray-700 p-1 mb-4 w-48 h-8 block" />
        <input type="submit" class="p-2 w-16 rounded-full leading-none bg-blue-500 text-white cursor-pointer focus:outline-none" value="Hae" />
    </form>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            trainNumber: null,
            date: new Date().toISOString().slice(0, 10),
        };
    },
    methods: {
        goToTrain() {
            // console.log({ trainNumber: this.trainNumber, date: this.date });
            this.$router.push({
                name: 'Train',
                params: { trainNumber: this.trainNumber, date: this.date },
            });
        },
    },
};
</script>
