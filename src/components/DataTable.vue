<template>
  <div class="container">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td v-for="(value, key) in item" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import axios from 'axios'
import { useAuthenticationStore } from '../stores/authentication'
import { useBaseUrlStore } from '../stores/baseUrl'

export default {
  props: {
    url: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const baseUrlStore = useBaseUrlStore()
      const authenticationStore = useAuthenticationStore()
      const url = baseUrlStore.getUrl(this.url)
      const token = authenticationStore.token
      axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(response => response.data)
        .then(data => this.data = data)
        .catch(error => console.error(error))
    }
  }
}
</script>
  