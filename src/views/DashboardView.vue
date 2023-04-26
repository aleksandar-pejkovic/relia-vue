<template>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Total Invoices</h5>
            </div>
            <div class="card-body">
              <h2>{{ totalInvoices }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Total Revenue</h5>
            </div>
            <div class="card-body">
              <h2>{{ totalRevenue }}</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Recent Invoices</h5>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li v-for="invoice in recentInvoices" :key="invoice.id" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-0">{{ invoice.customerName }}</h6>
                      <small class="text-muted">{{ formatDate(invoice.invoiceDate) }}</small>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ formatCurrency(invoice.totalAmount) }}</h6>
                      <span class="badge bg-primary">{{ invoice.status }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Top Customers</h5>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li v-for="customer in topCustomers" :key="customer.id" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-0">{{ customer.name }}</h6>
                      <small class="text-muted">{{ customer.email }}</small>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ formatCurrency(customer.totalSpent) }}</h6>
                      <span class="badge bg-primary">{{ customer.invoiceCount }} invoices</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        totalInvoices: 0,
        totalRevenue: 0,
        recentInvoices: [],
        topCustomers: [],
      };
    },
    methods: {
      async fetchDashboardData() {
        // Fetch data from API and update component data properties
      },
      formatCurrency(amount) {
        // Format currency amount to display as string
      },
      formatDate(date) {
        // Format date to display as string
      },
    },
    mounted() {
      this.fetchDashboardData();
    },
  };
  </script>
  