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
            <button class="btn btn-primary me-2">Connexion</button>
          </router-link>
          <router-link to="/inscription">
            <button class="btn btn-warning">Inscription</button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Carte interactive -->
    <div class="container-fluid carte ">
      <div class="info">
        <h1>
          Explorez le Sénégal en un clic : Découvrez les trésors cachés de notre
          pays
        </h1>
        <p>
          Le Sénégal, riche en culture et en diversité, offre une expérience
          unique où modernité et traditions se côtoient. Du mbalax aux coutumes
          ancestrales, chaque région dévoile des trésors culturels. En plus de
          ses plages et paysages, le pays propose une plongée dans l'histoire et
          les arts. Explorez ses sites touristiques pour découvrir un Sénégal
          authentique, entre découvertes culturelles et aventures naturelles.
        </p>
      </div>
      <div class="image">
        <img src="@/assets/country.svg" alt="Carte du senegal" />
      </div>
    </div>

    <!-- Nos destinations -->
    <div class="container-fluid destinations">
      <h2 class="text-center mb-5">Nos destinations</h2>
      <div class="row">
        <!-- Première carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm">
            <img
              src="@/assets/destination1.svg"
              class="card-img-top"
              alt="destination1"
            />
            <div class="card-body">
              <h5 class="card-title">Monument de la renaissance</h5>
              <p class="card-text">
                Dakar est la capitale du Sénégal, est une ville dynamique située
                sur la côte atlantique. Elle est connue pour son riche
                patrimoine culturel...
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>

        <!-- Deuxième carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm">
            <img
              src="@/assets/destination2.svg"
              class="card-img-top"
              alt="destination1"
            />
            <div class="card-body">
              <h5 class="card-title">Île de Gorée</h5>
              <p class="card-text">
                L’île de Gorée, situé au large de Dakar au Sénégal, est célèbre
                pour son histoire liée à la traite des esclaves. Ce site classé
                patrimoine mondiale de ...
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>

        <!-- Troisième carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm">
            <img
              src="@/assets/destination3.svg"
              class="card-img-top"
              alt="destination1"
            />
            <div class="card-body">
              <h5 class="card-title">Joal Fadiouth</h5>
              <p class="card-text">
                Joal Fadiouth est une commune du Sénégal située à l’extrémité de
                la petite-côte, au sud-est de Dakar. Elle réunit en réalité deux
                villages.
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nos activités -->
    <div class="container-fluid my-5 destinations">
      <h2 class="text-center mb-5">Nos activités</h2>
      <div class="row">
        <!-- Première carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm d-flex flex-column">
            <video class="card-img-top" controls>
              <source src="@/assets/balade-lac-rose.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <div class="card-body flex-fill">
              <h5 class="card-title">Balade lac rose</h5>
              <p class="card-text">
                Dakar est la capitale du Sénégal, est une ville dynamique située
                sur la côte atlantique. Elle est connue pour son riche
                patrimoine culturel...
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>

        <!-- Deuxième carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm d-flex flex-column">
            <video class="card-img-top" controls>
              <source
                src="@/assets/SenegalLandofTeranga.mp4"
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <div class="card-body flex-fill">
              <h5 class="card-title">Safari</h5>
              <p class="card-text">
                L’île de Gorée, situé au large de Dakar au Sénégal, est célèbre
                pour son histoire liée à la traite des esclaves. Ce site classé
                patrimoine mondiale de ...
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>

        <!-- Troisième carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm d-flex flex-column">
            <video class="card-img-top" controls>
              <source src="@/assets/EcolodgedeLompoul.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <div class="card-body flex-fill">
              <h5 class="card-title">Balade dromodaire Lompoul</h5>
              <p class="card-text">
                Joal Fadiouth est une commune du Sénégal située à l’extrémité de
                la petite-côte, au sud-est de Dakar. Elle réunit en réalité deux
                villages.
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
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
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam. Amet minim mollit non deserunt ullamco est sit aliqua dolor do
          amet sint. Velit officia consequat duis enim velit mollit.
          Exercitation veniam
        </p>
        <button class="btn-decouvrir">Decouvrir</button>
      </div>
    </div>

    <!-- Temoignages -->
    <div class="container-fluid my-5 temoignages">
      <h2 class="text-center mb-4">Témoignages</h2>
      <p class="text-center">
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
            <div class="d-flex justify-content-center">
              <div class="card testimonial-card shadow-sm text-center">
                <img
                  :src="testimonial.image"
                  class="rounded-circle mx-auto d-block mt-4"
                  :alt="testimonial.name"
                  width="100"
                  height="100"
                />
                <div class="card-body">
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
    <div class="container-fluid py-5 contacts">
      <h2>Contacts</h2>
      <div class="row justify-content-between">
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
              <input type="text" class="form-control" id="name" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required />
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea
                class="form-control"
                id="message"
                rows="3"
                required
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

import { ref } from "vue";

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
</script>

<style scoped>
/* Style spécifique pour la bannière */
.container-fluid  {
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
  margin-top: 120px;
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
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  text-align: justify;
  line-height: normal;
}
.info p {
  width: 595.459px;
  color: #000;
  font-family: "Nunito Sans";
  font-size: 24.387px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: justify;
}
.image img {
  width: 589.574px;
  height: 445px;
  flex-shrink: 0;
}

.destinations {
  margin-top: 120px;
}
.destinations h2 {
  color: #2c3e50;
  text-align: justify;
  font-family: Montserrat;
  font-size: 57.185px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 85.778px */
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
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.btn-success {
  width: 152px;

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
  gap: 32px;
}
.text h2 {
  color: #2c3e50;
  font-family: Montserrat;
  font-size: 54.933px;
  font-style: normal;
  font-weight: 600;
  line-height: 87.893px; /* 160% */
}

.text p {
  width: 608px;
  height: 215px;
  flex-shrink: 0;
  color: #000;
  text-align: justify;
  font-family: Montserrat;
  font-size: 23.804px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 35.707px */
}

.btn-decouvrir {
  width: 152px;

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
  width: 223.696px;
  color: #363636;
  text-align: center;

  /* paragraphes */
  font-family: "Nunito Sans";
  font-size: 12px;
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
  font-size: 57.19px;
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

/* Contacts */
.contacts {
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.contacts h2 {
  color: #2c3e50;
  text-align: center;
  font-family: Montserrat;
  font-size: 57.19px;
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
  color: #000;
  font-family: Montserrat;
  font-size: 25.302px;
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
/* Styles pour les petits écrans */
@media (max-width: 768px) {
  .banniere {
    height: 60vh;
  }

  .overlay-content {
    top: 150px;
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
  .contacts {
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-left: 20px;
  }
  .contacts h2 {
    color: #2c3e50;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
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
}
</style>
