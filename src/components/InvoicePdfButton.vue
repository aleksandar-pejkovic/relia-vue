<template>
    <button v-if="hasOwnCompany" type="button" class="btn btn-outline-primary m-2" @click="downloadInvoicePdf"
        :disabled="disabled">{{ message }}</button>
</template>
  
<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { useBaseUrlStore } from '../stores/baseUrl';
import { useCompaniesStore } from '../stores/companies';
import { saveAs } from 'file-saver';

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
    data() {
        return {
            message: 'PDF',
            disabled: false,
        }
    },
    methods: {
        downloadInvoicePdf() {
            this.message = 'Creating...'
            this.disabled = true
            const authStore = useAuthenticationStore();
            axios.get(`${useBaseUrlStore().baseUrl}/api/pdf/invoice/${this.id}`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            }).then(response => {
                saveAs(response.data, `${this.invoice.documentType} ${this.invoice.invoiceNumber}.pdf`)
                this.message = 'Ready!'
                setTimeout(() => {
                    this.message = 'PDF'
                    this.disabled = false
                }, 4000)
            })
        },
    },
})
</script>
