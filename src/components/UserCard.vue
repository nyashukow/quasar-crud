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
      <q-btn v-if="user && user.id" flat label="Remove" @click="remove" />
      <q-space />
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Save" color="primary" @click="save" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'

import useRestService from '../hooks/useRestService'
import { User } from 'types/models'

export default defineComponent({
  name: 'UserCard',

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  setup ({ id }, { emit }) {
    const {
      fetchDocumentById,
      createDocument,
      updateDocument,
      removeDocument
    } = useRestService<User>({ baseUrl: 'https://jsonplaceholder.typicode.com', suffix: '/users' })

    const DEFAULT_USER: Readonly<User> = {
      name: '',
      email: '',
      username: '',
      phone: ''
    }
    const user = ref<User | undefined>(undefined)

    onBeforeMount(async () => {
      user.value = id !== -1 ? await fetchDocumentById(id) : { ...DEFAULT_USER }
    })

    const save = async () => {
      if (!user.value) {
        throw new Error('user not defined')
      }
      let newUser: User
      if (user.value.id) {
        newUser = await updateDocument(user.value)
        user.value = newUser
        emit('user:updated', newUser)
      } else {
        newUser = await createDocument(user.value)
        user.value = newUser
        emit('user:created', newUser)
      }
    }

    const remove = async () => {
      if (!user.value) {
        throw new Error('user not defined')
      }
      const removedUser = await removeDocument(user.value)
      emit('user:removed', removedUser)
    }

    return {
      user,
      save,
      remove
    }
  }
})
</script>
