<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Profile</h5>
            </div>
            <div class="card-body">
                <div v-if="user">
                    <form  @submit.prevent="saveDetails">
                        <div class="row mb-3 ">
                            <label for="username" class="col-sm-2 col-form-label">Username</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="username" v-model="user.username" readonly>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" v-model="user.email"
                                    :readonly="readOnly">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="name" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" v-model="user.name" :readonly="readOnly">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="creation-date" class="col-sm-2 col-form-label">Creation Date</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="creation-date" v-model="user.creationDate" readonly>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button v-if="readOnly" @click.prevent="editDetails" class="btn btn-primary">
                                Edit
                            </button>
                            <div v-else>
                                <button @click.prevent="cancelEditing" class="btn btn-secondary me-md-2">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
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
import axios from 'axios';

export default {
    name: 'UserDetails',
    data() {
        return {
            user: null,
            readOnly: true
        };
    },
    mounted() {
        this.getUserDetails()
    },
    methods: {
        getUserDetails() {
            const authenticationStore = useAuthenticationStore();
            const baseUrlStore = useBaseUrlStore()
            const url = baseUrlStore.getUrl('users')
            const username = authenticationStore.getUsername;
            axios.get(`${url}/username/${username}`, {
                headers: {
                    Authorization: `Bearer ${authenticationStore.token}`
                }
            })
                .then(response => response.data)
                .then(data => {
                    this.user = data;
                })
                .catch(error => console.error(error));
        },
        async saveDetails() {
            const authenticationStore = useAuthenticationStore();
            const baseUrlStore = useBaseUrlStore()
            const url = baseUrlStore.getUrl('users')
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authenticationStore.token}`
                    },
                    body: JSON.stringify(this.user)
                });
                if (!response.ok) {
                    throw new Error('Failed to update user details');
                }
                const data = response.json();
                this.user = data;
                this.readOnly = true;
                this.getUserDetails()
            } catch (error) {
                console.error(error);
            }
        },
        cancelEditing() {
            this.readOnly = true;
            this.getUserDetails()
        },
        editDetails() {
            this.readOnly = false;
        }
    }
};
</script>
  
<style scoped>
/* Style the input fields when not editing */
.form-control[readonly] {
  background-color: #f8f9fa;
  border: none;
  position: relative;
  animation-name: slide;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

/* Style the input fields when editing */
.form-control:not([readonly]):focus {
  background-color: #ffffff;
  border: 1px solid #ced4da;
  outline: none;
  box-shadow: none;
}

@keyframes slide {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(5%);
    opacity: 0;
  }
  51% {
    transform: translateX(-5%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}


</style>
