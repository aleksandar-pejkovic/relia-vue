<template>
    <div class="container">
        <div class="container m-3">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Create new customer
            </button>

            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Enter details for new customer</h1>
                        </div>
                        <div class="modal-body">
                            <CreateCustomerForm @customerCreated="closeModalAndEmitEvent" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeBtn">Close</button>
                        </div>
                    </div>
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
            this.$refs.closeBtn.click()
            this.$emit('customerCreated')
        }
    }
}
</script>
