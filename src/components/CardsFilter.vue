<template>
  <div class="q-pa-sm">
    <q-input
      dense
      class="q-mb-sm"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-select
      dense
      class="q-my-xs"
      label="Теги"
      use-input
      use-chips
      multiple
      :input-debounce="0"
      v-model="model"
      :options="filterOptions"
      @filter="filterFn"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'CardsFilter',

  setup () {
    const options = ['Танки', 'Самолеты', 'Лодки']

    const filterOptions = ref<string[]>([])
    return {
      model: [],
      filterOptions,
      filterFn (val: string, update: Function) {
        update(() => {
          if (val === '') {
            filterOptions.value = options
          }
          else {
            const needle = val.toLowerCase()
            filterOptions.value = options.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            )
          }
        })
      }
    }
  }
})
</script>

<style lang="scss">
</style>
