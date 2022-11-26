<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    emphasis: {
      type: String,
      required: true,
      validator: (prop: string) => [
        'primary',
        'secondary',
        'white',
        'danger',
      ].includes(prop),
    },
    title: {
      type: String,
      required: true
    },
  },
  emits: ['onClick'],
  methods: {
    click() {
      this.$emit('onClick');
    }
  }
});
</script>


<template>
  <button 
    type='button' 
    class='inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    :class='[
      emphasis == "primary" ? "border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700" : "",
      emphasis === "secondary" ? "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200" : "",
      emphasis === "danger" ? "border-transparent text-red-700 bg-red-100 hover:bg-indigo-200" : "",
      emphasis === "white" ? "border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50" : "",
    ]'
    @click="click">{{ title }}</button>
</template>