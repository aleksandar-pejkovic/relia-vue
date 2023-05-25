<template>
    <button v-if="hasOwnCompany" type="button" class="btn btn-primary mb-2" @click="downloadInvoicePdf">PDF</button>
</template>
  
<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { useBaseUrlStore } from '../stores/baseUrl';
import { useCompaniesStore } from '../stores/companies';

export default defineComponent({
    props: {
        id: {
            type: Number,
            required: true,
        },
        invoiceNumber: {
            type: String,
            required: true,
        },
    },
    computed: {
        hasOwnCompany() {
            return useCompaniesStore().ownCompany != null
        }
    },
    methods: {
        async downloadInvoicePdf() {
            const authStore = useAuthenticationStore()
            const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/pdf/invoice/${this.id}`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });

            const blob = new Blob([response.data], {
                type: 'application/pdf',
            });

            const url = window.URL.createObjectURL(blob);

            // Open the PDF in a new browser tab
            window.open(url, '_blank');

            // Clean up
            window.URL.revokeObjectURL(url);
        },
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        invoiceNumber: {
            type: String,
            required: true,
        },
    },
})
</script>
