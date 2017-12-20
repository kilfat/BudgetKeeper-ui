<template>
  <div class="wrapper">
    <el-col :span="20" class="login-form">
      <db-header></db-header>
      <LoginForm></LoginForm>
    </el-col>

    <el-row class="container">
      <el-col class="content">
        <!--<db-sidebar></db-sidebar>-->
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" @click="currentView='db-table'">Costs</el-menu-item>
          <el-menu-item index="2" @click="currentView='db-table'">Incoming</el-menu-item>
          <el-menu-item index="3" @click="currentView='category-page'">Category</el-menu-item>
          <el-menu-item index="4" @click="currentView='account-page'">Accounts</el-menu-item>
          <el-menu-item index="5" @click="currentView='report-page'">Report</el-menu-item>
        </el-menu>
        <div class="line"></div>
        <component v-bind:is="dbFilterinput" v-if="currentView==='db-table'"></component>
        <component v-bind:is="addTransaction" v-if="currentView==='db-table'"></component>
        <component v-bind:is="currentView"></component>
        <!--<db-filterinput></db-filterinput>-->
        <!--<add-transaction></add-transaction>-->
        <!--<db-table></db-table>-->

      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <footer class="footer">
          <db-footer></db-footer>
        </footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LoginForm from './components/LoginForm.vue'
  import DbHeader from './components/DbHeader.vue'
  import DbSidebar from './components/DbSidebar.vue'
  import DbFilterinput from './components/DbFilterinput.vue'
  import DbTable from './components/DbTable.vue'
  import DbModal from './components/DbModal.vue'
  import DbFooter from './components/DbFooter.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import AddTransaction from './components/AddTransaction.vue'
  import AccountPage from './components/AccountPage.vue'
  import CategoryPage from './components/CategoryPage.vue'
  import ReportPage from './components/ReportPage.vue'

  export default {
    name: 'app',
    components: {
      LoginForm,
      ElRow, DbHeader,
      DbSidebar,
      DbFilterinput,
      DbTable,
      DbModal,
      DbFooter,
      AddTransaction,
      AccountPage,
      CategoryPage,
      ReportPage
    },
    data() {
      return {
        currentView: 'DbTable',
        dbFilterinput: 'DbFilterinput',
        addTransaction: 'AddTransaction'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  element.style {
    background-color: rgb(10, 47, 88);
  }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .el-menu, body, html {
    height: 100%;
  }

  .wrapper {
    position: relative;
  }

  footer, div {
    display: block;
  }

  .container {
    padding-top: 70px;
    flex: 1;
  }

  .container, .wrapper {
    height: 100%;
  }

  .menu {
    height: 100%;
    background-color: #eef1f6;
  }

  .line {
    height: 20px;
  }

  .content {
    padding-top: 25px;
    padding-right: 25px;
    padding-bottom: 125px;
    padding-left: 25px;
  }

  .footer {
    height: 120px;
    background-color: #324057;
    color: #a4aebd;
    width: 100%;
    z-index: 1000;
    margin-top: -120px;
    line-height: 1;
    font-size: 22px;
  }
</style>
