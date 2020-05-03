export default {
  namespaced: true,
  state: {
    cols: 35,
    rows: 15,
    draggedCardId: null,
    gridCards: [
      {
        id: '1',
        col: '10',
        row: '10',
        name: 'name 1'
      },
      {
        id: '2',
        col: '20',
        row: '15',
        name: 'name 2'
      },
      {
        id: '3',
        col: '30',
        row: '10',
        name: 'name 3'
      },
    ],
  },
  getters: {
    gridCards(state) {
      return state.gridCards;
    },
    gridSlots(state) {
      const slots = [];

      [...Array(state.cols).keys()].map(col => col + 1).forEach(col => {
        [...Array(state.rows).keys()].map(row => row + 1).forEach(row => {
          slots.push({
            id: `${col}-${row}`,
            col,
            row,
            occupied: false,
          })
        })
      });

      return slots;
    },
  },
  mutations: {
    MOVE_CARD_TO_SLOT(state, {cardId, slotId, gridSlots}) {
      const targetSlot = gridSlots.find(slot => slot.id === slotId);

      state.gridCards = state.gridCards.map(card => {
        if (card.id === cardId) {
          return {...card, col: targetSlot.col, row: targetSlot.row};
        }
        return card;
      })
    }
  },
  actions: {
    moveCardToSlot({commit, getters}, {cardId, slotId}) {
      commit('MOVE_CARD_TO_SLOT', {
        cardId,
        slotId,
        gridSlots: getters.gridSlots,
      });
    }
  },
}
