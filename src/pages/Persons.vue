<template>
  <q-page padding>
    <base-table
      :items="persons"
      :columns="columns"
      @row-click="onRowClick"
      @new-click="dialogOpen = true"
    />
    <q-dialog v-model="dialogOpen">
      <base-card
        :showRemove="person && !!person.id"
        @click:save="save"
        @click:remove="remove"
      >
        <template v-slot:form>
          <person-form v-slot:form :person="person" />
        </template>
      </base-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { Notify } from 'quasar'

import BaseTable from 'components/BaseTable.vue'
import BaseCard from 'components/BaseCard.vue'
import PersonForm from 'components/PersonForm.vue'
import useRestService from 'src/hooks/useRestService'
import useCollection from 'src/hooks/useCollection'
import useCard from 'src/hooks/useCard'
import { Person, DEFAULT_PERSON } from 'src/types'

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
    BaseTable,
    BaseCard,
    PersonForm
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
