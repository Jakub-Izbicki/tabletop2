<template>
  <div class="text-vw">
    <div class="flex flex-col">
      <div class="grid border"
           :style="{'grid-template-columns': `5em repeat(${cols - 2}, minmax(0, 1fr)) 5em`}">
        <GridSlot v-for="slot in gridSlots"
                  :key="slot.id"
                  :grid-slot="slot">
        </GridSlot>
        <GridCard v-for="card in gridCards"
                  :key="card.id"
                  :cardId="card.id">
        </GridCard>
      </div>
    </div>
    <div class="flex">
      <Hand></Hand>
      <Library></Library>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import GridSlot from "./grid/GridSlot";
  import GridCard from "./grid/GridCard";
  import Hand from "./hand/Hand";
  import Library from "./library/Library";

  export default {
    name: "Table",
    components: {Library, Hand, GridCard, GridSlot},
    computed: {
      ...createNamespacedHelpers('grid').mapGetters([
        'cols', 'rows', 'gridSlots', 'gridCards',
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

      this.$store.dispatch('grid/setGridSlots', {slots});
    },
  }
</script>

<style scoped>
</style>
