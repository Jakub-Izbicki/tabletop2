<template>
  <div class="flex items-center justify-center"
       :class="{'pointer-events-none': isCardDrag && draggedCardId === card.id}">

    <Moveable class="moveable absolute h-gridCard w-gridCard bg-cardPlaceholder rounded-card"
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
  import {createNamespacedHelpers, mapGetters} from "vuex";
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
      ...mapGetters(['isCardDrag']),
      ...createNamespacedHelpers('gameTable').mapGetters(['draggedCardId',]),
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
        this.$store.dispatch('gameTable/setDraggedCardId', {
          cardId: this.card.id
        });
        this.$store.dispatch('setHandCardDrag');
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
