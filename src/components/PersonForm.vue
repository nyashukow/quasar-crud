<template>
<q-card-section class="q-pt-none" v-if="person">
  <q-input v-model="person.name" label="Name" />
  <q-input v-model="person.username" label="Username" />
  <q-input v-model="person.email" label="Email" />
  <q-input v-model="person.phone" label="Phone" />
</q-card-section>
</template>

<script lang="ts">
import { defineComponent, PropOptions } from '@vue/composition-api'

import { Person } from 'src/types'

export default defineComponent({
  name: 'PersonForm',

  props: {
    person: {
      required: true
    } as PropOptions<Person>
  }
})
</script>
