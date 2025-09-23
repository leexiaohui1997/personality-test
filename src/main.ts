import 'font-awesome/css/font-awesome.min.css';
import './helper/device';
import './assets/styles/base.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
