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
    ADD_CARD(state, {card}) {
      state.handCards = [...state.handCards, card];
    },
    REMOVE_CARD(state, {cardId}) {
      state.handCards = state.handCards.filter(card => card.id !== cardId);
    },
  },
  actions: {
    addCardToHandFromGrid({commit, dispatch, rootGetters}) {
      const card = rootGetters['grid/gridCards'].find(
          card => card.id === rootGetters['game/draggedCardId']);

      commit('ADD_CARD', {card});
      dispatch('grid/removeCardFromGrid', {cardId: card.id},
          {root: true});
    },
    addCardToHandFromLibrary({commit, dispatch, rootGetters}) {
      const card = rootGetters['library/libraryCards'].find(
          card => card.id === rootGetters['game/draggedCardId']);

      commit('ADD_CARD', {card});
      dispatch('library/removeCard', {cardId: card.id},
          {root: true});
    },
    removeCard({commit}, {cardId}) {
      commit('REMOVE_CARD', {cardId});
    },
  },
}
