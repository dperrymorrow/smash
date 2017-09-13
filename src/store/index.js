import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import games from "./games";
import cards from "./cards";
import init from "./firebaseConnect";

const firebase = init();
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    users,
    cards,
    games,
  },
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit("users/setCurrentUserId", user.uid);

    firebase.database().ref("users/" + user.uid).on("value", snapshot => {
      if (!snapshot.val()) {
        _createUserRecord(user.uid);
      } else {
        store.commit("users/setCurrentUser", snapshot.val());
        _assureUserHasCards();
      }
    });
  } else {
    store.commit("users/setCurrentUser", null);
    store.commit("users/setCurrentUserId", null);
  }
});

function _createUserRecord() {
  firebase.database().ref("users/" + user.uid).set({ email: user.email }).catch(console.error);
}

function _assureUserHasCards() {
  // make sure the user has cards
  if (store.state.users.currentUser.cards === undefined) {
    store.dispatch("cards/getAll").then(res => {
      store.dispatch("cards/assignDefaultCards");
    });
  }
}

export default store;
