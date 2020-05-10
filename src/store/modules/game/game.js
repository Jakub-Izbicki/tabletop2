export default {
  namespaced: true,
  state: {
    draggedCardId: null,
    dragState: null,
  },
  getters: {
    draggedCardId(state) {
      return state.draggedCardId;
    },
    isCardDrag(state) {
      return state.dragState === 'GRID_CARD'
          || state.dragState === 'HAND_CARD'
          || state.dragState === 'LIBRARY_CARD';
    },
    isGridCardDrag(state) {
      return state.dragState === 'GRID_CARD';
    },
    isHandCardDrag(state) {
      return state.dragState === 'HAND_CARD';
    },
    isLibraryCardDrag(state) {
      return state.dragState === 'LIBRARY_CARD';
    },
  },
  mutations: {
    SET_DRAGGED_CARD(state, {cardId}) {
      state.draggedCardId = cardId;
    },
    RESET_DRAG(state) {
      state.dragState = null;
    },
    SET_GRID_CARD_DRAG(state) {
      state.dragState = 'GRID_CARD';
    },
    SET_HAND_CARD_DRAG(state) {
      state.dragState = 'HAND_CARD';
    },
    SET_LIBRARY_CARD_DRAG(state) {
      state.dragState = 'LIBRARY_CARD';
    },
  },
  actions: {
    setDraggedCardId({commit}, {cardId}) {
      commit('SET_DRAGGED_CARD', {cardId});
    },
    resetDrag({commit}) {
      commit('RESET_DRAG');
    },
    setGridCardDrag({commit}) {
      commit('SET_GRID_CARD_DRAG');
    },
    setHandCardDrag({commit}) {
      commit('SET_HAND_CARD_DRAG');
    },
    setLibraryCardDrag({commit}) {
      commit('SET_LIBRARY_CARD_DRAG');
    }
  }
}
