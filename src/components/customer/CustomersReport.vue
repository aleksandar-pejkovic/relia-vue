<template>
    <div v-if="generatingReport" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Generating report...</span>
    </div>
    <div v-else class="container row">
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
import { saveAs } from 'file-saver';

export default defineComponent({
    data() {
        return {
            sortBy: 'REVENUE',
            generatingReport: false
        };
    },
    methods: {
        downloadCustomersReport() {
            this.generatingReport = true
            const authStore = useAuthenticationStore();
            axios.get(`${useBaseUrlStore().baseUrl}/api/pdf/companies-report`, {
                responseType: 'blob',
                params: {
                    sortBy: this.sortBy
                },
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            }).then(response => {
                saveAs(response.data, `companies-report.pdf`)
                this.generatingReport = false
            })
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
