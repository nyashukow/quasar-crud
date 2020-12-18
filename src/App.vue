<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import Axios from 'axios'

export default defineComponent({
  name: 'App',
  setup () {
    provide('axios', Axios.create())
  }
})
</script>
