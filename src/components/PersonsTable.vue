<template>
  <div>
    <q-table
      title="Person"
      :data="persons"
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
      <person-card
        :person="person"
        @click:save="save"
        @click:remove="remove"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { Notify } from 'quasar'

import PersonCard from 'components/PersonCard.vue'
import useCollection from '../hooks/useCollection'
import useRestService from '../hooks/useRestService'
import useCard from '../hooks/useCard'
import { Person, DEFAULT_PERSON } from '../types'

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
  name: 'PersonsTable',

  components: {
    PersonCard
  },

  setup () {
    const restService = useRestService<Person>({
      baseUrl: 'https://jsonplaceholder.typicode.com',
      endpoint: '/users'
    })
    const collection = useCollection({ restService })
    const card = useCard({ defaultDocument: DEFAULT_PERSON })

    const columns = ref(columnsArr)
    const filter = ref('')

    const dialogOpen = ref(false)

    const onRowClick = (e: MouseEvent, person: Person) => {
      card.set(person)
      dialogOpen.value = true
    }
    watch(dialogOpen, (value) => {
      if (!value) {
        card.reset()
      }
    })
    card.onBeforeCreate((person) => {
      return collection.pushDocument(person)
    })
    card.onBeforeUpdate((person) => {
      return collection.replaceDocument(person)
    })
    card.onBeforeRemove((person) => {
      return collection.removeDocument(person)
    })
    card.onBeforeRemove((person) => {
      dialogOpen.value = false
      return person
    })

    const save = () => card.save()
      .catch((err: Error) => {
        Notify.create({
          type: 'error',
          position: 'top-right',
          message: err.message
        })
      })

    const remove = () => card.remove()
      .catch((err: Error) => {
        Notify.create({
          type: 'error',
          position: 'top-right',
          message: err.message
        })
      })

    return {
      // data
      columns,
      filter,
      dialogOpen,
      person: card.document,
      persons: collection.documents,
      // methods
      onRowClick,
      save,
      remove
    }
  }
})
</script>
