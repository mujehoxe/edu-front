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

const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined;
const thisYear = new Date().getFullYear();
</script>

<template>
  <div class="bg-gray-100 relative py-8">
      <CoursesPage />
      <!-- <CourseForm class="container relative max-w-2xl mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"/> -->
      <footer class="py-6 text-sm text-center text-gray-700">
        <p>
          Vite-ts-tailwind-starter by
          <a class="underline" href="https://twitter.com/uninen">@Uninen</a> &copy; 2020-{{
            thisYear
          }}.
          <template v-if="BUILD_DATE"> Site built {{ BUILD_DATE.toLocaleDateString() }}. </template>
          <template v-else> Development mode. </template>
        </p>
      </footer>
  </div>
</template>
