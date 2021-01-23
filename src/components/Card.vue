<template>
  <div class="app-card" :style="cardStyle">
    <q-card square>
      <q-responsive :ratio="4 / 3">
        <div
          class="q-hoverable cursor-pointer"
          v-ripple
          @click="$emit('click-on-image')"
        >
          <q-img class="bg-grey-6 full-height" />
          <span class="q-focus-helper" />
        </div>
      </q-responsive>
      <q-card-section> {{ card.name }} </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Card',

  props: {
    card: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    }
  },

  setup (props) {
    const cardStyle = computed(() => ({
      flexBasis: props.width
    }))

    return {
      cardStyle
    }
  }
})
</script>

<style lang="scss">
.app-card {
  padding: 8px;
  flex: 0 0 33.333%;
}
</style>
