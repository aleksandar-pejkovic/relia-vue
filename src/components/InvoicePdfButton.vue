<template>
    <button type="button" class="btn btn-primary" @click="downloadInvoicePdf">PDF</button>
</template>
  
<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';

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
    methods: {
        async downloadInvoicePdf() {
            const authStore = useAuthenticationStore()
            const response = await axios.get(`http://localhost:8080/api/pdf/invoice/${this.id}`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });

            const blob = new Blob([response.data], {
                type: 'application/pdf',
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.invoiceNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
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
