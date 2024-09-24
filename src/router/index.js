import AcccesUsers from '@/components/admin/AcccesUsers.vue';
import AccesIdentiite from '@/components/admin/AccesIdentiite.vue';
import AccesPermissions from '@/components/admin/AccesPermissions.vue';
import AccesRoles from '@/components/admin/AccesRoles.vue';
import DashboardAdmin from '@/components/admin/DashboardAdmin.vue';
import ProfilAdmin from '@/components/admin/ProfilAdmin.vue';
import UserDetails from '@/components/admin/UserDetails.vue';
import AbonnementComponent from '@/components/guides/AbonnementComponent.vue';
import AbonnementDetail from '@/components/guides/AbonnementDetail.vue';
import DashboardComponent from '@/components/guides/DashboardComponent.vue';
import FormComponent from '@/components/guides/FormComponent.vue';
import ModificationProfil from '@/components/guides/ModificationProfil.vue';
import ModficationProfilAdmin from '@/components/admin/ModficationProfilAdmin.vue';
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
import EvenementAdmin from '@/components/admin/EvenementAdmin.vue';
import FormEvenement from '@/components/admin/FormEvenement.vue';
import EvenementDetailAdmin from '@/components/admin/EvenementDetailAdmin.vue';
import BlogAdmin from '@/components/admin/BlogAdmin.vue';
import BlogDetailAdmin from '@/components/admin/BlogDetailAdmin.vue';
import EditComponent from '@/components/guides/EditComponent.vue';
import EditEvenement from '@/components/admin/EditEvenement.vue';
import AjoutArticle from '@/components/admin/AjoutArticle.vue';
import ModificationArticle from '@/components/admin/ModificationArticle.vue';
import ProfileComponent from '@/components/touristes/ProfileComponent.vue';
import ModificationTourist from '@/components/touristes/ModificationTourist.vue';
import authGuard from '@/guards/authGuard'; // Remove the curly braces
import adminGuard from '@/guards/adminGuard'; // Use curly braces for named export
import guideGuard from '@/guards/guideGuard';
import NotFoundComponent from '@/components/communs/NotFoundComponent.vue';



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
    path: '/profil-touriste',
    name: 'profil-touriste',
    component: ProfileComponent,
    beforeEnter: authGuard
  },
  {
    path:'/modification-touriste',
    name: 'modification-touriste',
    component: ModificationTourist,
    beforeEnter: authGuard
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
    component: DashboardComponent,
    beforeEnter: guideGuard
  },
  {
    path: '/sites-guide',
    name: 'sites-guide',
    component: SiteGuide,
    beforeEnter: guideGuard
  },
  {
    path: '/sites-guide/:id',
    name: 'sites-guide-details',
    component: SiteDetailGuide,
    props: true,
    beforeEnter: guideGuard
  },
  {
    path: '/form',
    name: 'form',
    component: FormComponent,
    beforeEnter: guideGuard
  },
  {
    path: '/abonnements',
    name: 'abonnements',
    component: AbonnementComponent,
    beforeEnter: guideGuard
  },
  {
    path:'/abonnement/:id',
    name:'abonnements-details',
    component: AbonnementDetail,
    props: true,
    beforeEnter: guideGuard
  },
  {
    path:'/profil-guide',
    name: 'profil-guide',
    component: ProfilGuide,
    beforeEnter: guideGuard
  },
  {
    path:'/modification-guide',
    name: 'modification-guide',
    component: ModificationProfil,
    beforeEnter: guideGuard
  },
  {
    path: '/sites/edit/:id',
    name: 'edit',
    component: EditComponent, 
    beforeEnter: guideGuard
  },

  // Admin
  {
    path: '/dashboard-admin',
    name: 'dashboard-admin',
    component: DashboardAdmin,
    beforeEnter: adminGuard
  },
  {
    path:'/acces-et-identite',
    name:'acces-et-identite',
    component: AccesIdentiite,
    beforeEnter: adminGuard
  },
  {
    path: '/acces-users',
    name: 'acces-users',
    component: AcccesUsers,
    beforeEnter: adminGuard
  },
  {
    path: '/access-users-details/:id',
    name: 'access-users-details',
    component: UserDetails, // Ensure that UserDetails is properly imported
    props: true,
    beforeEnter: adminGuard
  },
  {
    path: '/acces-roles',
    name: 'acces-roles',
    component: AccesRoles,
    beforeEnter: adminGuard
  },
  {
    path: '/acces-permissions',
    name: 'acces-permissions',
    component: AccesPermissions,
    beforeEnter: adminGuard
  },
  {
    path:'/profil-admin',
    name: 'profil-admin',
    component: ProfilAdmin,
    beforeEnter: adminGuard
  },
  {
    path:'/modification-admin',
    name: 'modification-admin',
    component: ModficationProfilAdmin,
    beforeEnter: adminGuard
  },
  ,
  {
    path: '/evenements-admin',
    name: 'evenements-admin',
    component: EvenementAdmin,
    beforeEnter: adminGuard
  },
  {
    path: '/evenement-admin/:id',
    name: 'evenementdetails-admin',
    component: EvenementDetailAdmin,
    props: true,
    beforeEnter: adminGuard
  },
  {
    path: '/form-evenement',
    name: 'form-evenement',
    component: FormEvenement,
    beforeEnter: adminGuard
  },
  {
    path: '/evenements-admin/edit/:id',
    name: 'edit-events',
    component: EditEvenement,
    beforeEnter: adminGuard
  },
  {
    path:'/blog-admin',
    name:'blog-admin',
    component: BlogAdmin,
    beforeEnter: adminGuard
  },
  {
    path: '/article-admin/:id',
    name: 'article-admin',
    component: BlogDetailAdmin,
    props: true,
    beforeEnter: adminGuard
  },
  {
    path: '/article-add',
    name: 'article-add',
    component: AjoutArticle,
    beforeEnter: adminGuard
  },
  {
    path: '/article-admin/edit/:id',
    name: 'edit-article',
    component: ModificationArticle,
    beforeEnter: adminGuard
  },
  {
    path: '/:pathMatch(.*)*', // Capture toutes les routes inexistantes
    name: 'NotFound',
    component: NotFoundComponent
    
  }
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
