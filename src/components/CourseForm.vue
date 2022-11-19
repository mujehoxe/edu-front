<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import { XMarkIcon, PhotoIcon } from '@heroicons/vue/24/outline';


export default defineComponent({
    components: { ButtonComponent, XMarkIcon, PhotoIcon },
    emits: ["submit"],
    data() {
        return {
            title: "",
            description: "",
            category: "",
            level: "",
            speciality: "",
            file: new File([], ""),
        };
    },
    methods: {
        onFileChange(e: Event) {
            const files = (e.target as HTMLInputElement).files ||
                (e as DragEvent).dataTransfer?.files;
            if (!files?.length)
                return;
            this.file = files[0];
        },
        onClearFile() {
            this.file = new File([], "");
            (document.getElementById("file") as HTMLInputElement).value = "";
        },
        async onSubmit() {
            const data = { 
              title: this.title,
              description: this.description,
              category: this.category,
              level: this.level,
              speciality: this.speciality,
              ...(this.file.name && {file: this.file})
            };
            console.log(this.file);
            const res = await axios.post("v1/courses", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
        }
    }
})
</script>

<template>
  <form class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div>
      
        <div class="col-span-full">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Course Information</h3>
        </div>
        
        <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="title" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Title
              <span class="text-red-600">*</span>
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input id="title" v-model="title" name="title" type="text" autocomplete="on" class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          
          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="description" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Description </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <textarea id="description" v-model="description" name="description" rows="3" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
              <p class="mt-2 text-sm text-gray-500">Write few sentences about this course.</p>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="category" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Category </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input id="category" v-model="category" name="category" type="text" autocomplete="on" class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          
          <div class="sm:grid grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="level" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Level </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <select id="level" v-model="level" name="level" autocomplete="on" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>

          <div class="sm:grid grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="speciality" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Speciality </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <select id="speciality" v-model="speciality" name="speciality" autocomplete="on" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                <option>Experimental Sciences</option>
                <option>Math</option>
                <option>Common trunk</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          
          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="thumbnail" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Thumbnail </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <PhotoIcon class="mx-auto h-12 w-12 text-gray-400"/>
                  <div class="flex items-center text-sm text-gray-600">
                    <label for="file" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file" name="file" type="file" class="sr-only" @change="onFileChange($event)" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <div v-if="file.name" class="flex items-center justify-center text-xs text-gray-500">
                    {{ file.name }}
                    <button @click="onClearFile">
                      <XMarkIcon class="stroke-2 h-4 w-4 text-indigo-600" />
                    </button>
                  </div>
                  <div v-else class="text-xs text-gray-500"> No file chosen </div>
                  <p class="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <ButtonComponent emphasis="white" title="Cancel" />
        <ButtonComponent emphasis="primary" extra-classes="ml-3" title="Submit" @on-click="onSubmit" />
      </div>
    </div>
  </form>
</template>
