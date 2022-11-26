<script lang="ts">
import { defineComponent } from 'vue';

import {
  TransitionRoot,
  TransitionChild,
  Dialog as DialogModal,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

export default defineComponent({
  components: { DialogModal, DialogPanel, DialogTitle, TransitionChild, TransitionRoot },
  props: {
    message: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    }
  }
});
</script>


<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <DialogModal as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </DialogTitle>
              <div class="my-3">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </div>

              <slot>
                <ButtonComponent emphasis="secondary" title="Got it" @click="closeModal"/>
              </slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </DialogModal>
  </TransitionRoot>
</template>
