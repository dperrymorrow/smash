import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "./Auth.vue";
import FindGame from "./FindGame.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Auth,
    },
    {
      path: "/find-game",
      component: FindGame,
    },
  ],
});
