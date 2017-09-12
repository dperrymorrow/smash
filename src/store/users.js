import init from "./firebaseConnect";
const firebase = init();

export default {
  namespaced: true,
  state: {
    currentUser: null,
    errors: [],
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    addError(state, error) {
      state.errors.push(error);
    },
    clearErrors(state) {
      state.errors = [];
    },
  },

  actions: {
    signIn(context, payload) {
      context.commit("clearErrors");
      return firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          context.commit("setCurrentUser", firebase.auth().currentUser);
        })
        .catch(err => {
          context.commit("addError", err.message);
        });
    },

    signOut(context, payload) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit("setCurrentUser", null);
        })
        .catch(err => {
          context.commit("addError", err.message);
        });
    },

    create(context, payload) {
      context.commit("clearErrors");
      return firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          context.commit("setCurrentUser", firebase.auth().currentUser);
        })
        .catch(err => {
          context.commit("addError", err.message);
        });
    },
  },
};
