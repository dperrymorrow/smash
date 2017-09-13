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

  actions: {
    signIn(context, payload) {
      context.commit("clearErrors");

      return firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const user = firebase.auth().currentUser;
          context.commit("setCurrentUserId", user.uid);
          // will need to retrieve user here from firebase
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
          const auth = firebase.auth().currentUser;
          const userRecord = { email: auth.email };
          context.commit("setCurrentUserId", auth.uid);
          context.commit("setCurrentUser", userRecord);
          return firebase.database().ref("users/" + auth.uid).set(userRecord);
        })
        .catch(err => {
          console.error(err);
          context.commit("addError", err.message);
        });
    },
  },
};
