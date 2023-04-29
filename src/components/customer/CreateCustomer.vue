<template>
        <!-- Modal -->
        <div class="modal fade" id="createCustomerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Create Customer</h1>
                    </div>
                    <div class="modal-body">
                        <CreateCustomerForm @customer-created="closeModalAndEmitEvent" />
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import CreateCustomerForm from '../customer/CreateCustomerForm.vue'

export default {
    components: {
        CreateCustomerForm
    },
    methods: {
        closeModalAndEmitEvent() {
            this.$emit('customer-created')
        }
    },
    emits: ['customer-created']
}
</script>
