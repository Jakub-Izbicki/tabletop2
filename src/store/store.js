import Vue from 'vue'
import Vuex from 'vuex'
import gameTable from "./modules/gameTable";
import hand from "./modules/hand";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gameTable,
    hand,
  },
  state: {
    dragState: null,
  },
  getters: {
    isCardDrag(state) {
      return state.dragState === 'TABLE_CARD'
          || state.dragState === 'HAND_CARD';
    },
    isTableCardDrag(state) {
      return state.dragState === 'TABLE_CARD';
    },
    isHandCardDrag(state) {
      return state.dragState === 'HAND_CARD';
    }
  },
  mutations: {
    RESET_DRAG(state) {
      state.dragState = null;
    },
    SET_TABLE_CARD_DRAG(state) {
      state.dragState = 'TABLE_CARD';
    },
    SET_HAND_CARD_DRAG(state) {
      state.dragState = 'TABLE_CARD';
    },
  },
  actions: {
    resetDrag({commit}) {
      commit('RESET_DRAG');
    },
    setTableCardDrag({commit}) {
      commit('SET_TABLE_CARD_DRAG');
    },
    setHandCardDrag({commit}) {
      commit('SET_HAND_CARD_DRAG');
    }
  }
})
