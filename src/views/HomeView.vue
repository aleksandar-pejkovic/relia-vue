<template>
  <div class="main-home main-2 container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="title">Dobro došli u ReliaBill</h1>
        <p class="subtitle">Kreirajte i upravljajte fakturama sa lakoćom</p>
        <router-link to="/login" class="btn btn-gold btn-primary m-3">Prijavi se</router-link>
        <router-link to="/register" class="btn btn-gold btn-primary m-3">Registracija</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
