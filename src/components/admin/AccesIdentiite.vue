<template>
  <div>
    <HeaderAdmin />
    <div class="container-fluid">
      <div class="container ombre">
        <div class="row align-items-center">
          <!-- Text Section -->
          <div class="col-md-6">
            <h2 class="text-center text-md-start">
              Gestion des accès et des identités
            </h2>
            <p class="text-center text-md-start">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
            </p>
            <div class="d-flex flex-column gap-3 acccess">
              <router-link to="/acces-users">
                <button class="btn btn-custom btn-logout">
                  Gestion des utilisateurs
                </button>
              </router-link>

              <router-link to="/acces-roles">
                <button class="btn btn-custom btn-logout">
                    Gestion des rôles
                </button>
              </router-link>

              <router-link to="/acces-permissions">
                <button class="btn btn-custom btn-logout">
                    Gestion des permissions
                </button>
              </router-link>
            </div>
          </div>

          <!-- Image/Icon Section -->
          <div class="col-md-6 text-center">
            <img
              src="@/assets/Vector.svg"
              alt="Access Management Icon"
              class="img-fluid access-icon"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderAdmin from "../communs/HeaderAdmin.vue";
</script>

<style scoped>
/* Ombre blanc pour mon bordure */
.ombre {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.container-fluid {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

h2 {
  color: #2c3e50;

  /* Sous titres */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 61px;
}

p {
  color: #000;
  font-family: "Nunito Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 181%; /* 27.15px */
  margin-bottom: 131px;
}

.access-icon {
  max-width: 80%;
  height: auto;
}

.btn-custom {
  color: white;
  font-weight: 500px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  width: 292px;
  height: 55px;
}
.btn-logout {
  background-color: #3498db;
  border-color: #3498db;
}

@media (max-width: 768px) {
  .access-icon {
    display: none;
  }
  .ombre {
    padding: 2rem;
  }
  .acccess {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    font-size: 20px;
    font-style: normal;
    margin-bottom: 45px;
  }
  p {
    font-size: 12px;
    margin-bottom: 34px;
  }
  .btn-custom {
    width: 292px;
    height: 55px;
    padding: 16px;
  }
}
</style>
