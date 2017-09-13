<template lang="pug">
  .auth

    ul(v-if="$store.state.users.errors.length")
      li(v-for="msg in $store.state.users.errors") {{ msg }}

    fieldset.create-account
      legend Create an account
      input(type="text", v-model="newUser.email")
      input(type="password", v-model="newUser.password")
      button(@click.prevent.stop="create") Create User

    fieldset.sign-in
      legend Sign in to your account
      input(type="text", v-model="existingUser.email")
      input(type="password", v-model="existingUser.password")
      button(@click.prevent.stop="signIn") Sign in

</template>

<script>
export default {
  data() {
    return {
      errors: [],
      newUser: {
        email: "",
        password: "",
      },
      existingUser: {
        email: "",
        password: "",
      },
    };
  },

  watch: {
    currentUser() {
      if (this.currentUser) {
        this.$router.push("/find-game");
      }
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.users.currentUser;
    },
  },

  methods: {
    signIn() {
      this.$store.dispatch("users/signIn", this.existingUser);
    },
    create() {
      this.$store.dispatch("users/create", this.newUser).then(res => {
        this.$store.dispatch("cards/assignDefaultCards");
      });
    },
  },
};
</script>

<style lang="stylus">

</style>
