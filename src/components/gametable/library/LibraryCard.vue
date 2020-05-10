<template>
  <Moveable class="moveable absolute h-gridCard w-gridCard bg-cardPlaceholder rounded-card"
            :class="{'pointer-events-none': isCardDrag && draggedCardId === card.id}"
            ref="moveable"
            v-bind="moveable"
            @dragStart="onDragStart"
            @drag="onDrag"
            @dragEnd="onDragEnd">
    <div class="text-base">
      <p>{{card.name}}</p>
      <p>{{libraryCards.length}}</p>
    </div>
  </Moveable>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import Moveable from 'vue-moveable';

  export default {
    name: "LibraryCard",
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
      ...createNamespacedHelpers('library').mapGetters(['libraryCards',]),
      card() {
        return this.libraryCards.find(card => card.id === this.cardId);
      }
    },
    methods: {
      onDrag({target, transform}) {
        target.style.transform = transform;
      },
      onDragStart() {
        // this.$store.dispatch('game/setDraggedCardId', {
        //   cardId: this.card.id
        // });
        // this.$store.dispatch('game/setHandCardDrag');
      },
      onDragEnd({target}) {
        target.style.transform = null;
        this.$store.dispatch('game/resetDrag');
      },
    },
  }
</script>

<style scoped>

</style>
