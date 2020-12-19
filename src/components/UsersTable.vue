<template>
  <div>
    <q-table
      title="Users"
      :data="users"
      :columns="columns"
      :filter="filter"
      row-key="id"
      class="shadow-1"
      @row-click="onRowClick"
    >
      <template v-slot:top>
        <q-input
          borderless
          dense
          v-model="filter"
          placeholder="Search"
        >
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
          @click="dialogOpen = true"
        />
      </template>
    </q-table>
    <q-dialog v-model="dialogOpen">
      <user-card
        :user="user"
        @click:save="save"
        @click:remove="remove"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

import UserCard from 'components/UserCard.vue'
import useCollection from '../hooks/useCollection'
import useRestService from '../hooks/useRestService'
import useCard from '../hooks/useCard'
import { User, DEFAULT_USER } from '../types'

const columnsArr = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left'
  },
  {
    name: 'username',
    label: 'Username',
    field: 'username',
    align: 'left'
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left'
  }
]

export default defineComponent({
  name: 'UserTable',

  components: {
    UserCard
  },

  setup () {
    const restService = useRestService<User>({
      baseUrl: 'https://jsonplaceholder.typicode.com',
      suffix: '/users'
    })
    const collection = useCollection({ restService })
    const card = useCard({ defaultDocument: DEFAULT_USER })

    const columns = ref(columnsArr)
    const filter = ref('')

    const dialogOpen = ref(false)

    const onRowClick = (e: MouseEvent, user: User) => {
      card.set(user)
      dialogOpen.value = true
    }
    watch(dialogOpen, (value) => {
      if (!value) {
        card.reset()
      }
    })
    card.onBeforeCreate(async (user: User) => {
      return await collection.pushDocument(user)
    })
    card.onBeforeUpdate(async (user: User) => {
      return await collection.replaceDocument(user)
    })
    card.onBeforeRemove(async (user: User) => {
      return await collection.removeDocument(user)
    })
    card.onBeforeRemove((user: User) => {
      dialogOpen.value = false
      return user
    })

    return {
      // data
      columns,
      filter,
      dialogOpen,
      user: card.document,
      users: collection.documents,
      // methods
      onRowClick,
      save: card.save,
      remove: card.remove
    }
  }
})
</script>
