import init from "./firebaseConnect";
const firebase = init();

export default {
  namespaced: true,
  state: {
    all: [],
  },

  mutations: {
    setAll: (state, games) => (state.all = games),
  },

  actions: {
    getAll(context) {
      firebase.database().ref("/games").on("value", snapshot => {
        context.commit("setAll", snapshot.val());
      });
    },

    create(context, payload) {
      return firebase
        .database()
        .ref("games/")
        .push({
          hostUserId: payload.userId,
          accepted: false,
        })
        .catch(console.error);
    },
  },
};
