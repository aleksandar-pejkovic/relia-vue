<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices';
import { useCompaniesStore } from '@/stores/companies';
import Chart from 'chart.js/auto';

export default defineComponent({
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const chartCanvas = this.$refs.chartCanvas;
            const topCustomers = this.calculateTopCustomers();

            const customerNames = topCustomers.map(customer => customer.name);
            const customerRevenue = topCustomers.map(customer => Number(customer.revenue.toFixed(2)));

            new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: customerNames,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: customerRevenue,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
        calculateTopCustomers() {
            const invoicesStore = useInvoicesStore();
            const customers = {};

            invoicesStore.invoices.forEach(invoice => {
                const customer = this.getCompany(invoice.companyId);

                if (!customers[customer.id]) {
                    customers[customer.id] = {
                        id: customer.id,
                        name: customer.name,
                        revenue: 0,
                    };
                }
                customers[customer.id].revenue += invoice.total;
            });

            const sortedCustomers = Object.values(customers).sort((a, b) => b.revenue - a.revenue);

            return sortedCustomers.slice(0, 5);
        },
        getCompany(companyId) {
            const companiesStore = useCompaniesStore();
            const company = companiesStore.companies.find(company => company.id === companyId);
            return company || {};
        },
    },
});
</script>
  