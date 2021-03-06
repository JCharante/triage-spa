<template>
    <!--
    Our application must display: CSS styling of the primary visual elements in the application
    The list of tasks is an important part of the application, and here we are dynamically determining what
    classes to apply to the item, depending on the status of the item, in order to color the background.
    -->
    <q-item :class="{'bg-green-3': status === 'Done', 'bg-lime-3': status === 'In Progress'}">
        <q-item-section>
            <q-item-label class="text-label">
                {{name}}
                <q-popup-edit buttons v-model="name" title="Edit the Name">
                    <q-input v-model="name" dense autofocus counter :maxlength="150"/>
                </q-popup-edit>
            </q-item-label>
        </q-item-section>
        <q-item-section>
            <q-item-label class="text-label">
                {{tags}}
                <q-popup-edit buttons v-model="tags" title="Edit the tags for this item,seperated by commas" @save="tagsSave">
                    <q-input v-model="tags" dense autofocus counter :maxlength="150"/>
                </q-popup-edit>
            </q-item-label>
        </q-item-section>
        <q-item-section>
            {{recommendedDeadline}} {{timeBeforeRecommended}} <!-- TODO: softer text -->
            <q-popup-edit buttons v-model="recommendedDeadline" title="Edit the recommended deadline">
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
            <q-popup-edit buttons v-model="hardDeadline" title="Edit the hard deadline">
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
        <q-item-section>
            {{ priorityPoints }}
        </q-item-section>
        <q-item-section>
            <q-select dense class="col" v-model="difficulty" :options="['', 'Easy', 'Medium', 'Hard']"/>
        </q-item-section>
        <q-item-section>
            <q-select dense class="col" v-model="importance" :options="['', 'Low', 'Medium', 'High', 'Mission Critical']"/>
        </q-item-section>
        <q-item-section>
            <q-select dense class="col" v-model="status" :options="[`Not Started`, 'In Progress', 'Done', 'Delete']"/>
        </q-item-section>
        <q-dialog v-model="showDeletePrompt" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="primary" text-color="white" />
                    <span class="q-ml-sm">This will delete this item.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Yes, Delete." color="primary" v-close-popup @click="deleteItemById({ id: id })"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-item>
</template>

<style scoped>
    /*
    This is demonstrating the usage of class selectors.
    The purpose of this selector is to ensure a minimum height on the div that displays text.
    This is because if we don't, then if it's empty then it will have a min-height of 0, so that it won't render.
    Unfortunately, this means that you can no longer click to create a popup that will allow you to edit the value.
     */
    .text-label {
        min-height: 1.2em;
    }

    /*
    div.q-item:hover {
        border: black 1px solid;
    }
     */

    .q-item div:hover {
        font-weight: bolder;
    }
</style>

<script>
    import { colors } from 'quasar';
    import { mapGetters, mapActions } from 'vuex';
    import { calculateDaysUntilRecommendedDeadline } from '../store/items/getters';

    export default {
        props: ['id'],
        name: 'Item',
        data() {
            return {
                showDeletePrompt: false,
            };
        },
        methods: {
            ...mapActions([
                'setItemPropertiesById',
                'deleteItemById',
            ]),
            tagsSave(v, i) {
                console.log(`newVal ${v}`);
                console.log(`iVal ${i}`);
            },
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
            tags: {
                get() {
                    return this.getItemById(this.id).tags;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.id,
                        tags: newVal,
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
            status: {
                get() {
                    return this.getItemById(this.id).status;
                },
                set(newVal) {
                    if (newVal !== 'Delete') {
                        return this.setItemPropertiesById({
                            id: this.id,
                            status: newVal,
                        });
                    }
                    this.showDeletePrompt = true;
                    return new Promise((resolve, reject) => resolve());
                },
            },
            difficulty: {
                get() {
                    return this.getItemById(this.id).difficulty;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.id,
                        difficulty: newVal,
                    });
                },
            },
            priorityPoints: {
                get() {
                    return this.getItemById(this.id).priorityPoints;
                },
            },
            importance: {
                get() {
                    return this.getItemById(this.id).importance;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.id,
                        importance: newVal,
                    });
                },
            },
            timeBeforeRecommended() {
                if (this.recommendedDeadline.length > 0) {
                    const diff = calculateDaysUntilRecommendedDeadline(this);

                    if (diff === 0) {
                        return `(Today! 💪)`;
                    } else if (diff === 1) {
                        return `(Tomorrow 😩)`;
                    } else if (diff > 5) {
                        return `(${diff} days left 🏖️)`;
                    } else if (diff > 0) {
                        return `(${diff} days left)`;
                    } else if (diff === -1) {
                        return `(Yesterday 🤦)`;
                    } else {
                        return `(${diff * -1} days ago!!)`;
                    }
                } else {
                    return ``;
                }
            },
        },
    };
</script>
