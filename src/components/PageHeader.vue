<script setup lang="ts">
const props = defineProps<{
  pageTitle: string
}>()
</script>

<template>
  <header class="px-4 pt-6 prose prose-sm md:px-6 md:prose-base">
    <h1>{{ props.pageTitle }}</h1>
  </header>
</template>