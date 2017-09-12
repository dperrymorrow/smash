import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import init from "./firebaseConnect";
Vue.use(Vuex);
const firebase = init();

const store = new Vuex.Store({
  state: {},
  modules: {
    users,
  },
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit("users/setCurrentUser", user);
  } else {
    store.commit("users/setCurrentUser", null);
  }
});

export default store;
