<template>
    <form @submit.prevent="createCompany">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" v-model="company.name">
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" v-model="company.city">
                </div>
                <div class="form-group">
                    <label for="zip">Zip number</label>
                    <input type="text" class="form-control" id="zip" v-model="company.zip">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" v-model="company.street">
                </div>
                <div class="form-group">
                    <label for="regNum">Registration number</label>
                    <input type="text" class="form-control" id="regNum" v-model="company.registrationNumber">
                </div>
                <div class="form-group">
                    <label for="taxNum">Tax number</label>
                    <input type="text" class="form-control" id="taxNum" v-model="company.taxNumber">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="bankAcc">Bank account</label>
                    <input type="text" class="form-control" id="bankAcc" v-model="company.bankAccount">
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" class="form-control" id="phone" v-model="company.phone">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="company.email">
                </div>
                <div class="form-group">
                    <label for="website">Website</label>
                    <input type="text" class="form-control" id="website" v-model="company.website">
                </div>
                <div class="form-group">
                    <label for="director">Director</label>
                    <input type="text" class="form-control" id="director" v-model="company.director">
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary mt-2">Create</button>
    </form>
</template>
  
  
<script>
import Swal from 'sweetalert2'
import { useBaseUrlStore } from '@/stores/baseUrl'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'

export default {
    data() {
        return {
            company: {
                name: '',
                city: '',
                zip: '',
                street: '',
                registrationNumber: '',
                taxNumber: '',
                bankAccount: '',
                phone: '',
                email: '',
                website: '',
                director: ''
            }
        }
    },
    methods: {
        async createCompany() {
            this.loading = true
            if (this.formError) {
                Swal.fire({
                    title: 'Registration unsuccessful!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            const baseUrlStore = useBaseUrlStore()
            const url = baseUrlStore.getUrl('companies/client')
            const token = `Bearer ${useAuthenticationStore().token}`
            try {
                await axios.post(
                    url,
                    this.company,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token
                        }
                    }
                );
                this.loading = false;
                Swal.fire({
                    title: 'New company created!',
                    text: 'You can find it on Customers page.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    this.$emit('customerCreated')
                })
            } catch (error) {
                let errorMessages = null
                if (error.response && error.response.data) {
                    errorMessages = Object.values(error.response.data).join("\n");
                } else {
                    errorMessages = error.message
                }
                Swal.fire({
                    title: 'Registration unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    },
}
</script>
  