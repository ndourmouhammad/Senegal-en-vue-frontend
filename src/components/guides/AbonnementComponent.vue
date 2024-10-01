<template>
  <div>
    <HeaderGuide />
    <div class="container-fluid mt-1">
      <!-- Header and Search Bar -->
      <div class="row mb-4">
        <div class="col-md-12">
          <h2 class="fw-bold">Gestion des abonnements</h2>
          <div class="mt-3 col-md-11 d-flex align-items-center buttons">
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
        <div class="col-md-12 mt-2">
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
              <!-- Afficher les abonnements dynamiquement -->
              <tr v-for="abonnement in abonnements" :key="abonnement.id">
                <td>{{ abonnement.id }}</td>
                <td class="name">{{ abonnement.touriste.name }}</td>
                <td>
                  <router-link :to="'/abonnement/' + abonnement.touriste.id">
                    {{ abonnement.touriste.email }}
                  </router-link>
                </td>
                <td class="d-flex justify-content-evenly">
                  <button
                    v-if="abonnement.status === 'en cours'"
                    class="btn-tableau btn-primary btn-sm me-2 action-btn"
                    @click="accepterAbonnement(abonnement.id)"
                  >
                    <span class="d-none d-md-inline">Accepter</span>
                  </button>
                  <button
                    v-if="abonnement.status === 'en cours'"
                    class="btn-tableau btn-danger btn-sm action-btn"
                    @click="refuserAbonnement(abonnement.id)"
                  >
                    <span class="d-none d-md-inline">Refuser</span>
                  </button>
                  <span
                    v-if="abonnement.status === 'accepte'"
                    class="btn-tableau btn-success bg-success"
                  >
                    <span class="d-none d-md-inline">Abonné(e)</span>
                  </span>
                  <img src="@/assets/accepted.svg" alt="" />
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
import abonnementService from "@/services/abonnements";
import { ref, onMounted } from "vue";


const abonnements = ref([]);

const abonnementSites = async () => {
  try {
    const response = await abonnementService.abonnements();
    console.log(response);
    abonnements.value = response; // Charger les abonnements récupérés
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnements:", error);
  }
};

// Fonction pour accepter un abonnement
const accepterAbonnement = async (id) => {
  try {
    await abonnementService.accepter(id);
    // Mettre à jour la liste des abonnements après avoir accepté
    abonnementSites();
  } catch (error) {
    console.error("Erreur lors de l'acceptation de l'abonnement:", error);
  }
};

// Fonction pour refuser un abonnement
const refuserAbonnement = async (id) => {
  try {
    await abonnementService.refuser(id);
    // Mettre à jour la liste des abonnements après avoir refusé
    abonnementSites();
  } catch (error) {
    console.error("Erreur lors du refus de l'abonnement:", error);
  }
};

onMounted(abonnementSites);
</script>

<style scoped>
/* Header and Search Bar */
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

  thead .name {
    display: none;
  }
  tbody .name {
    display: none;
  }
  td {
    font-size: 14px;
  }
  .buttons {
    flex-direction: column;
    gap: 1rem;
  }
  .btn-outline-primary {
  width: 55%;
 
  }
  


  img {
    display: block;
  }
}
</style>
