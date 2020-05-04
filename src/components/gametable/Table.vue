<template>
  <div class="flex flex-col border">
    <transition-group name="grid" tag="div" class="grid text-vw m-gameTableGrid">
      <GridSlot v-for="slot in gridSlots"
                :key="slot.id"
                :grid-slot="slot">
      </GridSlot>

      <div v-for="card in gridCards"
           :key="card.id"
           class="flex items-center justify-center"
           :style="[{'grid-column-start': `${card.col}`},
                    {'grid-row-start': `${card.row}`}]">
        <div class=" absolute h-gridCard w-gridCard bg-cardPlaceholder rounded-lg"
             :class="[{'pointer-events-none': isTableCardDrag && draggedCardId !== card.id}]"
             draggable="true"
             @dragstart="onDragStart(card.id)"
             @dragend.prevent="onDragEnd">
          <div class="text-base">
            {{card.name}}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import {mapGetters, createNamespacedHelpers} from "vuex";
  import GridSlot from "./GridSlot";

  export default {
    name: "Table",
    components: {GridSlot},
    data() {
      return {
        dragHoveredSlotId: null,
      }
    },
    computed: {
      ...mapGetters(['isTableCardDrag']),
      ...createNamespacedHelpers('gameTable').mapState({
        gridCards: state => state.gridCards,
      }),
      ...createNamespacedHelpers('gameTable').mapGetters([
        'cols', 'rows', 'gridSlots', 'draggedCardId',
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
    methods: {
      onDragStart(cardId) {
        // {'transform translate-x-dragHide': isTableCardDrag && draggedCardId === card.id}
        this.$store.dispatch('gameTable/setDraggedCardId', {cardId});
        this.$store.dispatch('setTableCardDrag');
      },
      onDragEnd() {
        this.$store.dispatch('resetDrag');
      },
    }
  }
</script>

<style scoped>
  .grid-move {
    transition: all 0.1s;
  }
</style>
