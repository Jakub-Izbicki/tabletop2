<template>
  <div
      class="absolute pointer-events-none text-vw h-gridCard w-gridCard bg-cardAnimated rounded-card"
      :style="[{'top': positionY},
               {'left': positionX}]"
      v-mousemove-outside="move">
    <div class="text-base">
      Animated card
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  export default {
    name: "AnimatedCard",
    data() {
      return {
        top: '0',
        left: '0',
      }
    },
    computed: {
      ...createNamespacedHelpers('gameTable').mapGetters([
        'animatedCardVisible',
      ]),
      positionX() {
        return this.left + 'px';
      },
      positionY() {
        return this.top + 'px';
      },
    },
    methods: {
      move(e) {
        // this.top = e.clientY;
        // this.left = e.clientX;
        console.log({target: e.target.getBoundingClientRect()})
      }
    }
  }
</script>

<style scoped>

</style>
