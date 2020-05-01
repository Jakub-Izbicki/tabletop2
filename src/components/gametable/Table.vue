<template>
  <div class="border-solid border-8">
    <transition-group name="grid" tag="div" class="grid text-vw">
      <div v-for="slot in gridSlots"
           :key="slot.id"
           class="h-gridCard w-gridCard bg-gridSlot"
           :style="[{'grid-column-start': `${slot.col}`},
                    {'grid-row-start': `${slot.row}`}]"
           @dragover.prevent
           @dragenter="onDragEnter(slot.id)"
           @drop.prevent>
        <div class="text-base">
          {{slot.id}}
        </div>
      </div>

      <div v-for="card in gridCards"
           :key="card.id"
           class="h-gridCard w-gridCard bg-cardPlaceholder rounded-lg"
           :style="[{'grid-column-start': `${card.col}`},
                    {'grid-row-start': `${card.row}`}]"
           draggable="true"
           @dragstart="onDragStart(card.id)">
        <div class="text-base">
          {{card.name}}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "Table",
    data() {
      return {
        gridCards: [
          {
            id: '1',
            col: '1',
            row: '1',
            name: 'name 1'
          },
          {
            id: '2',
            col: '2',
            row: '5',
            name: 'name 2'
          },
          {
            id: '3',
            col: '3',
            row: '1',
            name: 'name 3'
          },
        ],
        draggedCardId: null,
      }
    },
    computed: {
      gridSlots() {
        const cols = 15;
        const rows = 5;
        const slots = [];

        [...Array(cols).keys()].map(col => col + 1).forEach(col => {
          [...Array(rows).keys()].map(row => row + 1).forEach(row => {
            slots.push({
              id: `${col}-${row}`,
              col,
              row,
              occupied: false,
            })
          })
        });

        return slots;
      }
    },
    methods: {
      onDragStart(cardId) {
        this.draggedCardId = cardId;
      },
      onDragEnter(slotId) {
        console.log('drag enter');
        this.moveCardToSlot(this.draggedCardId, slotId);
      },
      moveCardToSlot(cardId, slotId) {
        const targetSlot = this.gridSlots.find(slot => slot.id === slotId);
        this.gridCards = this.gridCards.map(card => {
          if (card.id === cardId) {
            return {...card, col: targetSlot.col, row: targetSlot.row};
          }
          return card;
        })
      }
    }
  }
</script>

<style scoped>
  .grid-move {
    transition: all 0.1s;
  }
</style>
