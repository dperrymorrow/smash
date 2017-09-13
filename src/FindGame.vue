<template lang="pug">
  .game-list(v-if="$store.state.users.currentUser")
    button(@click.prevent.stop="signOut") Log Out
    //- h1 list of games to play
    pre {{ $store.state.users.currentUser }}
    pre {{ $store.getters['users/cards'] }}

</template>


<script>
export default {
  created() {
    this.$store.dispatch("cards/getAll");
  },

  methods: {
    signOut() {
      this.$store.dispatch("users/signOut").then(res => {
        this.$router.push("/");
      });
    },
  },
};
</script>
