<script lang="ts">
import axios, { AxiosError, AxiosResponse } from 'axios';
import { defineComponent } from 'vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import { XMarkIcon, PhotoIcon } from '@heroicons/vue/24/outline';
import DialogModal from '../components/DialogModal.vue';

import router from '../router';
import Course from '@/entities/Course';


class DialogInfromation{
  title = '';
  message = '';
  onFail(message: string) {
    this.title = 'Fail';
    this.message = message;
  }
  onSuccess(message: string) {
    this.title = 'Success';
    this.message = message;
  }
}

export default defineComponent({
  components: { ButtonComponent, XMarkIcon, PhotoIcon, DialogModal },
  props: {
    id: { type: String, default: null }
  },
  emits: ['submit'],
  data() {
    return {
      course: new Course(),
      file: new File([], ''),
      dialogInfromation: new DialogInfromation(),
    };
  },
  async mounted() {
    if(this.isUpdate()) {
      const res = await axios.get('/courses/' + this.id);
      this.course = res.data;
    }
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
      this.file = new File([], '');
      (document.getElementById('file') as HTMLInputElement).value = '';
    },
    createCourseReq(data : Record<string, unknown>) {
      return axios.post('/courses', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    deleteCourseReq() {
      return axios.delete('/courses/' + this.id);
    },
    updateCourseReq(data : Record<string, unknown>) {
      return axios.patch('/courses/' + this.id, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    },
	  handleResErrors(err: unknown) {
      if (!(err instanceof AxiosError)) {
        throw err;
      }
      if (err.response?.status === 408) {
        this.dialogInfromation.onFail(`Course titled "${this.course.title}" already exists.`);
      } else {
        this.dialogInfromation.onFail(err.response?.data.message);
      }
    },
    onDelete() {   
      this.getModalInstance('dialogDeleteModal').openModal();
    },
    async onDeleteConfirmed() {
      let res = await this.deleteCourseReq();
      if(res.status === 200) {
        this.getModalInstance('dialogDeleteModal').closeModal();
        this.goHome();
      }
    },
    getModalInstance(modalName: string) {
      return this.$refs[`${modalName}`] as typeof DialogModal;
    },
    async onUpdate() {
      await this.onSubmit(
        this.updateCourseReq,
		    `Course "${this.course.title}" updated successfully.`);
    },
	  async onCreate() {
		  this.checkTitle();
		  await this.onSubmit(
				  this.createCourseReq,
				  `Course "${this.course.title}" created successfully.`);
	  },
	  async onSubmit(
      operation: (data: Record<string, unknown>) => Promise<AxiosResponse<any, any>>,
	      message: string) {
		  const data = this.wrapData();
		  await this.sendReqAndHandleRes(
        operation,
        data,
        message);
	  },
    async sendReqAndHandleRes(
      operation: (data: Record<string, unknown>) => Promise<AxiosResponse<any, any>>,
      data: Record<string, unknown>,
      message: string){
      try {
        let res;
        res = await operation(data);
        if(res.status === 201 || res.status === 200)
          this.dialogInfromation.onSuccess(message);
      } catch(err: unknown) {
	      this.handleResErrors(err);
      } finally {
        this.getModalInstance('dialogModal').openModal();
      }
    },
    checkTitle() {
      if (this.course.title !== '')
        this.dialogInfromation.onFail('Please provide a title.');
    },
    wrapData(){
      return {
        title: this.course.title,
        description: this.course.description,
        category: this.course.category,
        level: this.course.level,
        speciality: this.course.speciality,
        ...(this.file.name && {file: this.file})
      };
    },
    goHome() {
      router.push({ name: 'Home' });
    },
    createMore() {
      this.reinitComponent();
      this.getModalInstance('dialogModal').closeModal();
    },
    reinitComponent(){
      this.course = new Course();
      this.file = new File([], '');
      this.dialogInfromation = new DialogInfromation();
    },
    thumbnailGenerated(file: File){
      this.file = file;
      console.log(this.file);
    },
    isUpdate():boolean { return this.id ? true : false; }
  }
});
</script>

<template>

  <PageHeader v-if="isUpdate()" page-title="Update course" />
  <PageHeader v-else page-title="Create new course" />
  
  <div class="p-4 mx-auto md:px-6 sm:rounded-md">
    <main>
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
                  <input id="title" v-model="course.title" name="title" type="text" autocomplete="on" class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="description" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Description </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea id="description" v-model="course.description" name="description" rows="3" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
                  <p class="mt-2 text-sm text-gray-500">Write few sentences about this course.</p>
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="category" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Category </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input id="category" v-model="course.category" name="category" type="text" autocomplete="on" class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              
              <div class="sm:grid grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="level" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Level </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <select id="level" v-model="course.level" name="level" autocomplete="on" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>

              <div class="sm:grid grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="speciality" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Speciality </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <select id="speciality" v-model="course.speciality" name="speciality" autocomplete="on" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
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
                      <div class="flex items-center justify-center text-sm text-gray-600">
                        <label for="file" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input id="file" name="file" type="file" class="sr-only" @change="onFileChange($event)" />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <div v-if="course?.thumbnail" class="flex items-center justify-center text-xs text-gray-500">
                        {{ course.thumbnail.originalname }} linked as thumbnail
                      </div>
                      <div v-else class="flex items-center justify-center text-xs text-gray-500">No thumbnail linked</div>
                      <div v-if="file.name" class="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 font-medium bg-indigo-100 text-indigo-700 justify-center text-xs">
                        {{ file.name }}
                        <button class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white" @click="onClearFile">
                          <XMarkIcon class="stroke-2 h-4 w-4 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 8 8" />
                        </button>
                      </div>
                      <div v-else class="text-xs text-gray-500"> No file chosen </div>
                      <p class="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                    </div>
                  </div>
                  <div class="mt-2 mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                    <PreviewImg v-if="course?.thumbnail" :thumbnail='course.thumbnail' :file='file' @img-generated='thumbnailGenerated($event)' />
                    <PreviewImg v-else :title='course.title' :file='file' @img-generated='thumbnailGenerated($event)' />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <ButtonComponent emphasis="white" title="Cancel" @on-click="goHome" />
            <ButtonComponent v-if="!isUpdate()" emphasis="primary" class="ml-3" title="Create" @on-click="onCreate" />
            <ButtonComponent v-if="isUpdate()" emphasis="danger" class="ml-3" title="Delete" @on-click="onDelete" />
            <ButtonComponent v-if="isUpdate()" emphasis="primary" class="ml-3" title="Update" @on-click="onUpdate" />
          </div>
        </div>
      </form>
      <DialogModal ref="dialogModal" :title="dialogInfromation.title" :message="dialogInfromation.message">
        <div v-if="dialogInfromation.title === 'Success'" class="flex">
          <ButtonComponent emphasis="white" title="Go home" @click="[getModalInstance(`dialogModal`).closeModal(), goHome()]" />
          <ButtonComponent v-if="!isUpdate()" emphasis="primary" class="ml-3" title="Create More" @click="createMore" />
        </div>
      </DialogModal>
      <DialogModal ref="dialogDeleteModal" title="Confirm" :message='"Are you sure you want to delete \"" + course.title + "\""'>
        <ButtonComponent v-if="isUpdate()" emphasis="danger" title="Delete" @on-click="onDeleteConfirmed" />
      </DialogModal>
    </main>
  </div>
</template>
