<template>
  <div class="absolute pointer-events-none h-full w-full"
       @mousemove="move">
    <div
        class="absolute pointer-events-none text-vw h-gridCard w-gridCard bg-cardAnimated rounded-card"
        :style="[{'top': top},
               {'left': left}]">
      <div class="text-base">
        Animated card
      </div>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  export default {
    name: "AnimatedCard",
    data() {
      return {
        top: '10px',
        left: '10px',
      }
    },
    computed: {
      ...createNamespacedHelpers('gameTable').mapGetters([
        'animatedCardVisible',
      ]),
    },
    methods: {
      move() {
        console.log('moving');
      }
    }
  }
</script>

<style scoped>

</style>
