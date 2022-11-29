<script lang="ts">
import PageHeader from '../components/PageHeader.vue';
import axios from 'axios';
import router from '../router';
import Course from '@/entities/Course';

export default {
  components: { PageHeader },
  data() {
    return {
      courses: Array<Course>(),
    };
  },
  async mounted() {
    const res = await axios.get('/courses');
    for(const course of res.data)
      this.courses.push(course);
  },
  methods: {
    onCreatePress() {
      router.push({ name: 'Create Course' });
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-between">
    <PageHeader page-title="Courses" />
    <ButtonComponent emphasis="primary" title="Create" class="mx-4 h-min" @on-click="onCreatePress"/>
  </div>
  <main class="m-5">
    <ul role="list" class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
      <li v-for="course in courses" :key="course.id" class="items-center relative w-full">
        <CourseCard :course="course" />
      </li>
    </ul>
  </main>
</template>
