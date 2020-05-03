<template>
  <div class="flex items-center justify-center
                  h-gridSlot w-full border-solid border-2"
       :style="[{'grid-column-start': `${gridSlot.col}`},
                    {'grid-row-start': `${gridSlot.row}`}]"
       @dragover="onDragOver"
       @dragenter="onDragEnter"
       @dragleave="onDragLeave"
       @drop.prevent="onDrop">
    <div v-show="isCardPromptVisible"
         class="absolute pointer-events-none h-gridCard w-gridCard bg-cardPrompt rounded-lg">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "GridSlot",
    props: ['gridSlot'],
    data() {
      return {
        isCardPromptVisible: false,
      }
    },
    computed: {
      ...mapGetters(['isTableCardDrag']),
    },
    methods: {
      onDragOver(event) {
        if (this.isTableCardDrag) {
          event.preventDefault();
        }
      },
      onDragEnter() {
        if (this.isTableCardDrag) {
          this.isCardPromptVisible = true;
        }
      },
      onDragLeave() {
        this.isCardPromptVisible = false;
      },
      onDrop() {
        this.isCardPromptVisible = false;
        this.$store.dispatch('gameTable/moveCardToSlot', {
          slotId: this.gridSlot.id,
        });
      },
    }
  }
</script>

<style scoped>

</style>
