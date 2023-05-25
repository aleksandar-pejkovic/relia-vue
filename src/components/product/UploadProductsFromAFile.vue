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
import { useBaseUrlStore } from '@/stores/baseUrl';
import { showErrorMessage } from '../helper/message';

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

            try {
                await axios.post(`${useBaseUrlStore().baseUrl}/api/products/upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${useAuthenticationStore().token}`
                    }
                })
                useProductsStore().fetchProducts()
                showSuccessMessage("Products added", "You successfully added products form the file.")
            } catch (error) {
                console.error('Error uploading file:', error);
                showErrorMessage(error)
            }
        },
    },
};
</script>
  