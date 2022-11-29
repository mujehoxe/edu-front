<script lang="ts">
import router from '../router';
import Course from '@/entities/Course';
import { getThumbnailSource } from '@/entities/Thumbnail';


export default {
  props: {
    course: {
      type: Object as unknown as typeof Course,
      required: true,
    }
  },
  methods: {
    goToCourseUpdate() {
      router.push({
        name: 'Update Course',
        params: {
          id: this.course.id,
        }
      });
    },
    getThumbnailSource() {
      return getThumbnailSource(this.course.thumbnail);
    }
  }
};
</script>


<template>
  <div class="mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl" @click="goToCourseUpdate">
    <img :src="getThumbnailSource()" alt="plant" class="h-44 w-full object-cover" />
    <div class="p-5">
      <div class="font-bold text-gray-800 text-xl mb-2">{{ course.title }}</div>
      <p class="text-medium mb-5 text-gray-700 line-clamp-4">
        {{ course.description }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span v-if="course.category" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        #{{ course.category }}
      </span>
    </div>
  </div>
</template>
