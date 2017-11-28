<template>
  <div>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <el-table
      :data="tableData"
      border
      height="250"
      stripe
      class="table">
      <el-table-column
        fixed
        type="index"
        label="№">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="Amount">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="Category">
      </el-table-column>
      <el-table-column
        prop="date"
        label="Date"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="accountType"
        label="Account">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operation">
        <template scope="scope">
          <el-button @click="editItem(scope.$index, tableData)" type="primary" icon="el-icon-edit">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" layout="prev, pager, next" :total="total" :page-size="pageSize"
                   v-on:current-change="changePage">
    </el-pagination>
    <db-modal :dialogFormVisible="dialogFormVisible" :form="form" v-on:canclemodal="dialogVisible"></db-modal>
  </div>

</template>

<script>
  import Bus from '../eventBus'
  import DbModal from './DbModal.vue'
  import http from '../utils/http'
  import {TRANSACTION_URL} from '../store/env'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
//        account: '',
//        email: '',
        dialogFormVisible: false,
        form: '',
        errorMessage: null,
        loading: false
//        ,
//        isAuthorizate: false
      }
    },
    watch: {
      isAuthorizate: function (val) {
        this.updateTable();
      }
    },
    computed: {
      ...mapGetters({
                      isAuthorizate: 'authorized'
                    })
    },
    components: {
      DbModal,
    },
    mounted() {
      this.updateTable();
    },

    methods: {
      updateTable: function () {
        this.getTransactions();
        Bus.$on('filterResultData', (data) => {
          this.tableData = data.results;
          this.total = data.total_pages;
          this.pageSize = data.count;
//        this.email = data.email;
//        this.account = data.account;
        });
      },
      tableRowClassName({row, rowIndex}) {
//        var asd = 1;
//        asd++;
//        alert(rowIndex);
//        if (rowIndex === 1) {
//          return 'warning-row';
//        } else if (rowIndex === 3) {
//          return 'success-row';
//        }
        return '';
      },

      dialogVisible: function () {
        this.dialogFormVisible = false;
      },

      getTransactions: function () {
        this.loading = true;
        http.get(TRANSACTION_URL, this.$store.getters.user).then((response) => {
          this.tableData = response.data;
          this.total = response.data.length;
          this.pageSize = response.data.length;
          console.log(response.data);
        }).then(this.errorMessage = '').catch(
          (error) => this.checkErrorStatus(error.response));
        this.loading = false;
      },
      checkErrorStatus: function (response) {
        this.errorMessage = '';
        if (response) {
          if (!response.status) {
            this.errorMessage = 'An error has occurred!';
          }
          if (response.status === 403) {
            this.errorMessage = "Unauthorized! Need to login!"
          }
        } else {
          this.errorMessage = "Connection problems! ";
        }
        console.log(response);
        return response;
      },
//      getCustomers: function () {
//        this.$axios.get(this.apiUrl, {
//          params: {
//            page: this.currentPage,
//            account: this.account,
//            email: this.email
//          }
//        }).then((response) => {
//          this.tableData = response.data.data.results;
//          this.total = response.data.data.total;
//          this.pageSize = response.data.data.count;
//          console.log(response.data.data);
//        }).catch(function (response) {
//          console.log(response)
//        });
//      },
      changePage: function (currentPage) {
        this.currentPage = currentPage;
//        this.getCustomers()
      },
      editItem: function (index, rows) {
        this.dialogFormVisible = true;
//        const itemId = rows[index].id;
        this.form = this.tableData[index];
//        const idurl = 'http://127.0.0.1:8000/api/persons/detail/' + itemId;
//        this.$axios.get(idurl).then((response) => {
//          this.form = response.data;
//        }).catch(function (response) {
//          console.log(response)
//        });
      }
    }
  }
</script>

<style>
  @import url("//unpkg.com/element-ui@2.0.4/lib/theme-chalk/index.css");

  body {
    margin: 0;
  }

  .table {
    margin-top: 30px;
    table-layout: fixed;
    word-wrap: break-word;
    counter-reset: rowNumber;
    counter-increment: rowNumber;
  }

  .el-table .costs {
    background: oldlace;
  }

  .el-table .incoming {
    background: #f0f9eb;
  }

  .error {
    color: red;
  }

  .pagination {
    margin-top: 10px;
    float: right;
  }
</style>
