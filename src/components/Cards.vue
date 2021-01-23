<template>
  <div class="flex row q-pa-md" style="flex-wrap: wrap; margin: -8px -8px">
    <app-card
      :width="cardWidth"
      v-for="card in cards"
      :key="card._id"
      :card="card"
      @click-on-image="$emit('click:card', card._id)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropOptions } from '@vue/composition-api'
import { Card } from 'src/types/models'

export default defineComponent({
  name: 'Cards',

  components: {
    AppCard: () => import('components/Card.vue')
  },

  props: {
    columns: {
      type: Number,
      default: 1
    },
    cards: {
      default: () => new Array<Card>()
    }
  },

  setup (props) {
    const cardWidth = computed(() => 100 / props.columns + '%')
    
    return {
      cardWidth
    }
  }
})
</script>

<style lang="scss">
</style>
