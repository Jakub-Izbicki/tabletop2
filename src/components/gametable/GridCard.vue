<template>
  <div class="flex items-center justify-center"
       :class="[{'transform translate-y-gridTranslateBottom': isBottom},
                {'transform translate-y-gridTranslateTop': isTop},
                {'transform translate-x-gridTranslateLeft': isLeft},
                {'transform translate-x-gridTranslateRight': isRight},
                {'pointer-events-none': isCardDrag && draggedCardId === card.id}]"
       :style="[{'grid-column-start': `${card.col}`},
                {'grid-row-start': `${card.row}`}]">

    <Moveable class="moveable absolute h-gridCard w-gridCard bg-cardPlaceholder rounded-card"
              :class="{'pointer-events-none': isCardDrag}"
              ref="moveable"
              v-bind="moveable"
              @dragStart="onDragStart"
              @drag="handleDrag"
              @dragEnd="onDragEnd">
      <div class="text-base">
        {{card.name}}
      </div>
    </Moveable>
  </div>
</template>

<script>
  import {mapGetters, createNamespacedHelpers} from "vuex";
  import Moveable from 'vue-moveable';

  export default {
    name: "GridCard",
    components: {Moveable},
    props: ['cardId'],
    data() {
      return {
        moveable: {
          draggable: true,
          throttleDrag: 0,
          renderDirections: [],
        }
      }
    },
    beforeDestroy() {
      this.$store.dispatch('resetDrag');
    },
    computed: {
      ...mapGetters(['isCardDrag']),
      ...createNamespacedHelpers('grid').mapGetters([
        'cols', 'rows', 'draggedCardId', 'gridCards',
      ]),
      card() {
        return this.gridCards.find(card => card.id === this.cardId);
      },
      isBottom() {
        return this.card.row === this.rows;
      },
      isTop() {
        return this.card.row === 1;
      },
      isLeft() {
        return this.card.col === 1;
      },
      isRight() {
        return this.card.col === this.cols;
      },
    },
    methods: {
      handleDrag({target, transform}) {
        target.style.transform = transform;
      },
      onDragStart() {
        this.$store.dispatch('grid/setDraggedCardId', {
          cardId: this.card.id
        });
        this.$store.dispatch('setGridCardDrag');
      },
      onDragEnd({target}) {
        target.style.transform = null;
        this.$store.dispatch('resetDrag');
      },
    }
  }
</script>

<style scoped>
</style>
