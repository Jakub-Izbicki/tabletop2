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
              :style="{'transform': card.transform}"
              ref="moveable"
              v-bind="moveable"
              @dragStart="onDragStart"
              @drag="onDrag"
              @dragEnd="onDragEnd">
      <div class="text-base">
        {{card.name}}
      </div>
    </Moveable>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import Moveable from 'vue-moveable';
  import throttle from 'lodash.throttle'
  import viewport from 'get-viewport-size';

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
        },
        throttledMoveCard: null,
      }
    },
    created() {
      const moveCard = (cardId, transform) => {
        if (!this.isCardDrag) {
          return;
        }

        // eslint-disable-next-line no-unused-vars
        const [both, left, top] = /(-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px/g.exec(transform);
        const vw = viewport().width;
        const leftVwPercentage = (left / vw) * 100;
        const topVwPercentage = (top / vw) * 100;

        const vwTransform = transform.replace(/translate(.*)/g,
            `translate(${leftVwPercentage}vw, ${topVwPercentage}vw)`);

        this.$store.dispatch('grid/moveCard',
            {cardId, transform: vwTransform})
      };

      this.throttledMoveCard = throttle(moveCard, 33);
    },
    beforeDestroy() {
      this.$store.dispatch('game/resetDrag');
    },
    computed: {
      ...createNamespacedHelpers('game').mapGetters([
        'isCardDrag',
        'draggedCardId',
      ]),
      ...createNamespacedHelpers('grid').mapGetters([
        'cols', 'rows', 'gridCards',
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
      onDragStart() {
        this.$store.dispatch('game/setDraggedCardId', {
          cardId: this.card.id
        });
        this.$store.dispatch('game/setGridCardDrag');
      },
      onDrag({target, transform}) {
        target.style.transform = transform;
        this.throttledMoveCard(this.cardId, transform);
      },
      onDragEnd({target}) {
        target.style.transform = null;
        this.$store.dispatch('game/resetDrag');
      },
    }
  }
</script>

<style scoped>
</style>
