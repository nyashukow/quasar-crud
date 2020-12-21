<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section>
      <div class="text-h6">User card</div>
    </q-card-section>

    <slot name="form" />

    <q-card-actions>
      <q-btn v-if="$props.showRemove" flat label="Remove" @click="$emit('click:remove')" />
      <q-space />
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Save" color="primary" @click="$emit('click:save')" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseCard',

  props: {
    showRemove: {
      type: Boolean,
      default: false
    }
  }
})
</script>
