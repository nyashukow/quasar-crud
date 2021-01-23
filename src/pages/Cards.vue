<template>
  <div class="row full-height">
    <div class="col-2 shadow-3 q-py-sm">
      <q-btn
        flat
        label="Добавить"
        color="primary"
        class="full-width no-border-radius"
        @click="onClickCreate"
      />
      <app-cards-filter />
    </div>
    <div class="col bg-grey-3" style="overflow: hidden">
      <q-scroll-area class="full-height">
        <app-cards
          :cards="cardService.records"
          :columns="details ? 4 : 5"
          @click:card="onClickCard"
        />
      </q-scroll-area>
    </div>
    <card-details
      v-model="details"
      :card="cardService.record"
      :create-mode="cardService.mode === 'create'"
      @save="onClickSave"
      @delete="onClickDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api"
import { CardService } from 'src/shared/CardService'

export default defineComponent({
  name: "CardsPage",

  components: {
    AppCardsFilter: () => import("components/CardsFilter.vue"),
    AppCards: () => import("components/Cards.vue"),
    CardDetails: () => import("components/CardDetails.vue"),
  },

  setup() {
    const details = ref(false)
    const cardService = CardService.useCardService()

    const onClickCreate = () => {
      cardService.createRecord()
      details.value = true
    }

    const onClickSave = () => {
      cardService.writeRecord()
    }

    const onClickCard = (id: string) => {
      cardService.selectById(id)
      details.value = true
    }

    const onClickDelete = async () => {
      await cardService.removeRecord()
      details.value = false
    }

    return {
      details,
      cardService,

      onClickCreate,
      onClickSave,
      onClickCard,
      onClickDelete
    }
  }
})
</script>

<style lang="scss">
.app-card-detail {
  height: 100%;
  width: 0;
  overflow: hidden;
  transition: width 0.2s;

  &--opened {
    width: 25%;
  }
}
</style>
