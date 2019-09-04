<template>
    <div>
        <q-btn color="primary" label="Add Item" @click="createDiag"/>
        <q-dialog v-model="prompt" @hide="removeListener" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">Item Name</div>
                </q-card-section>

                <q-card-section>
                    <q-input dense v-model="name" autofocus @keyup.enter="prompt = false" />
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
            catchEnterKey(evt) {
                if (evt.which === 13 || evt.keyCode === 13) {
                    this.submit();
                    this.prompt = false;
                }
            },
            createDiag() {
                this.prompt = true;
                window.addEventListener('keyup', this.catchEnterKey);
            },
            removeListener() {
                window.removeEventListener('keyup', this.catchEnterKey);
            },
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
