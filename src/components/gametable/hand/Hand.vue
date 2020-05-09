<template>
  <div class="flex text-vw border h-gridCard"
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
  import {createNamespacedHelpers, mapGetters} from "vuex";
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
      ...mapGetters([
        'isCardDrag',
        'isTableCardDrag',
        'isHandCardDrag']),
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
        if (this.isTableCardDrag) {
          this.$store.dispatch('hand/addCardToHandFromTable');
          this.$store.dispatch('resetDrag');
        }
      },
      onDragLeave() {
        if (this.isDragOver) {
          this.isDragOver = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
