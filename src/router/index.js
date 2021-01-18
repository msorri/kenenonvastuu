import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/:date/:trainNumber',
        name: 'Train',
        component: () => import(/* webpackChunkName: "train" */ '../views/Train.vue'),
    },
    {
        path: '/causes',
        name: 'Causes',
        component: () => import(/* webpackChunkName: "causes" */ '../views/Causes.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
