<template>
  <div class="flex items-center justify-center h-gridSlot"
       :class="{'h-gridSlotEdge': isHorizontalBorder}"
       :style="[{'grid-column-start': `${gridSlot.col}`},
                {'grid-row-start': `${gridSlot.row}`}]"
       @mouseover="onDragOver"
       @mouseup="onDrop"
       @mouseleave="onDragLeave">
    <div v-show="isCardPromptVisible"
         class="absolute pointer-events-none h-gridCard w-gridCard bg-cardPrompt rounded-lg"
         :class="[{'transform translate-y-gridTranslateBottom': isBottom},
                  {'transform translate-y-gridTranslateTop': isTop},
                  {'transform translate-x-gridTranslateLeft': isLeft},
                  {'transform translate-x-gridTranslateRight': isRight}]">
      {{gridSlot.id}}
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  export default {
    name: "GridSlot",
    props: ['gridSlot'],
    data() {
      return {
        isCardPromptVisible: false,
      }
    },
    computed: {
      ...createNamespacedHelpers('game').mapGetters([
        'isCardDrag',
        'isGridCardDrag',
        'isHandCardDrag',
        'isLibraryCardDrag',
        'draggedCardId',
      ]),
      ...createNamespacedHelpers('grid').mapGetters([
        'cols', 'rows',
      ]),
      isHorizontalBorder() {
        return this.gridSlot.row === 1 || this.gridSlot.row === this.rows;
      },
      isBottom() {
        return this.gridSlot.row === this.rows;
      },
      isTop() {
        return this.gridSlot.row === 1;
      },
      isLeft() {
        return this.gridSlot.col === 1;
      },
      isRight() {
        return this.gridSlot.col === this.cols;
      },
    },
    methods: {
      onDragOver() {
        if (this.isCardDrag && !this.isCardPromptVisible) {
          this.isCardPromptVisible = true;
        }
      },
      onDrop() {
        if (this.isCardPromptVisible) {
          this.isCardPromptVisible = false;
        }

        if (this.isGridCardDrag) {
          this.$store.dispatch('game/resetDrag');
          this.$store.dispatch('grid/moveCardToSlot', {
            slotId: this.gridSlot.id,
            cardId: this.draggedCardId,
          });
        } else if (this.isHandCardDrag) {
          this.$store.dispatch('game/resetDrag');
          this.$store.dispatch('grid/addCardToGridFromHand', {
            col: this.gridSlot.col,
            row: this.gridSlot.row,
          });
        } else if (this.isLibraryCardDrag) {
          this.$store.dispatch('game/resetDrag');
          this.$store.dispatch('grid/addCardToGridFromLibrary', {
            col: this.gridSlot.col,
            row: this.gridSlot.row,
          });
        }
      },
      onDragLeave() {
        if (this.isCardPromptVisible) {
          this.isCardPromptVisible = false;
        }
      },
    }
  }
</script>

<style scoped>

</style>
