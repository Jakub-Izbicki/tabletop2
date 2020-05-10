<template>
  <div class="border h-gridCard w-gridCard">
    <LibraryCard v-if="libraryCards.length > 0"
                 :cardId="libraryCards[0].id"></LibraryCard>
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
    computed: {
      ...createNamespacedHelpers('library').mapGetters(['libraryCards',]),
    }
  }
</script>

<style scoped>

</style>
