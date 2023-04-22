<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Logged in user details</h5>
            </div>
            <div class="card-body">
                <div v-if="user">
                    <p><strong>Username:</strong> {{ user.username }}</p>
                    <p><strong>Email:</strong> {{ user.email }}</p>
                    <p><strong>Name:</strong> {{ user.name }}</p>
                    <p><strong>Creation date:</strong> {{ user.creationDate }}</p>
                </div>
                <div v-else>
                    <p>No user details available.</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useAuthenticationStore } from '../stores/authentication'
import { useBaseUrlStore } from '@/stores/baseUrl'

export default {
    name: 'LoggedInUserDetails',
    data() {
        return {
            user: null
        };
    },
    mounted() {
        const authenticationStore = useAuthenticationStore();
        const baseUrlStore = useBaseUrlStore()
        const url = baseUrlStore.getUrl('users')
        // Retrieve the user details using the username stored in the authentication store
        const username = authenticationStore.getUsername;
        fetch(`${url}/username/${username}`, {
            headers: {
                Authorization: `Bearer ${authenticationStore.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.user = data;
            })
            .catch(error => console.error(error));
    }
};
</script>
  