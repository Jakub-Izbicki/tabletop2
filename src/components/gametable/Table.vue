<template>
  <div>
    <transition-group name="grid" tag="div" class="grid text-vw">
      <div v-for="slot in gridSlots"
           :key="slot.id"
           class="flex items-center justify-center
                  h-gridSlot w-full border-solid border-2 rounded-lg"
           :style="[{'grid-column-start': `${slot.col}`},
                    {'grid-row-start': `${slot.row}`}]"
           @dragover.prevent
           @dragenter="onDragEnter(slot.id)"
           @dragleave="onDragLeave"
           @drop.prevent="onDrop(slot.id)">
<!--        <div ref=""-->
<!--             class="absolute pointer-events-none h-gridCard w-gridCard bg-cardPrompt rounded-lg">-->
<!--        </div>-->
      </div>

      <div v-for="card in gridCards"
           :key="card.id"
           class="flex items-center justify-center"
           :style="[{'grid-column-start': `${card.col}`},
                    {'grid-row-start': `${card.row}`}]">
        <div class=" absolute h-gridCard w-gridCard bg-cardPlaceholder rounded-lg"
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
  import {mapGetters} from 'vuex';
  import {createNamespacedHelpers} from "vuex";

  export default {
    name: "Table",
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
        this.$store.dispatch('gameTable/setDraggedCard', {cardId});
        this.$store.dispatch('setTableCardDrag');
      },
      onDragEnd() {
        this.$store.dispatch('resetDrag');
      },
      onDragEnter(slotId) {
        this.dragHoveredSlotId = slotId;
      },
      onDragLeave() {
        this.dragHoveredSlotId = null;
      },
      onDrop(slotId) {
        this.$store.dispatch('gameTable/moveCardToSlot', {
          cardId: this.draggedCardId,
          slotId,
        });
      },
      isDragHovered(slotId) {
        return this.dragHoveredSlotId === slotId;
      }
    }
  }
</script>

<style scoped>
  .grid-move {
    transition: all 0.1s;
  }
</style>
