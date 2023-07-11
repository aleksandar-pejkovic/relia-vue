<template>
    <button v-if="hasOwnCompany" type="button" class="btn btn-outline-success m-2" @click="downloadInvoicePdf">PDF</button>
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
        invoice: {
            type: Object,
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
            this.$emit('generating-invoice')
            const authStore = useAuthenticationStore();
            const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/pdf/invoice/${this.id}`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });

            const blob = new Blob([response.data], {
                type: 'application/pdf',
            });

            // Get the filename from the invoiceNumber prop
            const filename = `${this.invoice.documentType} ${this.invoice.invoiceNumber}.pdf`;

            const url = window.URL.createObjectURL(blob);

            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.target = '_blank';

            // Programmatically click the link to start the download
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        },
    },
    emits: ['generating-invoice']
})
</script>
