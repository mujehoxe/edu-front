<script lang="ts">
import prettyBytes from '../pretty-bytes';

import Attachment, { getPath } from '@/entities/Attachment';
import Topic from '@/entities/Topic';
import { LinkIcon, TrashIcon, DocumentIcon } from '@heroicons/vue/24/outline';
import axios from 'axios';

export default {
  components: { LinkIcon, TrashIcon, DocumentIcon },
  props: {
    topic: { type: Topic, default: [] }
  },
  emits: ['deleteAttachment'],
  methods: {
    prettyBytes,
    copyLink(attachment: Attachment){
      navigator.clipboard.writeText(getPath(attachment));
    },
    async deleteAttachment(attachment: Attachment) {
      const res = await axios.delete(
        `/topics/${this.topic.id}/unlink-attachment/${attachment.id}`);

      if(res.status === 200) {
        this.$emit('deleteAttachment', attachment.id);
      }
    }
  }
};
</script>

<template>
  <ul role="list" class="divide-y divide-gray-200">
    <li v-for="attachment in topic.attachments" :key="attachment.id" class="flex p-4 m-2 rounded-md bg-white">
      <DocumentIcon class="h-8 w-8 m-auto rounded-full"/>
      <div class="ml-3">
        <p class="text-left text-sm w-40 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900">
          {{ attachment.file.originalname }}
        </p>
        <p class="text-left text-sm text-gray-500">
          {{ prettyBytes(attachment.file.size, null) }}
        </p>
      </div>
      <div class="flex ml-auto my-auto">
        <button>
          <LinkIcon 
            class="h-7 w-7 p-1 rounded-full text-indigo-700 bg-indigo-50 hover:bg-indigo-200 active:bg-indigo-300"
            @click="()=>{copyLink(attachment)}" />
        </button>
        <button>
          <TrashIcon
            class="h-7 w-7 p-1 rounded-full ml-1 text-red-500 bg-red-50 hover:bg-red-200 active:bg-red-300" 
            @click="()=>{deleteAttachment(attachment)}" />
        </button>
      </div>
    </li>
  </ul>
</template>
