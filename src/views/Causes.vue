<template>
    <div class="text-left font-mono">
        <h2>Syyluokat</h2>
        <div v-for="cause in causeCategories" :key="cause.id">
            {{ cause.categoryCode }} - {{ cause.categoryName}}
        </div>
        <br>
        <h2>Syykoodit</h2>
        <div v-for="cause in detailedCauses" :key="cause.id">
            {{ cause.detailedCategoryCode }} - {{ cause.detailedCategoryName}}
            <strong v-if="cause.responsibility">{{ cause.responsibility }}</strong>
            <strong v-else>unknown</strong>
            <strong v-if="cause.secondary">, sekundäärinen</strong>
        </div>
        <br>
        <h2>Kolmannen tason syykoodit</h2>
        <div v-for="cause in thirdCauses" :key="cause.id">
            {{ cause.thirdCategoryCode }} - {{ cause.thirdCategoryName}}
            <strong>{{ cause.responsibility }}</strong>
            <strong v-if="cause.secondary">, sekundäärinen</strong>
        </div>
    </div>
</template>

<script>
import causeCategories from '@/assets/data/category-exp.json';
import detailedCauses from '@/assets/data/detailedCategory-exp.json';
import thirdCauses from '@/assets/data/thirdCategory-exp.json';

export default {
    name: 'Causes',
    components: {},
    methods: {},
    data() {
        return {
            loading: false,
            error: null,
            causeCategories,
            detailedCauses,
            thirdCauses,
            date: this.$route.params.date,
            trainNumber: this.$route.params.trainNumber,
        };
    },
    mounted() {
        console.table(this.causeCategories);
    },
};
</script>
