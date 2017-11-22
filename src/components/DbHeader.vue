<template>
  <header style="background-color: rgb(10, 47, 88);">
    <img class="image-logo" src="../assets/logo.png">
    <div class="text-logo">{{msg}}</div>
    <div class="login-form" is="LoginForm"></div>
    <ul class="header-operations">
    </ul>
  </header>
</template>

<script>
  import LoginForm from './LoginForm.vue'

  export default {
    name: 'db-header',
    data() {
      return {
        msg: 'BudgetKeeper'
      }
    },
    components: {
      LoginForm
    }
  }
</script>

<style>
  header {
    margin: 0 auto;
    height: 90px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 1;
    box-sizing: border-box;
  }

  .text-logo {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    position: relative;
    top: 26px;
    right: -20px;
    font-size: 25px;
    color: white;
  }

  .image-logo {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    position: relative;
    top: 26px;
    right: -20px;
    height: 50%;
  }

  .login-form {
    float: right;
    left: -20px;
    vertical-align: middle;
    margin-right: 30px;
    height: 40px;
    padding-top: 26px;
  }
</style>
