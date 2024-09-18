import EvenementDetail from '@/components/touristes/EvenementDetail.vue';
import EvenementTourist from '@/components/touristes/EvenementTourist.vue';
import SiteComponent from '@/components/touristes/SiteComponent.vue';
import SiteDetail from '@/components/touristes/SiteDetail.vue';
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
  },
  {
    path: '/evenements',
    name: 'evenements',
    component: EvenementTourist
  },
  {
    path: '/evenement/:id',
    name: 'evenementdetails',
    component: EvenementDetail,
    props: true
  },
  {
    path: '/sites',
    name: 'sites',
    component: SiteComponent
  },
  {
    path: '/site/:id',
    name: 'sitedetails',
    component: SiteDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
