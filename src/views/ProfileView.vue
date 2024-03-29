<template>
    <div class="main container mt-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Profil</h5>
            </div>
            <div class="card-body">
                <div v-if="user">
                    <form @submit.prevent="updateUser">
                        <div class="row mb-3 ">
                            <label for="username" class="col-sm-2 col-form-label">Korisničko ime</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="username" v-model="user.username" readonly>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="email" class="col-sm-2 col-form-label">Imejl</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" v-model="user.email"
                                    :readonly="readOnly" @input="validateEmail">
                                <span v-if="emailError" class="error">{{ emailError }}</span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="name" class="col-sm-2 col-form-label">Ime i prezime</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" v-model="user.name" :readonly="readOnly"
                                    @input="validateName">
                                <span v-if="nameError" class="error">{{ nameError }}</span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="creation-date" class="col-sm-2 col-form-label">Datum kreiranja</label>
                            <div class="col-sm-10">
                                <div class="form-control" id="creation-date" readonly>
                                    {{ formatDate(user?.creationDate ?? new Date()) }}
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button v-if="readOnly" @click.prevent="startEditing" class="btn btn-dark btn-outline-primary m-2">
                                Izmeni
                            </button>
                            <div v-else>
                                <div v-if="loading" class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div v-else>
                                    <button @click.prevent="cancelEditing" class="btn btn-dark btn-outline-secondary m-2">
                                        Otkaži
                                    </button>
                                    <button type="submit" class="btn btn-dark btn-outline-primary m-2"
                                        :class="{ 'disabled': emailError || nameError }" :disabled="hasErrors">
                                        Sačuvaj
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <p>Nema podataka.</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script>
import { useUserStore } from '../stores/user';
import { defineComponent, watch } from 'vue';

export default defineComponent({
    name: 'UserDetails',
    data() {
        return {
            user: null,
            temp: null,
            readOnly: true,
            emailError: '',
            nameError: '',
            loading: false,
        };
    },
    computed: {
        hasErrors() {
            return Boolean(this.emailError || this.nameError);
        },
    },
    mounted() {
        const userStore = useUserStore()
        this.user = { ...userStore.user } // create a new object with the same properties as userStore.user

        watch(() => userStore.user, (newUser) => {
            this.user = { ...newUser }; // create a new object with the same properties as newUser
        });
    },

    methods: {
        async updateUser() {
            this.readOnly = true
            this.loading = true
            const userStore = useUserStore()
            userStore.updateUser(this.user)
            this.loading = false
        },
        cancelEditing() {
            this.readOnly = true;
            this.emailError = ''
            this.nameError = ''
            this.user = { ...this.temp };
        },
        startEditing() {
            this.readOnly = false;
            this.temp = { ...this.user };
        },
        formatDate(date) {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };
            return new Intl.DateTimeFormat('sr-RS', options).format(new Date(date));
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(this.user.email);
            if (!this.user.email) {
                this.emailError = 'Imejl je obavezan.'
            } else if (!isValidEmail) {
                this.emailError = 'UImejl adresa neispravna.';
            } else {
                this.emailError = '';
            }
        },
        validateName() {
            const nameRegex = /^[A-Z][a-zA-ZŠĐČĆŽšđčćž]*([ \u002D][A-Z][a-zA-ZŠĐČĆŽšđčćž]*)*$/;
            const isValidName = nameRegex.test(this.user.name)
            if (!isValidName) {
                this.nameError = 'Ime neispravno.'
            } else {
                this.nameError = ''
            }
        },
    },
    watch: {
        email: 'validateEmail',
        name: 'validateName',
    },
});
</script>
