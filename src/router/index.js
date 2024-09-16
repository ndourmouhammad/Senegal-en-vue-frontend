import ConnexionComponent from '@/components/visiteurs/ConnexionComponent.vue';
import HomeComponent from '@/components/visiteurs/HomeComponent.vue';
import InscriptionComponent from '@/components/visiteurs/InscriptionComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: ConnexionComponent
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: InscriptionComponent
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
