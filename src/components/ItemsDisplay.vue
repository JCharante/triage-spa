<template>
    <q-list bordered>
        <q-item>
            <q-item-section>
                <q-item-label>
                    Task
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    Hard Deadline
                </q-item-label>
            </q-item-section>
        </q-item>
        <Item v-for="key in Object.keys(this.getItems)" :key="key" :id="key"/>
    </q-list>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Item from './Item';

    export default {
        name: 'ItemsDisplay',
        components: { Item },
        computed: {
            ...mapGetters([
                'getItems',
            ]),
        },
    };
</script>

<style scoped>
</style>
