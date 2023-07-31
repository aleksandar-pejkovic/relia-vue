<template>
  <div class="main-home main-2 container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="title">Dobro došli u ReliaBill</h1>
        <p class="subtitle">Kreirajte i upravljajte fakturama sa lakoćom</p>
        <router-link to="/login" class="btn btn-primary m-2">Prijavi se</router-link>
        <router-link to="/register" class="btn btn-primary m-2">Registracija</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImage from "@/assets/background.jpg";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Background",
  data() {
    return {
      backgroundImage,
    };
  },
});
</script>
  
<style scoped>

.btn {
  color: #553c9a;
  background-color: transparent;
  border: 1px maroon solid;
  transition: background-color 0.5s ease;
}

.btn:hover {
  background-color: #553c9a;
  color: wheat;
}

.title {
  font-size: 76px;
  font-weight: 600;
  background-image: linear-gradient(45deg, #553c9a, #ee4b2b);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

.subtitle {
  font-size: 1.5rem;
  background-image: linear-gradient(45deg, #ee4b2b, #553c9a);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}

.background-image {
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100%;
  color: aliceblue;
}

@media (max-width: 768px) {
  .background-image {
    background-position: top center;
  }
}

@media (max-width: 480px) {
  .background-image {
    height: 50vh;
  }
}
</style>
  
