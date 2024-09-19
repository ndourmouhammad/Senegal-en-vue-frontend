<template>
  <div>
    <HeaderGuide />
    <div class="container-fluid mt-1">
      <!-- Header and Search Bar -->
      <div class="row mb-4">
        <div class="col-md-12">
          <h2 class="fw-bold">Gestion des abonnements</h2>
          <div class="mt-3 col-md-11 d-flex align-items-center">
            <input
              type="text"
              class="form-control me-5"
              placeholder="Rechercher par email"
            />
            <button class="btn btn-outline-primary" type="button">
              Rechercher
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="row">
        <div class="col-md-12  mt-5">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th class="name">Nom complet</th>
                <th>Adresse email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Example row data -->
              <tr>
                <td>1</td>
                <td class="name">Fatoumata Dansoko</td>
                <td>
                  <router-link
                      :to="'/abonnement/'"
                      
                    >
                    fatoumatadansoko@gmail.com
                    </router-link>
                </td>
                
                <td class="d-flex justify-content-evenly">
                  <button class="btn-tableau btn-primary btn-sm me-2 action-btn">
                    <span class="d-none d-md-inline">Accepter</span>
                    
                  </button>
                  <img src="@/assets/accept-mbile.svg" alt="">
                  <button class="btn-tableau btn-danger btn-sm action-btn">
                    <span class="d-none d-md-inline">Refuser</span>
                    
                  </button>
                  <img src="@/assets/cancel-mobile.svg" alt="">
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td class="name">Fatoumata Dansoko</td>
                <td>fatoumatadansoko@gmail.com</td>
                <td class="d-flex justify-content-evenly">
                  <button class="btn-tableau btn-primary btn-sm me-2 action-btn">
                    <span class="d-none d-md-inline">Accepter</span>
                    
                  </button>
                  <img src="@/assets/accept-mbile.svg" alt="">
                  <button class="btn-tableau btn-danger btn-sm action-btn">
                    <span class="d-none d-md-inline">Refuser</span>
                    
                  </button>
                  <img src="@/assets/cancel-mobile.svg" alt="">
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td class="name">Fatoumata Dansoko</td>
                <td>fatoumatadansoko@gmail.com</td>
                <td class="d-flex justify-content-evenly">
                  <span class="btn-tableau btn-success bg-success">
                    <span class="d-none d-md-inline">Abonné(e)</span>
                   
                  </span>
                  <img src="@/assets/accepted.svg" alt="">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderGuide from "@/components/communs/HeaderGuide.vue";
</script>

<style scoped>
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.fw-bold {
  color: #000;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
img {
  display: none;
}

.table th,
.table td {
  vertical-align: middle;
  font-family: Montserrat;
}

input {
  border-radius: 25px;
  border: 1px solid var(--black, #051d30);
  background: var(--White, #fff);
  width: 100%;
}

.btn-outline-primary {
  display: inline-flex;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  border: 1px solid #3498db;
  color: #3498db;
  background: #f5f5f5;
  width: 15%;
  height: auto;
  display: flex;
  justify-content: center;
}

.btn-tableau {
  display: flex;
  width: 95.564px;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  color: var(--cartes-de-presentation, #f8f9fa);
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  display: flex;
  justify-content: center;
  border: none;
}

.btn-primary {
  background: #3498db;
}

.btn-danger {
  background: #ff3d00;
}

.btn-success {
  background: #27ae60;
}

/* Media Queries for Mobile */
@media (max-width: 768px) {
  .btn-tableau {
    width: auto;
  }
  .action-btn i {
    font-size: 1.2rem;
  }
  thead .name {
    display: none;
  }
  tbody .name {
    display: none;
  }
  td {
    font-size: 14px;
  }
  .btn-outline-primary {
    display: inline-flex;
padding: 10px 0px;
justify-content: space-between;
align-items: center;
border-radius: 25px;
border: 1px solid #3498DB;
background: #F5F5F5;
color: #3498DB;
width:auto;

/* Choix */
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
  }
  input {
    display: flex;
width: 248px;
padding: 7px 35px;
align-items: center;
gap: 10px;
border-radius: 25px;
border: 1px solid var(--black, #051D30);
background: var(--White, #FFF);
color: var(--Gray, #B3B3B3);

/* Texte */
font-family: "Nunito Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 30px; /* 214.286% */
  }

  img {
    display: block;
  }
}

</style>