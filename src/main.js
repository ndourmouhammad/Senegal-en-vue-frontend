import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importation de BootstrapVue et ses composants
import { BootstrapVue3 } from 'bootstrap-vue-3'; // BootstrapVue3 pour Vue.js 3
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'; // CSS de BootstrapVue3

const app = createApp(App);

app.use(router);

// Utilisation de BootstrapVue3
app.use(BootstrapVue3);

app.mount('#app');
