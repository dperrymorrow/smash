import init from "./firebaseConnect";
const firebase = init();

const module = {
  namespaced: true,

  state: {
    all: [],
  },

  mutations: {
    setAll(state, cards) {
      state.all = cards;
    },
  },

  actions: {
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
