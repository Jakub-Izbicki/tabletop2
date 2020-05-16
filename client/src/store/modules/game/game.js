import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

export default {
  namespaced: true,
  state: {
    gameStompClient: null,
    draggedCardId: null,
    dragState: null,
  },
  getters: {
    gameStompClient(state) {
      return state.gameStompClient;
    },
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
    SET_GAME_STOMP_CLIENT(state, {stompClient}) {
      state.gameStompClient = stompClient;
    },
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
    setupGameStompClient({dispatch, commit}) {
      var socket = new SockJS('http://localhost:9090/gs-guide-websocket');
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient.subscribe('/user/game/moveCardToSlot', (gridCards) => {
          console.log('INCOMING moveCardToSlot');

          const body = JSON.parse(gridCards.body);
          dispatch('grid/moveCardToSlot', {
                slotId: body.slotId,
                cardId: body.cardId,
                suppressStompDataSend: true,
              },
              {root: true});
        });

        stompClient.subscribe('/user/game/moveCard', (moveCard) => {
          const body = JSON.parse(moveCard.body);
          dispatch('grid/moveCard', {
                cardId: body.cardId,
                transform: body.transform,
                suppressStompDataSend: true,
              },
              {root: true});
        });
      });

      commit('SET_GAME_STOMP_CLIENT', {stompClient});
    },
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
