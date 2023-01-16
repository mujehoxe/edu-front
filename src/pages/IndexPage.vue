<script setup lang="ts">
import CoursesPage from './CoursesPage.vue';
// useRoute, useHead, and HelloWorld are automatically imported. See vite.config.ts for details.
const route = useRoute();

useHead({
  bodyAttrs: {
    title: route.meta.title,
  },
  meta: [
    {
      property: 'og:title',
      content: route.meta.title,
    },
    {
      name: 'twitter:title',
      content: route.meta.title,
    },
  ],
});
</script>

<template>
  <div class="bg-gray-100 relative py-8">
      <CoursesPage />
      <!-- <CourseForm class="container relative max-w-2xl mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"/> -->
      <PageFooter />
  </div>
</template>
