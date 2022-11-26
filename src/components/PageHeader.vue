<script setup lang="ts">
const props = defineProps<{
  pageTitle: string
}>();
</script>

<template>
<header class="px-4 py-6 font-bold text-gray-800 text-4xl md:px-6">
    <h1>{{ props.pageTitle }}</h1>
  </header>
</template>