<template>
  <div>
    <div class="grid grid-cols-5 grid-rows-5">
      <div v-for="slot in gridSlots"
           :key="slot.x + slot.y"
           class="bg-backgroundAlt"
           :style="[{'grid-column-start': `${slot.x}`},
         {'grid-row-start': `${slot.y}`}]">
        {{slot.id}}
      </div>

      <div v-for="card in cards"
           :key="card.x + card.y"
           class="bg-background"
           :style="[{'grid-column-start': `${card.x}`},
         {'grid-row-start': `${card.y}`}]">
        {{card.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Table",
    data() {
      return {
        cards: [
          {
            x: '1',
            y: '1',
            name: 'name here 1'
          },
          {
            x: '2',
            y: '5',
            name: 'name here 2'
          },
          {
            x: '3',
            y: '1',
            name: 'name here 3'
          },
        ]
      }
    },
    computed: {
      gridSlots() {
        const cols = 5;
        const rows = 5;
        const slots = [];

        [...Array(cols).keys()].map(col => col + 1).forEach(col => {
          [...Array(rows).keys()].map(row => row + 1).forEach(row => {
            slots.push({
              id: `${col}-${row}`,
              x: col,
              y: row,
            })
          })
        })

        console.log(slots);
        return slots;
      }
    }
  }
</script>

<style scoped>

</style>
