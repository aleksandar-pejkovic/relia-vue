<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th class="col-2">Proizvod</th>
                        <th class="col-2">Količina</th>
                        <th class="col-2">Cena bez PDV-a</th>
                        <th class="col-2">PDV</th>
                        <th class="col-2">Cena sa PDV-om</th>
                        <th class="col-2">Zbir</th>
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
                            <div v-if="removingItem" class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Brisanje stavke...</span>
                            </div>
                            <button v-else @click="deleteItem(item)" type="button" id="removeItemBtn"
                                class="btn btn-outline-danger">-</button>
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
                                <div class="fw-bold mt-2">{{ item.productName }}</div>
                                <div class="mt-2">Količina: {{ item.quantity }}</div>
                                <div class="mt-2">
                                    Cena: {{ Number(item.price).toLocaleString(
                                        'sr-RS',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })
                                    }}
                                </div>
                                <div class="mt-2">
                                    Zbir: {{ Number(item.total).toLocaleString(
                                        'sr-RS',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })
                                    }}
                                </div>
                                <div v-if="removingItem" class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Brisanje stavke...</span>
                                </div>
                                <button v-else @click="deleteItem(item)" type="button" id="removeItemBtn"
                                    class="btn btn-outline-danger mt-2">-</button>
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
            removingItem: false,
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
        deleteItem(item) {
            this.removingItem = true
            useItemsStore().deleteItem(item);
            useProductsStore().discardSale(item.productName, item.quantity)
            this.removingItem = false
        }
    },
})
</script>

<style scoped>
#removeItemBtn {
    width: 50px;
}
</style>
