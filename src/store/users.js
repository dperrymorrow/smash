import init from "./firebaseConnect";
const firebase = init();

export default {
  namespaced: true,
  state: {
    currentUser: null,
    currentUserId: null,
    errors: [],
  },

  mutations: {
    setCurrentUserId: (state, userId) => (state.currentUserId = userId),
    setCurrentUser: (state, user) => (state.currentUser = user),
    addError: (state, error) => state.errors.push(error),
    clearErrors: state => (state.errors = []),
  },

  getters: {
    cards(state, getters, rootState) {
      if (!state.currentUser) return null;
      const ret = {};
      Object.keys(state.currentUser.cards).forEach(key => {
        const level = state.currentUser.cards[key];
        ret[key] = rootState.cards.all[key][`level_${level}`];
        ret[key].level = level;
      });
      return ret;
    },
  },

  actions: {
    signIn(context, payload) {
      context.commit("clearErrors");

      return firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch(err => {
          context.commit("addError", err.message);
        });
    },

    signOut(context, payload) {
      return firebase.auth().signOut().catch(console.error);
    },

    create(context, payload) {
      context.commit("clearErrors");
      return firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .catch(err => {
          console.error(err);
          context.commit("addError", err.message);
        });
    },
  },
};
