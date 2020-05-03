import Vue from 'vue'
import Vuex from 'vuex'
import gameTable from "./modules/gameTable";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gameTable,
  },
  state: {
    dragState: null,
  },
  getters: {
    isTableCardDrag(state) {
      return state.dragState === 'TABLE_CARD';
    }
  },
  mutations: {
    RESET_DRAG(state) {
      state.dragState = null;
    },
    SET_TABLE_CARD_DRAG(state) {
      state.dragState = 'TABLE_CARD';
    }
  },
  actions: {
    resetDrag({commit}) {
      commit('RESET_DRAG');
    },
    setTableCardDrag({commit}) {
      commit('SET_TABLE_CARD_DRAG');
    }
  }
})
