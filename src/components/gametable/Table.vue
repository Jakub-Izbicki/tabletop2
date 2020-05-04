<template>
  <div class="flex flex-col border">
    <div class="grid text-vw m-gameTableGrid">
      <GridSlot v-for="slot in gridSlots"
                :key="slot.id"
                :grid-slot="slot">
      </GridSlot>

      <GridCard v-for="card in gridCards"
                :key="card.id"
                :card="card">
      </GridCard>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import GridSlot from "./GridSlot";
  import GridCard from "./GridCard";

  export default {
    name: "Table",
    components: {GridCard, GridSlot},
    data() {
      return {
        dragHoveredSlotId: null,
      }
    },
    computed: {
      ...createNamespacedHelpers('gameTable').mapState({
        gridCards: state => state.gridCards,
      }),
      ...createNamespacedHelpers('gameTable').mapGetters([
        'cols', 'rows', 'gridSlots',
      ]),
    },
    created() {
      const slots = [];

      [...Array(this.cols).keys()].map(col => col + 1).forEach(col => {
        [...Array(this.rows).keys()].map(row => row + 1).forEach(row => {
          slots.push({
            id: `${col}-${row}`,
            col,
            row,
            occupied: false,
          })
        })
      });

      this.$store.dispatch('gameTable/setupGridSlots', {slots});
    },
  }
</script>

<style scoped>
</style>
