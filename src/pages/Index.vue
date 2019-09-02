<template>
    <q-page>
        <items-display/>
        <items-adder/>
    </q-page>
</template>

<style scoped>
</style>

<script>
    import ItemsDisplay from '../components/ItemsDisplay';
    import ItemsAdder from '../components/items-adder';

    export default {
        name: 'PageIndex',
        components: { ItemsAdder, ItemsDisplay },
    };
</script>
