<template>
    <div class="container row">
        <select v-model="sortBy" class="form-select m-2">
            <option value="REVENUE">Revenue</option>
            <option value="DEBT">Debt</option>
            <option value="PAYMENTS">Payments</option>
            <option value="NAME">Name</option>
        </select>
        <button type="button" class="btn btn-outline-primary m-2" @click="downloadCustomersReport">Create Report</button>
    </div>
</template>
  
<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { useBaseUrlStore } from '@/stores/baseUrl';

export default defineComponent({
    data() {
        return {
            sortBy: 'REVENUE'
        };
    },
    methods: {
        async downloadCustomersReport() {
            const authStore = useAuthenticationStore();
            const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/pdf/companies-report`, {
                responseType: 'blob',
                params: {
                    sortBy: this.sortBy
                },
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });

            const blob = new Blob([response.data], {
                type: 'application/pdf',
            });

            // Get the filename from the invoiceNumber prop
            const filename = `companies-report.pdf`;

            const url = window.URL.createObjectURL(blob);

            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            // link.target = '_blank';
            link.download = filename;

            // Programmatically click the link to start the download
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        },
    },
})
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: end;
}

h6 {
    width: 80px;
    margin: 0;
}

.form-select {
    width: 130px;
}
</style>
