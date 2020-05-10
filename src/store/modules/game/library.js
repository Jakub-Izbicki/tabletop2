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
    REMOVE_CARD(state, {cardId}) {
      state.libraryCards = state.libraryCards
      .filter(card => card.id !== cardId);
    },
  },
  actions: {
    removeCard({commit}, {cardId}) {
      commit('REMOVE_CARD', {cardId});
    },
  },
}
