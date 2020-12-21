<template>
  <q-table
    title="Person"
    :data="items"
    :columns="columns"
    :filter="filter"
    row-key="id"
    class="shadow-1"
     v-bind="$attrs"
     v-on="$listeners"
  >
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
    <template v-slot:top>
      <q-input borderless dense v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-space />
      <q-btn
        round
        color="primary"
        icon="add"
        class="q-ml-md"
        @click="$emit('new-click')"
      />
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, PropOptions, ref } from '@vue/composition-api'
import { Identible } from 'src/types'

export default defineComponent({
  name: 'BaseTable',

  props: {
    items: {
      required: true
    } as PropOptions<Identible[]>,
    columns: {
      required: true
    } as PropOptions<[]>
  },

  setup () {
    const filter = ref('')

    return {
      filter
    }
  }
})
</script>
