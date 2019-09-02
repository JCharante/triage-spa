<template>
    <q-item>
        <q-item-section>
            <q-item-label>{{data.name}}</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
    export default {
        props: ['data'],
        name: 'Item',
    };
</script>

<style scoped>

</style>
