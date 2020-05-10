<template>
  <div class="flex justify-center border h-gridCard w-full"
       :class="{'bg-cardPrompt': isDragOver}"
       @mouseover="onDragOver"
       @mouseup="onDrop"
       @mouseleave="onDragLeave">
    <HandCard v-for="card in handCards"
              :key="card.id"
              :cardId="card.id">
    </HandCard>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import HandCard from "./HandCard";

  export default {
    name: "Hand",
    components: {HandCard},
    data() {
      return {
        isDragOver: false,
      }
    },
    computed: {
      ...createNamespacedHelpers('game').mapGetters([
        'isCardDrag',
        'isGridCardDrag',
        'isLibraryCardDrag',
      ]),
      ...createNamespacedHelpers('hand').mapState({
        handCards: state => state.handCards,
      }),
    },
    methods: {
      onDragOver() {
        if (this.isCardDrag) {
          this.isDragOver = true;
        }
      },
      onDrop() {
        this.isDragOver = false;

        if (this.isGridCardDrag) {
          this.$store.dispatch('game/resetDrag');
          this.$store.dispatch('hand/addCardToHandFromGrid');
        } else if (this.isLibraryCardDrag) {
          this.$store.dispatch('game/resetDrag');
          this.$store.dispatch('hand/addCardToHandFromLibrary');
        }
      },
      onDragLeave() {
        this.isDragOver = false;
      }
    }
  }
</script>

<style scoped>

</style>
