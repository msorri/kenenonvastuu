<template>
    <form id="form" @submit.prevent="goToTrain">
        <input
            v-model="trainNumber"
            type="number"
            class="border-black border mb-4 block"
            placeholder="Junanumero" required
        />
        <input v-model="date" type="date" class="border-black border mb-4 block" />
        <input type="submit" class="" value="hae" />
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
            console.log({ trainNumber: this.trainNumber, date: this.date });
            this.$router.push({
                name: 'Train',
                params: { trainNumber: this.trainNumber, date: this.date },
            });
        },
    },
};
</script>
