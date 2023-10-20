<template>
    <nav v-if="totalPages > 1" aria-label="Page navigation example">
        <ul class="pagination m-3">
            <li class="page-item">
                <a class="page-link" @click="goToPage(1)" :disabled="currentPage === 1" aria-label="First">
                    <span aria-hidden="true">Start</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="previousPage" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="page in displayedPages" :key="page" :class="['page-item', { active: page === currentPage }]">
                <a class="page-link" @click="goToPage(page)" href="#">{{ page }}</a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="nextPage" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="goToPage(totalPages)" :disabled="currentPage === totalPages" aria-label="Last">
                    <span aria-hidden="true">Kraj</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        displayCount: {
            type: Number,
            default: 5 // Number of pages to display in the pagination links
        }
    },
    computed: {
        displayedPages() {
            const currentPage = this.currentPage;
            const totalPages = this.totalPages;
            const displayCount = this.displayCount;
            const halfDisplayCount = Math.floor(displayCount / 2);

            // Calculate the start and end page numbers to display
            let startPage = currentPage - halfDisplayCount;
            let endPage = currentPage + halfDisplayCount;

            if (startPage <= 0) {
                // Adjust the start and end page numbers if they go below 1
                startPage = 1;
                endPage = Math.min(displayCount, totalPages);
            } else if (endPage > totalPages) {
                // Adjust the start and end page numbers if they go beyond the total pages
                startPage = Math.max(totalPages - displayCount + 1, 1);
                endPage = totalPages;
            }

            // Create an array of page numbers to display
            return Array(endPage - startPage + 1)
                .fill()
                .map((_, index) => startPage + index);
        }
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.$emit('previous-page');
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('next-page');
            }
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
                this.$emit('go-to-page', page);
            }
        }
    },
    emits: ['previous-page', 'next-page', 'go-to-page']
});
</script>
  
<style scoped>
a {
    cursor: pointer;
}

nav * {
    color: black;
}

@media (max-width: 768px) {
    .pagination {
        margin-top: 20px;
    }
}
</style>
