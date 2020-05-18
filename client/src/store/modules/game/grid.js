import gsap from 'gsap'
import GameDimensionsUtil from "../../../util/GameDimensionsUtil";
import throttle from 'lodash.throttle'

export default {
  namespaced: true,
  state: {
    cols: 35,
    rows: 15,
    gridCards: [
      {
        id: '1',
        col: '10',
        row: '10',
        name: 'name 1',
      },
      {
        id: '2',
        col: '20',
        row: '14',
        name: 'name 2'
      },
      {
        id: '3',
        col: '30',
        row: '10',
        name: 'name 3'
      },
    ],
    gridSlots: [],
  },
  getters: {
    cols(state) {
      return state.cols;
    },
    rows(state) {
      return state.rows;
    },
    gridCards(state) {
      return state.gridCards;
    },
    gridSlots(state) {
      return state.gridSlots;
    },
  },
  mutations: {
    MOVE_CARD_TO_SLOT(state, {cardId, slotId, gridSlots}) {
      const targetSlot = gridSlots.find(slot => slot.id === slotId);

      state.gridCards = state.gridCards.map(card => {
        if (card.id === cardId) {
          return {...card, col: targetSlot.col, row: targetSlot.row};
        }
        return card;
      })
    },
    SET_GRID_SLOTS(state, {slots}) {
      state.gridSlots = slots;
    },
    REMOVE_CARD(state, {cardId}) {
      state.gridCards = state.gridCards.filter(card => card.id !== cardId);
    },
    ADD_CARD(state, {card, col, row}) {
      state.gridCards = [...state.gridCards, {...card, col, row}];
    },
    MOVE_CARD(state, {cardId, transform}) {
      state.gridCards = state.gridCards.map(card => {
        if (card.id === cardId) {
          return {...card, transform};
        }
        return card;
      })
    },
    RESET_CARD_TRANSFORM(state, {cardId}) {
      state.gridCards = state.gridCards.map(card => {
        if (card.id === cardId) {
          return {...card, transform: null};
        }
        return card;
      })
    },
  },
  actions: {
    moveCardToSlot({dispatch, commit, getters, rootGetters},
        {slotId, cardId, suppressStompDataSend}) {
      if (!suppressStompDataSend) {
        rootGetters['game/gameStompClient'].send("/game/moveCardToSlot", {},
            JSON.stringify({slotId, cardId}));
      }
      const util = new GameDimensionsUtil();

      const move = throttle(() => {
        dispatch('grid/localMoveCard', {
              cardId,
              transform: `translate(${cardTranslate.left}vw, ${cardTranslate.top}vw)`,
            },
            {root: true})
      }, 16);

      const moveToSlot = () => {
        commit('MOVE_CARD_TO_SLOT', {
          cardId,
          slotId,
          gridSlots: getters.gridSlots,
        });
        commit('RESET_CARD_TRANSFORM', {cardId});
      };

      const card = getters.gridCards.find(card => card.id === cardId);
      const cardTranslate = util.getVwFromTransform(card.transform);

      const travelDistance = util.getVwBetween(cardTranslate, cardId, slotId);

      gsap.to(cardTranslate,
          {
            duration: 2,
            left: `+=${travelDistance.x}`,
            top: `+=${travelDistance.y}`,
            onUpdate: move,
            onComplete: moveToSlot
          });
    },
    setGridSlots({commit}, {slots}) {
      commit('SET_GRID_SLOTS', {slots});
    },
    removeCardFromGrid({commit}, {cardId}) {
      commit('REMOVE_CARD', {cardId});
    },
    addCardToGridFromHand({commit, dispatch, rootGetters}, {col, row}) {
      const card = rootGetters['hand/handCards'].find(
          card => card.id === rootGetters['game/draggedCardId']);

      commit('ADD_CARD', {card, col, row});
      dispatch('hand/removeCard', {cardId: card.id},
          {root: true});
    },
    addCardToGridFromLibrary({commit, dispatch, rootGetters}, {col, row}) {
      const card = rootGetters['library/libraryCards'].find(
          card => card.id === rootGetters['game/draggedCardId']);

      commit('ADD_CARD', {card, col, row});
      dispatch('library/removeCard', {cardId: card.id},
          {root: true});
    },
    moveCard({commit, rootGetters},
        {cardId, transform, suppressStompDataSend}) {
      commit('MOVE_CARD', {cardId, transform});

      if (!suppressStompDataSend) {
        rootGetters['game/gameStompClient'].send("/game/moveCard", {},
            JSON.stringify({cardId, transform}));
      }
    },
    localMoveCard({commit}, {cardId, transform}) {
      commit('MOVE_CARD', {cardId, transform});
    },
    resetCardTransform() {
    }
    // resetCardTransform({commit, rootGetters}, {cardId}) {
    //   commit('MOVE_CARD', {cardId, transform: 'translate(0px, 0px)'});
    //
    //   rootGetters['game/gameStompClient'].send("/game/moveCard", {},
    //       JSON.stringify({cardId, transform: 'translate(0px, 0px)'}));
    // },
  },
}
