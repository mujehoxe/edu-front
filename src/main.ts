import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.postcss';
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = '/v1';

const head = createHead();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(head);

app.mount('#app');
