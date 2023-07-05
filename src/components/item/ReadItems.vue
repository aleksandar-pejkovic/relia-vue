<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="col-2">Product</th>
                        <th class="col-2">Quantity</th>
                        <th class="col-2">Pre Tax</th>
                        <th class="col-2">Tax Rate</th>
                        <th class="col-2">Price</th>
                        <th class="col-2">Total</th>
                        <th class="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>
                            {{ item.productName }}
                        </td>
                        <td>
                            {{ item.quantity }}
                        </td>
                        <td>
                            {{ Number(item.preTax).toLocaleString(
                                'sr-RS',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }}
                        </td>
                        <td>
                            {{ item.taxRate }}
                        </td>
                        <td>
                            {{ Number(item.price).toLocaleString(
                                'sr-RS',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }}
                        </td>
                        <td>
                            {{ Number(item.total).toLocaleString(
                                'sr-RS',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }}
                        </td>
                        <td>
                            <button @click="deleteItem(item)" type="button" class="btn btn-primary">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-3" v-for="item in items" :key="item.id">
                    <div class="card mt-2 item-borders">
                        <div class="card-body p-3">
                            <div class="mb-2">
                                <div class="fw-bold">{{ item.productName }}</div>
                                <div>Quantity: {{ item.quantity }}</div>
                                <div>
                                    Price: {{ Number(item.price).toLocaleString(
                                        'sr-RS',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })
                                    }}
                                </div>
                                <div>
                                    Total: {{ Number(item.total).toLocaleString(
                                        'sr-RS',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })
                                    }}
                                </div>
                                <button @click="deleteItem(item)" type="button" class="btn btn-primary">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useItemsStore } from '@/stores/items'
import { useInvoicesStore } from '@/stores/invoices';
import { useProductsStore } from '@/stores/products';

export default defineComponent({
    computed: {
        items: {
            get() {
                return { ...useItemsStore().itemsByInvoice };
            },
            set(value) {
                useItemsStore().itemsByInvoice = { ...value };
            }
        },
    },
    data() {
        return {
            isSmallScreen: window.innerWidth <= 768,
        };
    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.isSmallScreen = window.innerWidth <= 768;
        },
        async deleteItem(item) {
            useItemsStore().deleteItem(item);
            useInvoicesStore().reduceTotal(item)
            await useProductsStore().discardSale(item.productName, item.quantity)
        }
    },
})
</script>
