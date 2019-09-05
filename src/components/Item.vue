<template>
    <q-item>
        <q-item-section>
            <q-item-label>
                {{name}}
                <q-popup-edit v-model="name" title="Edit the Name">
                    <q-input v-model="name" dense autofocus counter :maxlength="150"/>
                </q-popup-edit>
            </q-item-label>
        </q-item-section>
        <q-item-section>
            {{recommendedDeadline}}
            <q-popup-edit v-model="recommendedDeadline" title="Edit the recommended deadline">
                <q-input filled v-model="recommendedDeadline" mask="date" :rules="['date']">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="recommendedDeadline" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-popup-edit>
        </q-item-section>
        <q-item-section>
            {{hardDeadline}}
            <q-popup-edit v-model="hardDeadline" title="Edit the hard deadline">
                <q-input filled v-model="hardDeadline" mask="date" :rules="['date']">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="hardDeadline" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-popup-edit>
        </q-item-section>
    </q-item>
</template>

<style scoped>

</style>

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
            recommendedDeadline: {
                get() {
                    return this.getItemById(this.id).recommendedDeadline;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.id,
                        recommendedDeadline: newVal,
                    });
                },
            },
            hardDeadline: {
                get() {
                    return this.getItemById(this.id).hardDeadline;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.id,
                        hardDeadline: newVal,
                    });
                },
            },
        },
    };
</script>
