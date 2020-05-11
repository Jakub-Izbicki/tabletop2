export default {
  namespaced: true,
  state: {
    libraryCards: [
      {
        id: '5',
        name: 'name 5'
      },
      {
        id: '6',
        name: 'name 6'
      },
    ],
  },
  getters: {
    libraryCards(state) {
      return state.libraryCards;
    }
  },
  mutations: {
    ADD_CARD(state, {card}) {
      state.libraryCards.unshift(card);
    },
    REMOVE_CARD(state, {cardId}) {
      state.libraryCards = state.libraryCards
      .filter(card => card.id !== cardId);
    },
  },
  actions: {
    removeCard({commit}, {cardId}) {
      commit('REMOVE_CARD', {cardId});
    },
    addCardToLibraryFromGrid({commit, dispatch, rootGetters}) {
      const card = rootGetters['grid/gridCards'].find(
          card => card.id === rootGetters['game/draggedCardId']);

      commit('ADD_CARD', {card});
      dispatch('grid/removeCardFromGrid', {cardId: card.id},
          {root: true});
    },
    addCardToLibraryFromHand({commit, dispatch, rootGetters}) {
      const card = rootGetters['hand/handCards'].find(
          card => card.id === rootGetters['game/draggedCardId']);

      commit('ADD_CARD', {card});
      dispatch('hand/removeCard', {cardId: card.id},
          {root: true});
    },
  },
}
