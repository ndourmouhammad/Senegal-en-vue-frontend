import AbonnementComponent from '@/components/guides/AbonnementComponent.vue';
import AbonnementDetail from '@/components/guides/AbonnementDetail.vue';
import DashboardComponent from '@/components/guides/DashboardComponent.vue';
import FormComponent from '@/components/guides/FormComponent.vue';
import ModificationProfil from '@/components/guides/ModificationProfil.vue';
import ProfilGuide from '@/components/guides/ProfilGuide.vue';
import SiteDetailGuide from '@/components/guides/SiteDetailGuide.vue';
import SiteGuide from '@/components/guides/SiteGuide.vue';
import BlogComponent from '@/components/touristes/BlogComponent.vue';
import DetailBlog from '@/components/touristes/DetailBlog.vue';
import EvenementDetail from '@/components/touristes/EvenementDetail.vue';
import EvenementTourist from '@/components/touristes/EvenementTourist.vue';
import GuideComponent from '@/components/touristes/GuideComponent.vue';
import GuideDetail from '@/components/touristes/GuideDetail.vue';
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
  },
  {
    path: '/guides',
    name: 'guides',
    component: GuideComponent
  },
  {
    path: '/guide/:id',
    name: 'guidedetails',
    component: GuideDetail,
    props: true
  },
  {
    path:'/blog',
    name:'blog',
    component: BlogComponent
  },
  {
    path: '/article/:id',
    name: 'article',
    component: DetailBlog,
    props: true
  },

  // Guides
  {
    path: '/dashboard-guide',
    name: 'dashboard-guide',
    component: DashboardComponent
  },
  {
    path: '/sites-guide',
    name: 'sites-guide',
    component: SiteGuide
  },
  {
    path: '/sites-guide/:id',
    name: 'sites-guide-details',
    component: SiteDetailGuide,
    props: true
  },
  {
    path: '/form',
    name: 'form',
    component: FormComponent
  },
  {
    path: '/abonnements',
    name: 'abonnements',
    component: AbonnementComponent
  },
  {
    path:'/abonnement/',
    name:'abonnement',
    component: AbonnementDetail,
    // props: true
  },
  {
    path:'/profil-guide',
    name: 'profil-guide',
    component: ProfilGuide
  },
  {
    path:'/modification-guide',
    name: 'modification-guide',
    component: ModificationProfil
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
