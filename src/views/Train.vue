<template>
    <div class="about">
        <p>{{ date }} / {{ trainNumber }} <button v-on:click="showPassing = !showPassing" class="p-1 px-2 rounded-full leading-none bg-blue-500 text-white cursor-pointer focus:outline-none">näytä ohitukset</button></p>

        <p v-if="loading">ladataan</p>
        <p v-if="error" class="font-bold text-red-500">{{ error }}</p>
        <div v-if="train" class="mt-2">
            <!-- Train type and commuter line, if exists -->
            <p class="text-3xl font-bold leading-none">
                {{ train.trainType }} {{ train.trainNumber }}
                <span v-if="train.commuterLineID">({{ train.commuterLineID }})</span>
                <span v-if="train.runningCurrently" class="text-gray-400">kulussa</span>
            </p>

            <p class="mb-4">
                <!-- Start and end station -->
                <span class="text-2xl mr-2">
                    {{
                        stations.find(
                            (o) => o.stationShortCode === train.timeTableRows[0].stationShortCode
                        ).stationName
                    }}
                    -
                    {{
                        stations.find(
                            (o) =>
                                o.stationShortCode ===
                                train.timeTableRows[train.timeTableRows.length - 1].stationShortCode
                        ).stationName
                    }}
                </span>
                <br class="sm:hidden">
                <!-- Operator name -->
                {{
                    operators.find((o) => o.operatorShortCode === train.operatorShortCode)
                        .operatorName
                }}
            </p>

            <!-- Timetable -->
            <table class="w-full text-left mb-2 ">
                <thead>
                    <tr>
                        <th class="pl-2">Liikennepaikka</th>
                        <th>Tulo</th>
                        <th>Lähtö</th>
                        <th>Raide</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in filteredTimetable" :key="index" class="striped">
                        <!-- Station name -->
                        <td class="pl-2">
                            {{ row.stationName }}
                            <span v-if="!row.commercialStop" class="text-gray-400"
                                >ei-kaupallinen</span
                            >
                        </td>

                        <!-- Arrival -->
                        <td v-if="row.arrival" class="space-y-1 md:space-y-0 py-2">
                            <!-- Do not show arrival time if the train isn't stopping -->
                            <template v-if="row.trainStopping">
                                <span class="mr-2">
                                    <!-- Scheduled time -->
                                    <span>{{
                                        new Date(row.arrival.scheduledTime)
                                            .toTimeString()
                                            .substr(0, 8)
                                    }}</span>

                                    <!-- Realized time -->
                                    <span v-if="row.arrival.actualTime">
                                        >
                                        {{
                                            new Date(row.arrival.actualTime)
                                                .toTimeString()
                                                .substr(0, 8)
                                        }}</span
                                    >

                                    <!-- Estimated time - do not show if the realized time exists -->
                                    <span v-else-if="row.arrival.liveEstimateTime">
                                        ~
                                        {{
                                            new Date(row.arrival.liveEstimateTime)
                                                .toTimeString()
                                                .substr(0, 8)
                                        }}</span
                                    >
                                </span>

                                <!-- Difference from scheduled to estimated/realized time -->
                                <span
                                    class="mr-2 px-2 py-1 leading-none rounded-full inline-block text-white font-mono"
                                    :class="differenceColorClass(row.arrival.differenceInMinutes)"
                                    v-if="row.arrival.differenceInMinutes?.toString()"
                                    >{{
                                        row.arrival.differenceInMinutes > 0
                                            ? `+${row.arrival.differenceInMinutes}`
                                            : row.arrival.differenceInMinutes
                                    }}</span
                                >
                            </template>
                            <template v-else>
                                <span class="text-gray-400">ei pysähdy</span>
                            </template>

                            <!-- Cause display -->
                            <div v-if="row.arrival.causes.length > 0" class="inline-block">
                                <div
                                    v-for="(cause, index) in row.arrival.causes"
                                    :key="index"
                                    class="mr-2 px-2 py-1 leading-none rounded-full inline-block bg-blue-500 text-white font-mono"
                                >
                                    {{
                                        cause.thirdCategoryCode
                                            ? cause.thirdCategoryCode
                                            : cause.detailedCategoryCode
                                            ? cause.detailedCategoryCode
                                            : cause.categoryCode
                                    }}
                                </div>
                            </div>
                        </td>
                        <td v-else></td>

                        <!-- Departure row -->
                        <td v-if="row.departure" class="space-y-1 md:space-y-0 py-2">
                            <span class="mr-2">
                                <!-- Scheduled time -->
                                <span>{{
                                    new Date(row.departure.scheduledTime)
                                        .toTimeString()
                                        .substr(0, 8)
                                }}</span>

                                <!-- Realized time -->
                                <span v-if="row.departure.actualTime">
                                    >
                                    {{
                                        new Date(row.departure.actualTime)
                                            .toTimeString()
                                            .substr(0, 8)
                                    }}</span
                                >

                                <!-- Estimated time - do not show if the realized time exists -->
                                <span v-else-if="row.departure.liveEstimateTime">
                                    ~
                                    {{
                                        new Date(row.departure.liveEstimateTime)
                                            .toTimeString()
                                            .substr(0, 8)
                                    }}</span
                                >
                            </span>

                            <!-- Difference from scheduled to estimated/realized time -->
                            <span
                                class="mr-2 px-2 py-1 leading-none rounded-full inline-block text-white font-mono"
                                :class="differenceColorClass(row.departure.differenceInMinutes)"
                                v-if="row.departure.differenceInMinutes?.toString()"
                                >{{
                                    row.departure.differenceInMinutes > 0
                                        ? `+${row.departure.differenceInMinutes}`
                                        : row.departure.differenceInMinutes
                                }}</span
                            >

                            <!-- Cause display -->
                            <div v-if="row.departure.causes.length > 0" class="inline-block">
                                <div
                                    v-for="(cause, index) in row.departure.causes"
                                    :key="index"
                                    class="mr-2 px-2 py-1 leading-none rounded-full inline-block bg-blue-500 text-white font-mono"
                                >
                                    {{
                                        cause.thirdCategoryCode
                                            ? cause.thirdCategoryCode
                                            : cause.detailedCategoryCode
                                            ? cause.detailedCategoryCode
                                            : cause.categoryCode
                                    }}
                                </div>
                            </div>
                        </td>
                        <td v-else></td>

                        <!-- Track row -->
                        <td v-if="row.commercialTrack">
                            {{ row.commercialTrack }}
                        </td>
                        <td v-else></td>
                    </tr>
                </tbody>
            </table>

            <div>
                <div v-for="(cause, index) in causes" :key="index">
                    <p class="font-bold text-2xl mt-2">
                        {{ cause.displayCategoryCode }}
                    </p>
                    <p>{{ cause.category.categoryName }}</p>
                    <p>
                        {{ cause.detailedCategory?.detailedCategoryName }}
                        <span v-if="cause.detailedCategory?.secondary" class="text-gray-400"
                            >sekundäärinen</span
                        >
                    </p>
                    <p>
                        {{ cause.thirdCategory?.thirdCategoryName }}
                        <span v-if="cause.thirdCategory?.secondary" class="text-gray-400"
                            >sekundäärinen</span
                        >
                    </p>
                    <div v-if="cause.thirdCategory">
                        Vastuu: {{ cause.thirdCategory.responsibility }}
                    </div>
                    <div v-else-if="cause.detailedCategory.responsibility">
                        Vastuu: {{ cause.detailedCategory.responsibility }}
                    </div>
                    <div v-else>
                        Vastuu: ei tiedossa
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import causeCategories from '@/assets/data/cause-category-codes-exp.json';
import detailedCauses from '@/assets/data/detailed-cause-category-codes-exp.json';
import thirdCauses from '@/assets/data/third-cause-category-codes-exp.json';

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-continue */

export default {
    name: 'Train',
    components: {},
    data() {
        return {
            loading: false,
            error: null,
            date: this.$route.params.date,
            trainNumber: this.$route.params.trainNumber,
            showPassing: false,
            causeCategories,
            detailedCauses,
            thirdCauses,
            stations: null,
            operators: null,
            train: null,
        };
    },
    methods: {
        async fetchData() {
            this.loading = true;
            this.error = null;
            this.train = null;

            try {
                if (this.stations || this.operators === null) this.fetchMetadata();

                let res = await fetch(
                    `https://rata.digitraffic.fi/api/v1/trains/${this.date}/${this.trainNumber}`
                );
                res = await res.json();

                if (res.length !== 1) throw new Error('Train not found');

                [this.train] = res;
                console.log(this.train);

                this.consolidateTimetable();
            } catch (e) {
                this.error = e.message;
            }

            this.loading = false;
        },
        async fetchMetadata() {
            const [stations, operators] = await Promise.all([
                fetch('https://rata.digitraffic.fi/api/v1/metadata/stations'),
                fetch('https://rata.digitraffic.fi/api/v1/metadata/operators'),
            ]);

            this.stations = await stations.json();
            this.operators = await operators.json();
        },
        consolidateTimetable() {
            const rows = this.train.timeTableRows;
            const timetable = [];

            for (let i = 0; i < rows.length; i++) {
                // push the first timetable row separately
                if (i === 0) {
                    timetable.unshift({
                        stationShortCode: rows[i].stationShortCode,
                        stationName: this.stations.find(
                            (o) => o.stationShortCode === rows[i].stationShortCode
                        ).stationName,
                        departure: rows[i],
                        commercialStop: rows[i].commercialStop,
                        commercialTrack: rows[i].commercialTrack,
                        trainStopping: rows[i].trainStopping,
                    });
                    continue;
                }

                // push the last timetable row separately
                if (i === rows.length - 1) {
                    timetable.push({
                        stationShortCode: rows[i].stationShortCode,
                        stationName: this.stations.find(
                            (o) => o.stationShortCode === rows[i].stationShortCode
                        ).stationName,
                        arrival: rows[i],
                        commercialStop: rows[i].commercialStop,
                        commercialTrack: rows[i].commercialTrack,
                        trainStopping: rows[i].trainStopping,
                    });
                    continue;
                }

                // skip departure rows, as they're combined with arrivals
                if (rows[i].type === 'DEPARTURE') continue;

                // push the arrival and departure rows mixed with essential data about the row
                timetable.push({
                    stationShortCode: rows[i].stationShortCode,
                    stationName: this.stations.find(
                        (o) => o.stationShortCode === rows[i].stationShortCode
                    ).stationName,
                    arrival: rows[i],
                    departure: rows[i + 1],
                    commercialStop: rows[i].commercialStop,
                    commercialTrack: rows[i].commercialTrack,
                    trainStopping: rows[i].trainStopping,
                });
            }

            this.train.consolidatedTimetable = timetable;
        },
        differenceColorClass(diff) {
            if (diff >= 15) return 'bg-red-500';
            if (diff >= 5) return 'bg-yellow-500';
            if (diff >= 0) return 'bg-green-500';
            return 'bg-green-700';
        },
    },
    computed: {
        filteredTimetable() {
            return this.showPassing
                ? this.train.consolidatedTimetable
                : this.train.consolidatedTimetable.filter(
                    (o) =>
                        o.trainStopping ||
                          o.arrival.causes.length > 0 ||
                          o.departure.causes.length > 0
                );
        },
        causes() {
            const causes = [];
            this.train.timeTableRows.forEach((t) => {
                t.causes.forEach((c) => {
                    const cause = {
                        // eslint-disable-next-line no-nested-ternary
                        displayCategoryCode: c.thirdCategoryCode
                            ? c.thirdCategoryCode
                            : c.detailedCategoryCode
                                ? c.detailedCategoryCode
                                : c.categoryCode,
                        // eslint-disable-next-line no-nested-ternary
                        displayCategoryCodeId: c.thirdCategoryCodeId
                            ? c.thirdCategoryCodeId
                            : c.detailedCategoryCodeId
                                ? c.detailedCategoryCodeId
                                : c.categoryCodeId,
                        thirdCategory: this.thirdCauses?.find(
                            (o) => o.id === c.thirdCategoryCodeId?.toString()
                        ),
                        detailedCategory: this.detailedCauses?.find(
                            (o) => o.id === c.detailedCategoryCodeId?.toString()
                        ),
                        category: this.causeCategories.find(
                            (o) => o.id === c.categoryCodeId.toString()
                        ),
                    };

                    if (causes.find((o) => o.displayCategoryCodeId === cause.displayCategoryCodeId))
                        return;

                    causes.push(cause);
                });
            });
            return causes;
        },
    },
    created() {
        this.fetchData();
    },
    watch: {
        $route: 'fetchData',
    },
};
</script>

<style scoped>
tr.striped:nth-child(even) {
    @apply bg-gray-100;
}
</style>
