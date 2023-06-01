<template>
    <div>
        <input ref="fileInput" type="file" @change="handleFileUpload" accept=".xlsx, .xls, .csv" :max-size="52880">
        <div v-if="loading" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
            <button @click="uploadFile" class="btn btn-secondary m-1">Upload</button>
            <button @click="reloadProducts" class="btn btn-success m-1">&#x27F3;</button>
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

            axios.post(`${useBaseUrlStore().baseUrl}/api/products/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${useAuthenticationStore().token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            showSuccessMessage(
                "File uploaded",
                "The time it will take to upload files depends on the size of the file. Wait a while and then click reload button."
            )

            this.file = null
            this.$refs.fileInput.value = null;
            console.log('uploading done')
            this.loading = false
        },
        async reloadProducts() {
            this.loading = true
            await useProductsStore().fetchProducts()
            this.loading = false
        }
    },
};
</script>
  