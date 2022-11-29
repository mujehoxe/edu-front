<script setup lang="ts">
import Thumbnail, { getThumbnailSource } from '@/entities/Thumbnail';
import { WatchStopHandle } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const img = ref<HTMLImageElement | null>(null);
let unwatchFile: WatchStopHandle;
let unwatchTitle: WatchStopHandle;
let randomFilename = 'lksdgvuihn2389yu982h3ibiuihdsy789324';

const props = defineProps<{
  thumbnail?: Thumbnail,
  title?: string,
  file: File,
}>();

const emit = defineEmits<{
  (e: 'imgGenerated', file: File): void
}>();

onMounted(() => {
  if (props.thumbnail)
    img.value.src = getSource();

  unwatchTitle = watch(
    () => props.title,
    async (_O, _N) => {
      if(!props.file.name || props.file.name === randomFilename){
        const imgBlob = await generateImgBlob();
        setBlobToImg(imgBlob);
        emit('imgGenerated', new File([imgBlob], randomFilename, { type: 'image/png' }));
      }
    }
  );
  
  unwatchFile = watch(
    () => props.file,
    (_O, _N) => {
      let fr = new FileReader();
      fr.onload = function () {
        img.value.src = fr.result;
      };
      fr.readAsDataURL(props.file);
    }
  );
  
});

onUnmounted(() => {
  if(unwatchFile)
    unwatchFile();
  if(unwatchTitle)
    unwatchTitle();
});

function generateGradient(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(-100, canvas.value?.height/2, canvas.value?.width + 100, canvas.value?.height/2);
  gradient.addColorStop(0, 'green');
  gradient.addColorStop(1, 'cyan');
  return gradient;
}

async function generateImgBlob(): Promise<Blob> {
  const ctx = canvas.value?.getContext('2d');
  ctx.fillStyle = generateGradient(ctx);
  ctx.fillRect(0, 0, canvas.value?.width, canvas.value?.height);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 5rem Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(props.title, canvas.value?.width / 2, canvas.value?.height / 2);
  return new Promise((resolve) => { canvas.value?.toBlob(resolve); });
}

function getSource() {
  return getThumbnailSource(props.thumbnail);
}

function setBlobToImg(thumbnailBlob: Blob) {
  const url = URL.createObjectURL(thumbnailBlob);
  img.value.onload = () => {
    URL.revokeObjectURL(url);
  };
  img.value.src = url;
}
</script>

<template>
  <canvas ref="canvas" class="hidden" width="1000" height="1000"></canvas>
  <img v-if="title || thumbnail || file.name" ref="img" class="object-cover w-full h-52" />
</template>