<template lang="pug">
  .game-list
    button(@click.prevent.stop="signOut") Log Out
    //- h1 list of games to play

</template>


<script>
export default {
  created() {},

  methods: {
    signOut() {
      this.$store.dispatch("users/signOut").then(res => {
        this.$router.push("/");
      });
    },
  },
};
</script>
