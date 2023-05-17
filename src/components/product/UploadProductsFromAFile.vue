<template>
    <div>
        <input type="file" @change="handleFileUpload" accept=".xlsx, .xls, .csv">
        <button @click="uploadFile" class="btn btn-secondary">Upload</button>
    </div>
</template>
  
<script>
import axios from 'axios';
import { useAuthenticationStore } from '@/stores/authentication';
import { useProductsStore } from '@/stores/products';
import Swal from 'sweetalert2'

export default {
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async uploadFile() {
            if (!this.file) {
                console.error('No file selected.');
                return;
            }

            const formData = new FormData();
            formData.append('file', this.file);

            await axios.post('http://localhost:8080/api/products/upload', formData, {
                headers: {
                    Authorization: `Bearer ${useAuthenticationStore().token}` // Add the Bearer token as a header
                }
            })
                .then(response => {
                    useProductsStore().fetchProducts()
                    this.showSuccessMessage()
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    this.showErrorMessage()
                });
        },
        async showSuccessMessage() {
            await Swal.fire({
                title: "Welcome!",
                text: "You successfully added products form the file.",
                icon: "success",
                confirmButtonText: "OK",
            });
        },
        async showErrorMessage() {
            await Swal.fire({
                title: "Error!",
                text: 'Products were not saved!',
                icon: "error",
                confirmButtonText: "OK",
            });
        },
    },
};
</script>
  