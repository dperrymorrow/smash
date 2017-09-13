import init from "./firebaseConnect";
const firebase = init();

export default {
  state: {
    all: [],
  },

  mutations: {
    setAll(state, games) {
      state.all = games;
    },
  },

  actions: {
    fetchAll(context) {},
  },
};
