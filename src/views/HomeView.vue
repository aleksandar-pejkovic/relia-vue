<template>
  <div class="main container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Welcome to My Invoice App</h1>
        <p>Create and manage your invoices with ease</p>
        <router-link to="/login" class="btn btn-primary btn-lg m-4">Login</router-link>
        <router-link to="/register" class="btn btn-primary btn-lg m-4">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LandingPage",
  };
</script>

<style scoped>
</style>
