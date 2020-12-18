<template>
  <q-page padding>
    <users-table />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UsersTable from 'components/UsersTable.vue'

export default defineComponent({
  name: 'PageIndex',

  components: { UsersTable }
})
</script>
