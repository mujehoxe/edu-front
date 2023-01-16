<script setup lang="ts">
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined;
const thisYear = new Date().getFullYear();
</script>

<template>
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
</template>