export default {
  namespaced: true,
  state: {
    dragState: null,
  },
  getters: {
    isCardDrag(state) {
      return state.dragState === 'GRID_CARD'
          || state.dragState === 'HAND_CARD';
    },
    isGridCardDrag(state) {
      return state.dragState === 'GRID_CARD';
    },
    isHandCardDrag(state) {
      return state.dragState === 'HAND_CARD';
    }
  },
  mutations: {
    RESET_DRAG(state) {
      state.dragState = null;
    },
    SET_GRID_CARD_DRAG(state) {
      state.dragState = 'GRID_CARD';
    },
    SET_HAND_CARD_DRAG(state) {
      state.dragState = 'HAND_CARD';
    },
  },
  actions: {
    resetDrag({commit}) {
      commit('RESET_DRAG');
    },
    setGridCardDrag({commit}) {
      commit('SET_GRID_CARD_DRAG');
    },
    setHandCardDrag({commit}) {
      commit('SET_HAND_CARD_DRAG');
    }
  }
}
