<template>
  <div class="main container mt-5 mb-5">
    <div class="row">
      <div @click="this.$router.push('/invoices')" class="col-md-6">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title">Ukupno dokumenata</h5>
          </div>
          <div class="card-body">
            <h2>{{ totalInvoices }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title">Ukupni promet</h5>
          </div>
          <div class="card-body">
            <h2>
              {{ Number(totalRevenue).toLocaleString(
                'sr-RS',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              }}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title">Top dokumenti</h5>
          </div>
          <div class="card-body">
            <InvoicesChart />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title">Top partneri</h5>
          </div>
          <div class="card-body">
            <CompaniesChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices';
import InvoicesChart from '../components/dashboard/InvoicesChart.vue';
import CompaniesChart from '../components/dashboard/CompaniesChart.vue';

export default defineComponent({
  components: {
    InvoicesChart,
    CompaniesChart
  },
  computed: {
    totalInvoices() {
      return useInvoicesStore().invoices?.length || 0
    },
    totalRevenue() {
      return useInvoicesStore().invoices?.reduce((sum, invoice) => sum + invoice.total, 0) || 0;
    },
  },
})
</script>
  