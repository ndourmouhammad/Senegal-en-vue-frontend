<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderTouriste />

    <!-- Contenu de la page d'accueil -->
    <div class="banniere position-relative mt-1">
      <video class="banniere-video" autoplay muted loop>
        <source src="@/assets/video-banniere2.mp4" type="video/mp4" />
        <!-- Message si la vidéo ne peut pas être lue -->
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      <!-- Texte et boutons superposés -->
      <div
        class="overlay-content d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h1 class="text-white">DÉCOUVREZ LA BEAUTÉ ET LA CULTURE DU SÉNÉGAL</h1>
        <p class="text-white">
          <span class="text-success">Senegal en vue</span>, vous invite à
          explorer la beauté naturelle et la richesse culturelle du Sénégal.
        </p>
        <div class="boutons">
          <router-link to="/connexion">
            <button class="btn btn-primary me-2">Decouvrir</button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Carte interactive -->
    <div class="container-fluid carte">
      <div class="info">
        <h1>
          Explorez le Sénégal en un clic : Découvrez les trésors cachés de notre
          pays
        </h1>
        <video class="video" controls>
          <source src="@/assets/terredepromesse.mp4" type="video/mp4" />
          <!-- Message si la vidéo ne peut pas être lue -->
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
      <div class="image">
        <!-- <img src="@/assets/carte/diourbel.svg" alt="Carte du senegal" /> -->
        <Senegal />
      </div>
    </div>

    <!-- Fdestinations -->
    <div class="container-fluid destinations">
      <h2 class="text-center mb-5">Nos destinations</h2>
      <p>Découvrez les plus belles destinations du Sénégal, entre plages paradisiaques, parcs nationaux, et villes historiques. Chaque région offre une expérience unique, mêlant paysages époustouflants et immersion culturelle. Préparez-vous à explorer un Sénégal authentique, riche en diversité et en traditions.</p>
      <div class="row">
        <!-- Limiter l'affichage à trois sites -->
        <div
          class="col-md-4 mb-4 d-flex"
          v-for="site in sites.slice(0, 3)"
          :key="site.id"
        >
          <div class="card shadow-sm">
            <video
              v-if="isVideo(site.contenu)"
              :src="getMediaUrl(site.contenu)"
              class="card-img-top"
              controls
            ></video>
            <img
              v-else
              :src="getMediaUrl(site.contenu)"
              class="card-img-top"
              :alt="site.libelle"
            />
            <div class="card-body">
              <h5 class="card-title">{{ site.libelle }}</h5>
              <p class="card-text">
                {{ site.description.substring(0, 110) }}...
              </p>

              <router-link
                :to="'/site/' + site.id"
                class="btn-success nav-link"
              >
                Voir plus
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nos activités -->
    <div class="container-fluid my-5 destinations">
      <h2 class="text-center mb-5">Nos activités</h2>
      <p>
        Vivez des moments inoubliables grâce à nos activités variées. Que vous soyez amateur de randonnée, de sports nautiques, ou passionné par l’art et l’artisanat local, nous vous proposons des expériences immersives qui vous permettront de découvrir le Sénégal autrement.
      </p>
      <div class="row">
        <!-- Limiter l'affichage à trois activités -->
        <div
          v-for="activite in activites.slice(0, 3)"
          :key="activite.id"
          class="col-md-4 mb-4 d-flex"
        >
          <div class="card shadow-sm d-flex flex-column">
            <video
              v-if="isVideo(activite.contenu)"
              class="card-img-top"
              controls
            >
              <source :src="getMediaUrl(activite.contenu)" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <img
              v-else
              :src="getMediaUrl(activite.contenu)"
              class="card-img-top"
              alt="Contenu"
            />
            <div class="card-body flex-fill">
              <h5 class="card-title">{{ activite.libelle }}</h5>
              <p class="card-text">
                {{ activite.description.substring(0, 200) }}...
              </p>
              <!-- <a href="#" class="btn btn-success">Voir plus</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- A propos -->
    <div class="container a-propos">
      <div class="image">
        <img src="@/assets/a-propos.png" alt="image" />
      </div>
      <div class="text">
        <h2>A propos</h2>
        <div>
          <p>
            "Sénégal en Vue" est une plateforme dédiée à la promotion du
            tourisme local au Sénégal. Riche en culture et en diversité, le
            Sénégal offre une expérience unique où modernité et traditions se
            côtoient harmonieusement. Que vous soyez passionné par la musique
            vibrante du mbalax, curieux des coutumes ancestrales, ou en quête de
            plages immaculées et de paysages époustouflants, "Sénégal en Vue"
            est votre guide pour découvrir toutes les merveilles du pays.
          </p>
          <p>
            Nous vous proposons une immersion totale dans l'authenticité
            sénégalaise, en explorant des sites touristiques méconnus et des
            trésors culturels cachés. La plateforme met en avant non seulement
            les aspects historiques et artistiques du Sénégal, mais aussi les
            aventures naturelles que chaque région a à offrir. Que ce soit pour
            une aventure en pleine nature ou pour un voyage au cœur de
            l'histoire et des arts, "Sénégal en Vue" est là pour vous
            accompagner dans cette exploration unique.
          </p>
          <p>
            Plongez dans un Sénégal authentique avec nous, entre découvertes
            culturelles et escapades naturelles inoubliables.
          </p>
        </div>
        <button class="btn-decouvrir">Decouvrir</button>
      </div>
    </div>

    <!-- Temoignages -->
    <div class="container-fluid my-5 temoignages">
      <h2 class="text-center mb-4">Témoignages</h2>
      <p class="text-center description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et felis
        id mi consectetur feugiat. Lorem ipsum dolor sit amet.
      </p>

      <div
        id="testimonialCarousel"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            class="carousel-item"
            :class="{ active: index === 0 }"
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
          >
            <div class="d-flex justify-content-center ">
              <div class="card testimonial-card shadow-sm text-center">
                <img
                  :src="testimonial.image"
                  class="rounded-circle mx-auto d-block mt-4"
                  :alt="testimonial.name"
                  width="100"
                  height="100"
                />
                <div class="card-body d-flex flex-column justify-content-center gap-3 text-center">
                  <h5 class="card-title">{{ testimonial.name }}</h5>
                  <p class="card-text">{{ testimonial.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <!-- Section Contacts -->
    <div class=" py-5 contacts">
      <h2>Contacts</h2>
      <div class="row justify-content-between container-fluid">
        <div class="col-md-5 coordonnes">
          <div class="location d-flex align-items-center">
            <img src="@/assets/location.svg" alt="location" class="icon" />
            <p>Dakar plateau / Sénégal</p>
          </div>
          <div class="telephone d-flex align-items-center">
            <img src="@/assets/telephone.svg" alt="telephone" class="icon" />
            <p>+221 78 103 35 01</p>
          </div>
          <div class="mail d-flex align-items-center">
            <img src="@/assets/mail.svg" alt="mail" class="icon" />
            <p>ndourmouhammad15@gmail.com</p>
          </div>
          <div class="reseaux d-flex">
            <a href="#"
              ><img src="@/assets/facebook.svg" alt="facebook" class="icon"
            /></a>
            <a href="#"
              ><img src="@/assets/instagram.svg" alt="instagram" class="icon"
            /></a>
            <a href="#"
              ><img src="@/assets/linkedin.svg" alt="linkedin" class="icon"
            /></a>
          </div>
        </div>

        <div class="col-md-6 formulaire">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Nom</label>
              <input
                type="text"
                class="form-control"
                id="name"
                required
                placeholder="Nom"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                required
                placeholder="Email"
              />
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea
                class="form-control"
                id="message"
                rows="3"
                required
                placeholder="Message"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Envoyer</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Appel du composant Footer -->
    <FooterTouriste />
  </div>
</template>

<script setup>
// Importation du composant Header
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import Senegal from "../visiteurs/carte/Senegal.vue";
import { ref, onMounted } from "vue";
import siteService from "@/services/sites";
import activiteService from "@/services/activites";

// Déclarer une variable réactive pour stocker les sites
const sites = ref([]);
const activites = ref([]);

// Fonction pour récupérer les sites depuis le service
const fetchSites = async () => {
  try {
    const response = await siteService.get();
    sites.value = response.data; // Stocker les sites récupérés dans la variable réactive
  } catch (error) {
    console.error("Erreur lors de la récupération des sites:", error);
  }
};

// Méthode pour construire l'URL du média (vidéo ou image)
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
    
};

// Méthode pour vérifier si le contenu est une vidéo
const isVideo = (contenu) => {
  return (
    contenu.endsWith(".mp4") ||
    contenu.endsWith(".mov") ||
    contenu.endsWith(".avi")
  );
};

// Fonction pour récupérer les activités depuis le service
const fetchActivites = async () => {
  try {
    const response = await activiteService.get();
    activites.value = response.data.data; // Accède aux données
  } catch (error) {
    console.error("Erreur lors de la récupération des activités:", error);
  }
};

const testimonials = ref([
  {
    id: 1,
    name: "Aissé BA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  ",
    image: "../../../public/profil3.svg",
  },
  {
    id: 2,
    name: "Daouda Dione",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  ",
    image: "../../../public/profil1.svg",
  },
  {
    id: 3,
    name: "Mamadou Ngom",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris  ",
    image: "../../../public/profil2.svg",
  },
]);
onMounted(() => {
  fetchSites();
  fetchActivites();
});
</script>

<style scoped>
/* Style spécifique pour la bannière */
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}
.banniere {
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.banniere-video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Pour ajuster la vidéo à la taille du conteneur */
}


/* Superposition du contenu */
.overlay-content {
  position: absolute;
  top: 200px;
  left: 100px;
  right: 0;
  bottom: 0;
  z-index: 2; /* Assure que le texte soit visible au-dessus de la vidéo */
  border-radius: 20px;
  background: rgba(38, 38, 38, 0.45);
  width: 628px;
  height: 266.206px;
  flex-shrink: 0;
}
h1 .text-white {
  width: 597px;
  height: 85.627px;
  flex-shrink: 0;
  color: var(--White, #fff);

  /* h1 */
  font-family: Montserrat;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

p .text-white {
  width: 576.98px;
  height: 51.977px;
  flex-shrink: 0;
  color: var(--White, #fff);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
}

.text-success {
  color: var(--White, #27ae60);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 30px; /* 150% */
}

/* Style des boutons */
.boutons {
  display: flex;
  gap: 127px;
}

.btn {
  padding: 10px 20px;
  font-size: 18px;
}

.btn-primary {
  width: 217.636px;
  height: 53.411px;
  flex-shrink: 0;
  border-radius: 35.795px;
  background: #3498db;
  border: none;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 22.909px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.btn-warning {
  width: 217.636px;
  height: 53.411px;
  flex-shrink: 0;
  border-radius: 35.795px;
  background: #f1c40f;
  border: none;
  color: #3498db;
  font-family: Montserrat;
  font-size: 22.909px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/* Carte  */
.carte {
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
}
.info h1 {
  width: 597px;
  height: 147px;
  flex-shrink: 0;
  color: #2c3e50;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  text-align: justify;
  line-height: normal;
}
.info video {
  width: 595.459px;
  border-radius:6px;
}


.destinations {
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  gap: 15px;
text-align: center;
}
.destinations h2 {
  color: #2c3e50;
  text-align: justify;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 85.778px */
}
.destinations p {
  font-family: "Nunito Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.destinations .card-title {
  color: #27ae60;

  /* Heading/H5 Bold */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
  letter-spacing: 0.12px;
}

.destinations .card-text {
  color: #000;

  /* paragraphes */
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.btn-success {
  width: 20%;

  flex-shrink: 0;
  border-radius: 25px;
  background: #27ae60;
  border: none;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  padding: 10px;
  margin-top: auto;
}
.btn-success:hover {
  background: #3498db;
  color: #f8f9fa;
}
.card {
  display: flex;
  flex-direction: column;
}
.card-body {
  flex: 1; /* Permet à la carte de s'étendre pour remplir l'espace */
}
.card-img-top {
  max-height: 300px; /* Ajustez cette valeur selon vos besoins */
  object-fit: cover; /* Pour maintenir le ratio de l'image */
}
.a-propos {
  display: flex;
  gap: 50px;
  margin-top: 120px;
}
.a-propos .image img {
  width: 585.955px;
  height: 460.615px;
  flex-shrink: 0;
}
.text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.text h2 {
  color: #2c3e50;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 87.893px; /* 160% */
}

.text p {
  /* width: 608px;
  height: 215px; */
  flex-shrink: 0;
  color: #000;
  text-align: justify;
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 35.707px */
}

.btn-decouvrir {
  width: 152px;
  display: none;
  flex-shrink: 0;
  border-radius: 25px;
  background: #27ae60;
  border: none;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  padding: 10px;
  margin-top: auto;
}
.temoignages {
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.temoignages .description {
  font-size: 14px;
}

.testimonial-card {
  width: 370px;
  height: 418px;
  flex-shrink: 0;
  border-radius: 15.322px;
  border: 1px solid #3498db;
  background: var(--White, #fff);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  align-items: center;
  justify-content: center;
}
.testimonial-card img {
  width: 139.859px;
  height: 139.865px;
  flex-shrink: 0;
  border-radius: 139.865px;
}

.temoignages .card-title {
  width: 100%;
  height: 49.031px;
  flex-shrink: 0;
  border-radius: 61.289px;
  background: #3498db;
  color: #f0f0f0;
  text-align: center;
  font-family: "Nunito Sans";
  font-size: 20.43px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}

.temoignages .card-text {
  width: 100%;
  color: #363636;
  text-align: center;

  /* paragraphes */
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.temoignages img.rounded-circle {
  border: 5px solid #e9ecef;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #007bff;
  border-radius: 50%;
  padding: 20px;
  width: 40px;
}

.temoignages h2 {
  color: #2c3e50;
  text-align: center;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.temoignages p {
  color: #363636;
  text-align: center;

  /* paragraphes */
  font-family: "Nunito Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.contacts {
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  /* Background image properties */
  background-image: url('@/assets/beautiful.jpg'); /* Replace with your image path */
  background-size: cover; /* Makes sure the image covers the entire area */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  background-position: center; /* Centers the image */
  position: relative; /* Allows pseudo-element positioning */

  /* Ensure text and form elements are above the background */
  z-index: 1;
}

.contacts::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: -1; /* Places it behind the content */
  border-radius: inherit; /* Ensures the overlay follows any border radius */
}


.contacts h2 {
  color: white;
  text-align: center;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.coordonnes {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.coordonnes .location,
.coordonnes .telephone,
.coordonnes .mail {
  display: flex;
  align-items: center;
  gap: 40px;
}
.coordonnes .location p,
.coordonnes .telephone p,
.coordonnes .mail p {
  color: white;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 30.724px; /* 121.429% */
}
.reseaux {
  display: flex;
  align-items: center;
  gap: 40px;
}
.contacts .row {
  display: flex;
}
/* Effet glace */
.formulaire form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff21;
  backdrop-filter: blur(10px); /* Flou en arêt-plan */
  backdrop-filter: blur(10px); /* Flou en arrière-plan */
  padding: 30px 35px;
  border-radius: 15px; /* Ajusté pour une meilleure apparence */
  
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1); /* Ombre pour donner du relief */
}

.formulaire form input{
  border-radius: 10px;
  padding : 14px 19px;
  background-color: #ffffff21;
  backdrop-filter: blur(10px); /* Flou en arêt-plan */
  color: white;
  font-weight: bold;
}

.formulaire form input::placeholder, .formulaire form textarea::placeholder {
  color: white;
  opacity: 1;
}

.formulaire form textarea{
  width: 100%;
  border-radius: 10px;
  padding : 14px 19px;
  background-color: #ffffff21;
  backdrop-filter: blur(10px); /* Flou en arêt-plan */
  color: white;
  font-weight: bold;
}




.formulaire label {
  font-size: 18px;
  color: white;
}
/* Styles pour les petits écrans */
@media (max-width: 768px) {
  .banniere {
    height: 60vh;
  }

  .overlay-content {
    top: 30px;
    left: 20px;
    right: 20px;
    width: calc(100% - 40px);
    height: auto;
    padding: 20px;
    border-radius: 10px;
  }

  h1 .text-white {
    font-size: 24px;
    width: 100%;
    text-align: center;
  }

  p .text-white {
    font-size: 16px;
    width: 100%;
    text-align: center;
  }

  .boutons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    font-size: 16px;
    padding: 15px;
  }

  .btn-primary {
    font-size: 18px;
  }

  .btn-warning {
    font-size: 18px;
  }
  .image {
    display: none;
  }
  .info {
    gap: 15px;
  }
  .info h1 {
    color: #2c3e50;
    text-align: justify;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    height: auto;
    width: 363px;
  }
  .info p {
    color: #000;
    text-align: justify;
    font-family: "Nunito Sans";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: auto;
    width: 363px;
  }
  .a-propos .image img {
    display: none;
  }
  .text {
    gap: 2px;
    margin-top: -100px;
  }

  .text h2 {
    color: #2c3e50;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .text p {
    width: 350px;
    height: 117.191px;
    flex-shrink: 0;
    color: #000;
    text-align: justify;
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 19.5px */
  }
  .temoignages h2 {
    color: #2c3e50;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .temoignages .card-text {
    width: 215px;
    color: #363636;
    text-align: justify;
    font-family: "Nunito Sans";
    font-size: 8.141px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 30px;
  }
  .testimonial-card {
    width: 100%;
    height: auto;
  }
  .contacts {
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-left: 20px;
  }
  .contacts h2,
  .destinations h2 {
    color: #2c3e50;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .destinations h2 {
    margin-top: 20px;
  }
  .coordonnes .location,
  .coordonnes .telephone,
  .coordonnes .mail {
    display: flex;
    align-items: center;
  }
  .coordonnes .location p,
  .coordonnes .telephone p,
  .coordonnes .mail p {
    color: #000;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 30.724px; /* 219.459% */
  }
  .coordonnes {
    margin-bottom: 20px;
  }
  .info video {
  width: 100%;
}
}
</style>
