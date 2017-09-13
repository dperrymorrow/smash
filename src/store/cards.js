import init from "./firebaseConnect";
const firebase = init();

const module = {
  namespaced: true,

  state: {
    all: null,
  },

  mutations: {
    setAll(state, cards) {
      state.all = cards;
    },
  },

  getters: {
    freeCards(state) {
      const ret = {};
      Object.keys(state.all).forEach(key => {
        if (state.all[key].level_1.cost === 0) ret[key] = 1;
      });
      return ret;
    },
  },

  actions: {
    assignDefaultCards(context) {
      return firebase
        .database()
        .ref("users/" + context.rootState.users.currentUserId)
        .update({
          cards: context.getters.freeCards,
        })
        .catch(console.error);
    },
    getAll(context) {
      return firebase
        .database()
        .ref("/cards")
        .once("value")
        .then(snapshot => {
          context.commit("setAll", snapshot.val());
        })
        .catch(console.error);
    },
  },
};

export default module;
