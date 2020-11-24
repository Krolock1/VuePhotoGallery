import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/search',
    },
    {
        path: '/tabs/',
        component: Tabs,
        children: [
            {
                path: '',
                redirect: 'search',
            },
            {
                path: 'search',
                component: () => import('@/views/TabSearch.vue'),
            },
            {
                path: 'list',
                component: () => import('@/views/TabList.vue'),
            },
            {
                path: 'photos',
                component: () => import('@/views/TabPhotos.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
