export default {
  namespaced: true,
  state: {
    handCards: [],
  },
  getters: {
    handCards(state) {
      return state.handCards;
    },
  },
  mutations: {
    ADD_CARD_TO_HAND_FROM_TABLE(state, {card}) {
      state.handCards = [...state.handCards, card];
    }
  },
  actions: {
    addCardToHandFromTable({commit, dispatch, rootGetters}) {
      const card = rootGetters['gameTable/gridCards'].find(
          card => card.id === rootGetters['gameTable/draggedCardId']);

      commit('ADD_CARD_TO_HAND_FROM_TABLE', {card});
      dispatch('gameTable/removeCardFromTable', {cardId: card.id},
          {root: true});
    },
  },
}
