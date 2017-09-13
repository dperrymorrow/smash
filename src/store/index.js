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
    store.commit("users/setCurrentUser", user);
  } else {
    store.commit("users/setCurrentUser", null);
  }
});

store.dispatch("cards/getAll");
export default store;
