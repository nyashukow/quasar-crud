<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section>
      <div class="text-h6">User card</div>
    </q-card-section>

    <q-card-section class="q-pt-none" v-if="user">
      <q-input v-model="user.name" label="Name" />
      <q-input v-model="user.username" label="Username" />
      <q-input v-model="user.email" label="Email" />
      <q-input v-model="user.phone" label="Phone" />
    </q-card-section>

    <q-card-actions>
      <q-btn v-if="user && user.id" flat label="Remove" @click="$emit('click:remove')" />
      <q-space />
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Save" color="primary" @click="$emit('click:save')" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropOptions } from '@vue/composition-api'

import { User } from 'types/models'

export default defineComponent({
  name: 'UserCard',

  props: {
    user: {
      required: true
    } as PropOptions<User>
  }
})
</script>
