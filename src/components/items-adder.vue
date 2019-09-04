<template>
    <div>
        <q-btn color="primary" label="Add Item" @click="prompt = true"/>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">Item Name</div>
                </q-card-section>

                <q-card-section>
                    <q-input dense v-model="name" autofocus @keyup.enter="submit(), prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Add item" v-close-popup @click="submit"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    export default {
        name: 'items-adder',
        data() {
            return {
                prompt: false,
                name: '',
            };
        },
        methods: {
            submit() {
                this.$store.dispatch('createItem', this.name).then(() => {
                    this.name = '';
                });
            },
        },
    };
</script>

<style scoped>

</style>
