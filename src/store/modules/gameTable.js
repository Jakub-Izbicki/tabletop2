export default {
  namespaced: true,
  state: {
    cols: 35,
    rows: 15,
    draggedCardId: null,
    dragHoveredSlotId: null,
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
    gridSlots: [],
  },
  getters: {
    cols(state) {
      return state.cols;
    },
    rows(state) {
      return state.rows;
    },
    gridCards(state) {
      return state.gridCards;
    },
    gridSlots(state) {
      return state.gridSlots;
    },
    draggedCardId(state) {
      return state.draggedCardId;
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
    },
    SET_DRAGGED_CARD(state, {cardId}) {
      state.draggedCardId = cardId;
    },
    SETUP_GRID_SLOTS(state, {slots}) {
      state.gridSlots = slots;
    },
  },
  actions: {
    moveCardToSlot({commit, getters}, {slotId}) {
      commit('MOVE_CARD_TO_SLOT', {
        cardId: getters.draggedCardId,
        slotId,
        gridSlots: getters.gridSlots,
      });
    },
    setDraggedCardId({commit}, {cardId}) {
      commit('SET_DRAGGED_CARD', {cardId});
    },
    setupGridSlots({commit}, {slots}) {
      commit('SETUP_GRID_SLOTS', {slots});
    },
  },
}
