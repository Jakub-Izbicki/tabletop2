<template>
  <Moveable class="moveable absolsaute h-gridCard w-gridCard bg-cardPlaceholder rounded-card"
            :class="{'pointer-events-none': isCardDrag && draggedCardId === card.id}"
            ref="moveable"
            v-bind="moveable"
            @dragStart="onDragStart"
            @drag="handleDrag"
            @dragEnd="onDragEnd">
    <div class="text-base">
      {{card.name}}
    </div>
  </Moveable>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import Moveable from 'vue-moveable';

  export default {
    name: "HandCard",
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
    computed: {
      ...createNamespacedHelpers('game').mapGetters(['isCardDrag',]),
      ...createNamespacedHelpers('grid').mapGetters(['draggedCardId',]),
      ...createNamespacedHelpers('hand').mapGetters(['handCards',]),
      card() {
        return this.handCards.find(card => card.id === this.cardId);
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
        this.$store.dispatch('game/setHandCardDrag');
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
