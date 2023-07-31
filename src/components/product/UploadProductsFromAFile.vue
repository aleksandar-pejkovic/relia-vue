<template>
    <div>
        <div v-if="loading" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
            <input type="file" @change="handleFileUpload" accept=".xlsx, .xls, .csv" :max-size="52880">
            <button @click="uploadFile" class="btn btn-outline-secondary m-1">Učitaj</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { useAuthenticationStore } from '@/stores/authentication';
import { useProductsStore } from '@/stores/products';
import { useBaseUrlStore } from '@/stores/baseUrl';
import { showErrorMessage, showSuccessMessage } from '../helper/message';

export default {
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async uploadFile() {
            if (!this.file) {
                console.error('No file selected.');
                window.alert('No file selected.')
                return;
            }
            console.log('uploading file')
            this.loading = true

            const formData = new FormData();
            formData.append('file', this.file);

            try {
                const response = await axios.post(`${useBaseUrlStore().baseUrl}/api/upload/products`, formData, {
                    headers: {
                        Authorization: `Bearer ${useAuthenticationStore().token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const responseData = response.data;

                showSuccessMessage(
                    "Fajl je učitan",
                    "Proizvodi su ažurirani"
                );
                await useProductsStore().fetchProducts();
            } catch (error) {
                showErrorMessage(error);
                console.error("Došlo je do greške:", error);
            } finally {
                this.file = null;
                console.log('Uploading done');
                this.loading = false;
            }
        },
    },
};
</script>
  