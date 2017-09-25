<template lang="pug">
  .game-list(v-if="$store.state.users.currentUser")
    button(@click.prevent.stop="signOut") Log Out
    h1 list of games to play
    pre {{ $store.state.users.currentUser }}
    pre {{ $store.getters['users/cards'] }}
    pre {{ $store.state.games.all }}
    button(@click="createGame") Create Game
</template>


<script>
export default {
  created() {
    this.$store.dispatch("games/getAll");
    this.$store.dispatch("cards/getAll");
  },

  methods: {
    createGame() {
      this.$store.dispatch("games/create", { userId: this.$store.state.users.currentUserId });
    },

    signOut() {
      this.$store.dispatch("users/signOut").then(res => {
        this.$router.push("/");
      });
    },
  },
};
</script>
