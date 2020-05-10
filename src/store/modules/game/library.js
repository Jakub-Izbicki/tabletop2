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
  mutations: {},
  actions: {},
}
