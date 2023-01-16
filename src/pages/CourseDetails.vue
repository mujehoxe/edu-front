<script lang="ts">
import Course from '@/entities/Course';

import axios from 'axios';
import router from '../router';
import { PlusIcon } from '@heroicons/vue/24/outline';

export default {
  components: { PlusIcon },
  props: {
    courseId: { type: String, default: null },
  },
  data() {
    return {
      course: null as unknown as Course,
      loaded: false,
    };
  },
  async created() {
    try{
      const res = await axios.get<Course>(`/courses/${this.courseId}`);
      this.course = res.data;
    }
    finally{
      this.loaded = true;
    }
  },
  methods: {
    addTopic() {
      return 1;
    },
    goTopic(topicId: string) {
      router.push({
        name: 'Topic Details',
        params: {
          topicId: topicId,
          courseId: this.course.id,
        }
      });
    }
  }
};
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div v-if="!loaded">
    <PageHeader page-title="Loding..." />
  </div>
  <div v-else-if="!course">
    <PageHeader page-title="Loding Failed" />
  </div>
  <div v-else>
    <PageHeader :page-title="course.title" />
    <div class="p-4 mx-auto md:px-6 sm:rounded-md">
      <div class="col-span-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Topics Covered</h3>
      </div>

      <ol role="list" class="list-decimal py-2 list-inside sm:rounded-md">
        <li
          v-for="topic in course?.topics" :key="topic.id"
          class="bg-white text-gray-900 shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md hover:bg-indigo-700 hover:text-white"
          @click="()=>goTopic(topic.id)">
          <span class="ml-2">{{ topic.title }}</span>
        </li>
        <li
          class="list-none bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md hover:bg-indigo-700 hover:text-white"
          @click="addTopic">
          <PlusIcon class="inline -ml-1 h-5 w-5 text-gray-400" />
          <span class="ml-2">New Topic</span>
        </li>
      </ol>
    </div>
  </div>
</template>