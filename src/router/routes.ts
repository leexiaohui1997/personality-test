import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/StartPage.vue'),
  },
  {
    path: '/index',
    component: () => import('@/views/IndexPage.vue'),
  },
  {
    path: '/result',
    component: () => import('@/views/ResultPage.vue'),
  },
];

export default routes;
