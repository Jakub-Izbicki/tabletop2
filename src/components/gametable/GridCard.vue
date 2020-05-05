<template>
  <div class="flex items-center justify-center"
       :class="[{'transform scale-0 duration-1': isDragHide},
                {'transform translate-y-gridTranslateBottom': isBottom},
                {'transform translate-y-gridTranslateTop': isTop},
                {'transform translate-x-gridTranslateLeft': isLeft},
                {'transform translate-x-gridTranslateRight': isRight}]"
       :style="[{'grid-column-start': `${card.col}`},
                {'grid-row-start': `${card.row}`}]">
    <div class=" absolute h-gridCard w-gridCard bg-cardPlaceholder rounded-lg"
         :class="{'pointer-events-none': isTableCardDrag && draggedCardId !== card.id}"
         draggable="true"
         @dragstart="onDragStart"
         @dragend.prevent="onDragEnd">
      <div class="text-base">
        {{card.name}}
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, createNamespacedHelpers} from "vuex";

  export default {
    name: "GridCard",
    props: ['card'],
    data() {
      return {
        isDragHide: false,
      }
    },
    computed: {
      ...mapGetters(['isTableCardDrag']),
      ...createNamespacedHelpers('gameTable').mapGetters([
        'cols', 'rows', 'draggedCardId',
      ]),
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
        this.$store.dispatch('gameTable/setDraggedCardId', {
          cardId: this.card.id
        });
        this.$store.dispatch('setTableCardDrag');
        this.isDragHide = true;
      },
      onDragEnd() {
        this.$store.dispatch('resetDrag');
        this.$nextTick(() => {
          this.isDragHide = false;
        })
      },
    }
  }
</script>

<style scoped>

</style>
