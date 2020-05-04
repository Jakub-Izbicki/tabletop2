<template>
  <div class="flex items-center justify-center"
       :style="[{'grid-column-start': `${card.col}`},
                    {'grid-row-start': `${card.row}`}]">
    <div class=" absolute h-gridCard w-gridCard bg-cardPlaceholder rounded-lg"
         :class="[{'pointer-events-none': isTableCardDrag && draggedCardId !== card.id}]"
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
    computed: {
      ...mapGetters(['isTableCardDrag']),
      ...createNamespacedHelpers('gameTable').mapGetters([
        'draggedCardId',
      ]),
    },
    methods: {
      onDragStart() {
        // {'transform translate-x-dragHide': isTableCardDrag && draggedCardId === card.id}
        this.$store.dispatch('gameTable/setDraggedCardId', {
          cardId: this.card.id
        });
        this.$store.dispatch('setTableCardDrag');
      },
      onDragEnd() {
        this.$store.dispatch('resetDrag');
      },
    }
  }
</script>

<style scoped>

</style>
