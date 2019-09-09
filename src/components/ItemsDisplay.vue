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
                    Tags
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    Recommended Deadline
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    Hard Deadline
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    Priority Points
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    Difficulty
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    Importance
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label class="text-center">
                    【=◈︿◈=】
                </q-item-label>
            </q-item-section>
        </q-item>
        <Item v-for="value in this.getItemsSorted" :key="value.id" :id="value.id"/>
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
                'getItemsSorted',
            ]),
        },
    };
</script>

<style scoped>
</style>
