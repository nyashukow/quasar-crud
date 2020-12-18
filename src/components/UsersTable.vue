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
          @click="onNewClick"
        />
      </template>
    </q-table>
    <q-dialog v-model="dialogOpen">
      <user-card
        :id="selectedUser"
        :key="selectedUser"
        @user:created="onUserCreated"
        @user:updated="onUserUpdated"
        @user:removed="onUserRemoved"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import { User } from 'types/models'
import UserCard from 'components/UserCard.vue'
import useUserService from '../hooks/useUserService'
import { NEW_USER_ID } from 'types/constants'

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
    const { fetchUsers } = useUserService()
    const users = ref<User[]>([])

    onBeforeMount(async () => {
      users.value = await fetchUsers()
    })

    const columns = ref(columnsArr)
    const filter = ref('')

    const selectedUser = ref(NEW_USER_ID)
    const dialogOpen = ref(false)

    const onRowClick = (e: MouseEvent, user: User) => {
      selectedUser.value = user.id || NEW_USER_ID
      dialogOpen.value = true
    }
    const onNewClick = () => {
      selectedUser.value = NEW_USER_ID
      dialogOpen.value = true
    }
    const onUserCreated = (user: User) => {
      users.value = users.value.concat(user)
    }
    const onUserUpdated = (user: User) => {
      users.value = users.value.map(u => u.id === user.id ? user : u)
    }
    const onUserRemoved = (user: User) => {
      users.value = users.value.filter(u => u.id !== user.id)
      dialogOpen.value = false
    }

    return {
      columns,
      filter,
      dialogOpen,
      selectedUser,
      users,
      onRowClick,
      onNewClick,
      onUserCreated,
      onUserUpdated,
      onUserRemoved
    }
  }
})
</script>
