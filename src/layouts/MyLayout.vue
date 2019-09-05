<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Triage
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable to="/">
          <q-item-section>
            <q-item-label>Docs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/about">
          <q-item-section>
            <q-item-label>About</q-item-label>
            <q-item-label caption>How Triage was built</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
    import { openURL } from 'quasar';

    export default {
        name: 'MyLayout',
        data() {
            return {
                leftDrawerOpen: false,
            };
        },
        methods: {
            openURL,
        },
    };
</script>

<style>
</style>
