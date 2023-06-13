<template>
  <div>
    <SendPasswordToken v-if="!token" />
    <UpdatePassword v-else :token="token" />
  </div>
</template>

<script>
import SendPasswordToken from '../components/password-reset/SendPasswordToken.vue'
import UpdatePassword from '../components/password-reset/UpdatePassword.vue'

export default {
  components: {
    SendPasswordToken,
    UpdatePassword
  },
  data() {
    return {
      token: null
    }
  },
  created() {
    this.token = this.$route.query.token || null; // Get the token from the URL query parameter
  }
}
</script>
