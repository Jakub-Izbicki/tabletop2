<template>
  <Moveable class="moveable h-gridCard w-gridCard bg-cardPlaceholder rounded-card mx-1"
            :class="{'pointer-events-none': isCardDrag && draggedCardId === card.id}"
            ref="moveable"
            v-bind="moveable"
            @dragStart="onDragStart"
            @drag="onDrag"
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
      ...createNamespacedHelpers('game').mapGetters([
        'isCardDrag',
        'draggedCardId',
      ]),
      ...createNamespacedHelpers('hand').mapGetters(['handCards',]),
      card() {
        return this.handCards.find(card => card.id === this.cardId);
      },
    },
    methods: {
      onDragStart() {
        this.$store.dispatch('game/setDraggedCardId', {
          cardId: this.card.id
        });
        this.$store.dispatch('game/setHandCardDrag');
      },
      onDrag({target, transform}) {
        target.style.transform = transform;
      },
      onDragEnd({target}) {
        target.style.transform = null;
        this.$store.dispatch('game/resetDrag');
        this.$store.dispatch('grid/resetCardTransform', {cardId: this.draggedCardId});
      },
    }
  }
</script>

<style scoped>

</style>
