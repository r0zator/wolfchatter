import Vue from 'vue';
import VueRouter from 'vue-router';
import Map from '../views/Map';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Wolfchatter',
        component: Map,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
