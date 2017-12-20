<template>
  <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" @click="currentView='db-table'">Costs</el-menu-item>
    <el-menu-item index="2">Incoming</el-menu-item>
    <el-menu-item index="3">Category</el-menu-item>
    <el-menu-item index="4" @click="currentView='account-page'">Accounts</el-menu-item>
    <el-menu-item index="5">Report</el-menu-item>
  </el-menu>
</template>

<script>
  import AccountPage from './AccountPage.vue';

  export default {
    components: {
      AccountPage
    },
    name: 'db-sidebar',
    data() {
      return {
        msg: 'Table'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        switch (key) {
          case 4:
            this.$refs.account - page;
        }
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  li {
    padding-top: 20px;
  }
</style>
