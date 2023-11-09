<template>
    <div class="text-left">
        <h2 class="mb-4 text-xl font-bold">Syykoodiryhmät</h2>
        <div v-for="cause in categories" :key="cause.id" class="mb-6">
            <p class="pb-1">
                <strong class="pr-3 text-xl font-mono">{{ cause.code }}</strong><strong>{{ cause.name }}</strong>
            </p>
            <p>
                Vastuu: <strong>{{ cause.responsibility }}</strong><strong v-if="cause.secondary">, sekundäärinen</strong>
            </p>
            <p>
                <em>{{ cause.description }}</em>
            </p>
        </div>
        <hr class="my-4" />
        <h2 class="text-xl mb-4">1-tason syykoodit</h2>
        <div v-for="cause in detailedCategories" :key="cause.id" class="mb-6">
            <p class="pb-1">
                <strong class="pr-3 text-xl font-mono">{{ cause.code }}</strong><strong>{{ cause.name }}</strong>
            </p>
            <p>
                Vastuu: <strong>{{ cause.responsibility }}</strong><strong v-if="cause.secondary">, sekundäärinen</strong>
            </p>
            <p>
                <em>{{ cause.description }}</em>
            </p>
        </div>
        <hr class="my-4" />
        <h2 class="text-xl mb-4">2-tason syykoodit</h2>
        <div v-for="cause in thirdCategories" :key="cause.id" class="mb-6">
            <p class="pb-1">
                <strong class="pr-3 text-xl font-mono">{{ cause.code }}</strong><strong>{{ cause.name }}</strong>
            </p>
            <p>
                Vastuu: <strong>{{ cause.responsibility }}</strong><strong v-if="cause.secondary">, sekundäärinen</strong>
            </p>
            <p>
                <em>{{ cause.description }}</em>
            </p>
        </div>
    </div>
</template>

<script>
import categories from '@/assets/data/category-exp.json';
import detailedCategories from '@/assets/data/detailedCategory-exp.json';
import thirdCategories from '@/assets/data/thirdCategory-exp.json';

export default {
    name: 'Causes',
    components: {},
    methods: {},
    data() {
        return {
            loading: false,
            error: null,
            categories,
            detailedCategories,
            thirdCategories,
        };
    },
    mounted() {
        console.table(this.categories);
    },
};
</script>
