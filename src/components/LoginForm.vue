<template>
  <form v-on:submit.prevent v-if="$store.getters.authorized !== true">
    <input id="username" type="text" v-model="user.username" placeholder="Username" autocomplete="username"/>
    <input id="password" v-model="user.password" type="password" placeholder="Password"
           autocomplete="current-password"/>
    <button type="submit" v-on:click="doLoginAction()">Login</button>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>
<script>
  import http from '../utils/http'

  export default {
    data() {
      return {
        user: {
          username: null,
          password: null
        },
        errorMessage: null
      }
    },
    watch: {
      errorMessage: function (val) {
        if (!val || val === '') {
          this.setAuthorized("true");
        }
      }
    },
    methods: {
      doLoginAction: function () {
        if (!this.user.username || !this.user.password) {
          this.errorMessage = 'Fill in the username and password fields!';
          return
        }
        this.setUsername(this.user.username);
        this.setPassword(this.user.password);
        http.get("user/", this.user).then((message) => this.checkSuccessStatus(message)).catch(
          (error) => this.checkErrorStatus(error.response));

      },
      checkErrorStatus: function (response) {
        if (!response) {
          this.errorMessage = "Connection problems! ";
//          return response;
        }
        if (response) {
          if (!response.status) {
            this.errorMessage = 'An error has occurred!';
          }
          if (response.status === 403) {
            this.errorMessage = "Incorrect login or password! "
          }
        }
        return response;
      },
      checkSuccessStatus: function (response) {
        if (response.status === 200) {
          this.errorMessage = null;
          this.setAuthorized(true);
        }
        return response;
      },
      setUsername(username) {
        this.$store.dispatch('setUsername', username);
      },
      setPassword(password) {
        this.$store.dispatch('setPassword', password);
      },
      setAuthorized(status) {
        this.$store.dispatch('setAuthorized', status);
      }
    },
    components: {}
  }
</script>

<style>
  .error {
    color: red;
  }
</style>
