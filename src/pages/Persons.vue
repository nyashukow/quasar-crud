<template>
  <q-page padding>
    <persons-table />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PersonsTable from 'components/PersonsTable.vue'

export default defineComponent({
  name: 'PageIndex',

  components: { PersonsTable }
})
</script>
