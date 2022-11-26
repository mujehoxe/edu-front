import { createRouter, createWebHistory } from 'vue-router';

import IndexPage from '@/pages/IndexPage.vue';
import CourseForm from './pages/CourseForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexPage,
    meta: {
      title: 'Edu',
    },
  },
  {
    path: '/courses/create',
    name: 'Create Course',
    component: CourseForm,
  },
  {
    path: '/courses/:id',
    name: 'Update Course',
    component: CourseForm,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
