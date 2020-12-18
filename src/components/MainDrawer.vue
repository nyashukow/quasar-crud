<template>
  <q-drawer
    :value="drawer"
    @input="onChange"
    show-if-above
    :width="200"
    :breakpoint="400"
  >
    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 191.6px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img
            src="https://pickaface.net/gallery/avatar/20130805_083256_2262_Fab.png"
          />
        </q-avatar>
        <div class="text-weight-bold">Anonymous</div>
        <div>@anonymous</div>
      </div>
    </q-img>

    <q-scroll-area class="navigation-list">
      <q-list padding>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section> Home </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/users">
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section> Users </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LayoutDrawer',

  model: {
    prop: 'drawer',
    event: 'change'
  },

  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },

  setup (props, { emit }) {
    const onChange = (e: boolean) => emit('change', e)

    return {
      onChange
    }
  }
})
</script>

<style lang="scss">
.navigation-list {
  height: calc(100% - 191.6px);
  margin-top: 191.6px;
  border-right: 1px solid #ddd;
}
</style>
