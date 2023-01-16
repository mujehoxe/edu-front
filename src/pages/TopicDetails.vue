<script lang="ts">
import AttachmentsComponent from '@/components/AttachmentsComponent.vue';
import Topic from '@/entities/Topic';
import axios from 'axios';

export default {
  components: { AttachmentsComponent },
  props: {
    topicId: { type: String, default: null },
  },
  data() {
    return {
      topic: null as unknown as Topic,
      loaded: false,
    };
  },
  async created() {
    try {
      const res = await axios.get<Topic>(`/topics/${this.topicId}/`);
      this.topic = res.data;
    }
    finally {
      this.loaded = true;
    }
  },
  methods: {
    deleteAttachment(attachmentId: number){
      this.topic.attachments = this.topic.attachments?.filter(a => a.id !== attachmentId);
    },
    async onAttachmentSelected(e: Event) {
      const files = (e.target as HTMLInputElement).files ||
                (e as DragEvent).dataTransfer?.files;
      if (!files?.length)
        return;
      
      const res = await axios.post<Topic>(`/topics/${this.topic.id}/link-attachment`, 
        {file: files[0]}, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if(res.status === 200 || res.status === 201) {
        console.log(res.data);
        this.topic.attachments = res.data.attachments;
      }
    }
  }
};
</script>

<template>
  <div class="flex">
    <div class="w-full min-h-screen">
      <div v-if="!loaded">
        <PageHeader page-title="Loding..." />
      </div>
      <div v-else-if="!topic">
        <PageHeader page-title="Loding Failed" />
      </div>
      <div v-else>
        <span v-for='i in Array.from({ length: 10 }, (_, i) => i + 1)' :key="i">dsfsd<br></span>
      </div>
    </div>
    <div class="bg-gray-400 hidden md:block min-w-fit w-1/4 h-screen text-center">
      <label class="mt-2 inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700" for="actual-btn">
        <span>New attachment</span>
        <input id="actual-btn" name="file" type="file" hidden @change="onAttachmentSelected($event)" />
      </label>
      <div v-if="loaded">
        <AttachmentsComponent :topic="topic" @delete-attachment="deleteAttachment" />
      </div>
    </div>
  </div>
</template>
