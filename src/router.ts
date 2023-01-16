import { createRouter, createWebHistory } from 'vue-router';

import IndexPage from '@/pages/IndexPage.vue';
import CourseForm from './pages/CourseForm.vue';
import CourseDetails from './pages/CourseDetails.vue';

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
    path: '/course/create',
    name: 'Create Course',
    component: CourseForm,
  },
  {
    path: '/course/:id/update',
    name: 'Update Course',
    component: CourseForm,
    props: true
  },
  {
    path: '/course/:courseId',
    name: 'Course Details',
    component: CourseDetails,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
