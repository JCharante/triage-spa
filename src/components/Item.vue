<template>
    <q-item>
        <q-item-section>
            <q-item-label>
                {{name}}
                <q-popup-edit v-model="name" title="Edit the Name">
                    <q-input v-model="name" dense autofocus counter />
                </q-popup-edit>
            </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        props: ['id'],
        name: 'Item',
        methods: {
            ...mapActions([
                'setItemPropertiesById',
            ]),
        },
        computed: {
            ...mapGetters([
                'getItemById',
            ]),
            name: {
                get() {
                    return this.getItemById(this.id).name;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.id,
                        name: newVal,
                    });
                },
            },
        },
    };
</script>

<style scoped>

</style>
