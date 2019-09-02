<template>
    <q-list bordered>
        <q-item-label header>Items</q-item-label>
        <Item v-for="k in getItems" :key="k.id" :data="k"/>
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
