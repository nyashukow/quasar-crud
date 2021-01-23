<template>
  <div class="app-card-detail column" :class="{ 'app-card-detail--opened': value }">
    <q-toolbar>
      <q-toolbar-title> Title </q-toolbar-title>
      <q-space />
      <q-btn flat round icon="close" @click="$emit('input', false)" />
    </q-toolbar>
    <q-tabs dense v-model="tab" active-color="primary">
      <q-tab no-caps name="main">Основные</q-tab>
      <q-tab no-caps name="graphic">Графика</q-tab>
    </q-tabs>
    <div style="flex: 1">
    <q-tab-panels v-model="tab">
      <q-tab-panel name="main">
        <q-input label="Название" v-model="card.name" />
      </q-tab-panel>
      <q-tab-panel name="graphic" class="q-pa-none">
        <q-responsive :ratio="4/3">
          <q-img class="full-height bg-grey-4" />
        </q-responsive>
      </q-tab-panel>
    </q-tab-panels>
    </div>
    <q-toolbar class="q-pa-none">
      <q-btn v-if="!createMode" flat class="bg-red text-white no-border-radius col" label="Удалить" @click="$emit('delete')">
        <q-icon name="delete" class="q-pl-sm" />
      </q-btn>
      <q-space />
      <q-btn flat class="bg-primary text-white no-border-radius col" label="Сохранить" @click="$emit('save')">
        <q-icon name="save" class="q-pl-sm" />
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Card } from 'src/types/models'

export default defineComponent({
  name: 'CardDetails',

  props: {
    value: {
      type: Boolean,
      required: true
    },
    card: {
      default: () => new Card()
    },
    createMode: {
      type: Boolean,
      required: true
    }
  },

  setup () {
    const tab = ref('main')

    return {
      tab,

      close
    }
  }
})
</script>

<style lang="scss">
</style>
