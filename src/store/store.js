import Vue from 'vue'
import Vuex from 'vuex'
import game from "./modules/game/game";
import grid from "./modules/game/grid";
import hand from "./modules/game/hand";
import library from "./modules/game/library";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    game,
    grid,
    hand,
    library,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
