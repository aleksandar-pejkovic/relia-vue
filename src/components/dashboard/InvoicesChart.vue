<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script>
import { onMounted, ref } from 'vue';
import { useInvoicesStore } from '@/stores/invoices';
import Chart from 'chart.js/auto';

export default {
    name: 'InvoiceChart',
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const invoices = useInvoicesStore().invoices;

            // Sort invoices based on total in descending order
            const sortedInvoices = invoices.sort((a, b) => b.total - a.total);

            // Get the top 10 invoices with the highest total
            const topInvoices = sortedInvoices.slice(0, 10);

            const totals = topInvoices.map((invoice) => Number(invoice.total).toFixed(2));
            const labels = topInvoices.map((invoice) => invoice.invoiceNumber);

            const chartCanvas = this.$refs.chartCanvas;
            const ctx = chartCanvas.getContext('2d');

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Invoice Totals',
                            data: totals,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 2,
                            },
                        },
                    },
                },
            });
        },
    },
};
</script>
  
<style>
canvas {
    max-width: 100%;
}
</style>
  