<template>
  <div class="container">
    <div class="footer-main"><p class="footer-main-title">{{ message }}</p><a
      href="mailto:kinyaevilfat@gmail.com" class="footer-main-link">Email</a><a
      href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank"
      class="footer-main-link">License</a></div>

    <div class="layout-copy footdoc">
      <i class="footdoc">Copyright © BudgetKeeper, 2017 </i>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        message: 'BudgetKeeper',
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
  }

  .footer-main {
    font-size: 0;
    padding-top: 40px;
    display: inline-block;
  }

  .footer-main .footer-main-title {
    line-height: 1;
    font-size: 22px;
    margin: 0;
  }

  .footer-main .footer-main-link {
    display: inline-block;
    margin: 12px 18px 0 0;
    line-height: 1;
    font-size: 12px;
    color: #768193;
  }

  .layout-copy {
    display: inline-block;
    width: 570px;
    height: 70px;
    margin-left: 3px;
  }

  .layout-copy .footdoc {
    display: inline-block;
    text-align: center;
    color: #8d99ab;
    width: 570px;
    vertical-align: middle;
    font-size: 12px;
  }

  .footdoc span {
    display: inline-block;
    font-size: 14px;
    color: #768193;

  }

  .footdoc img {
    display: inline-block;
    width: 84px;
    height: 80px;
    margin-top: 20px;
    transform: rotate(330deg);
    -ms-transform: rotate(330deg); /* Internet Explorer */
    -moz-transform: rotate(330deg); /* Firefox */
    -webkit-transform: rotate(330deg); /* Safari 和 Chrome */
    -o-transform: rotate(330deg); /* Opera */

  }
</style>
