<template>
  <div class="border h-gridCard w-gridCard"
       @mouseover="onDragOver"
       @mouseup="onDrop"
       @mouseleave="onDragLeave">
    <LibraryCard v-if="libraryCards.length > 0"
                 :cardId="libraryCards[0].id"
                 @mouseover="onDragOver"
                 @mouseup="onDrop"
                 @mouseleave="onDragLeave">
    </LibraryCard>
    <div v-if="libraryCards.length > 1"
         class="flex items-center justify-center h-gridCard w-gridCard bg-cardPlaceholder rounded-card">
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import LibraryCard from "./LibraryCard";

  export default {
    name: "Library",
    components: {LibraryCard},
    data() {
      return {
        isDragOver: false,
      }
    },
    computed: {
      ...createNamespacedHelpers('game').mapGetters([
        'isCardDrag',
        'isGridCardDrag',
        'isHandCardDrag',
      ]),
      ...createNamespacedHelpers('library').mapGetters(['libraryCards',]),
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
          this.$store.dispatch('library/addCardToLibraryFromGrid');
        } else if (this.isHandCardDrag) {
          this.$store.dispatch('game/resetDrag');
          this.$store.dispatch('library/addCardToLibraryFromHand');
        }
      },
      onDragLeave() {
        this.isDragOver = false;
      },
    }
  }
</script>

<style scoped>

</style>
