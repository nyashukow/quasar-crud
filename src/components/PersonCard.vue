<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section>
      <div class="text-h6">User card</div>
    </q-card-section>

    <q-card-section class="q-pt-none" v-if="person">
      <q-input v-model="person.name" label="Name" />
      <q-input v-model="person.username" label="Username" />
      <q-input v-model="person.email" label="Email" />
      <q-input v-model="person.phone" label="Phone" />
    </q-card-section>

    <q-card-actions>
      <q-btn v-if="person && person.id" flat label="Remove" @click="$emit('click:remove')" />
      <q-space />
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Save" color="primary" @click="$emit('click:save')" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropOptions } from '@vue/composition-api'

import { Person } from 'src/types'

export default defineComponent({
  name: 'UserCard',

  props: {
    person: {
      required: true
    } as PropOptions<Person>
  }
})
</script>
