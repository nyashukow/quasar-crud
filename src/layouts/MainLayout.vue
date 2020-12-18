<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>

      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Quasar example</div>
        <div class="text-subtitle1">
          {{ today }}
        </div>
      </div>

      <q-img src="images/mountains.png" class="header-image absolute-top" />
    </q-header>

    <main-drawer v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { date } from 'quasar'
import MainDrawer from 'components/MainDrawer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: { MainDrawer },

  setup () {
    const leftDrawerOpen = ref(false)

    const today = computed(() => {
      return date.formatDate(Date.now(), 'dddd D MMMM')
    })

    return { leftDrawerOpen, today }
  }
})
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.4;
}
</style>
