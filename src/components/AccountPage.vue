<template>
  <div>
    <el-button type="primary" @click="updateTable()">Refresh</el-button>
    <el-button type="primary" @click="createAccount = true">Create</el-button>
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
        prop="accountType"
        label="Account">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="Amount">
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
    <!--<db-modal :dialogFormVisible="dialogFormVisible" :form="form" v-on:cancelmodal="dialogVisible"></db-modal>-->
    <el-dialog
      title="Create account"
      :visible.sync="createAccount"
      width="30%">
      <el-form :model="newAccount" ref="newAccount" :rules="rules">
        <el-form-item prop="name">
          <el-input placeholder="New account name" v-model="newAccount.accountType" clearable autofocus
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="amount">
          <el-input placeholder="New account amount" v-model="newAccount.amount" clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="createAccount = false">Cancel</el-button>
          <el-button type="primary" @click="createNewAccount('newAccount')">Create</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        dialogFormVisible: false,
        form: '',
        errorMessage: null,
        loading: false,
        rules: {
          name: [
            {required: true, message: 'Please input Account name', trigger: 'blur'},
            {min: 5, max: 50, message: 'Length should be 5 to 50', trigger: 'blur'}
          ],
          amount: [
            {required: true, message: 'Please input Account amount', trigger: 'blur'},
            {min: 1, message: 'Length should be more than 0', trigger: 'blur'}
          ]
        },
        createAccount: false,
        newAccount: {
          accountType: 'CASH',
          userName: '',
          amount: 1
        }
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
    mounted() {
      this.updateTable();
    },

    methods: {
      createNewAccount(newAccount) {
        this.$refs[newAccount].validate((valid) => {
          if (valid) {
            this.newAccount.userName = this.$store.getters.username;
            http.post(CATEGORY_URL, this.$store.getters.user, this.newCategory).then(
              this.checkSuccessStatus("Category created")).catch((error) => this.checkErrorStatus(error));
            this.createAccount = false;
          } else {
            this.checkErrorStatus(null, "Category creation error!");
            return false;
          }
        });
      },
      updateTable: function () {
        this.getTransactions();
        Bus.$on('filterResultData', (data) => {
          let months_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          data.results.forEach(function (e) {
            if (typeof e === "object") {
              let d = new Date(e.date);
              e["dateString"] = d.getDate() + '.' + months_arr[d.getMonth()] + '.' + d.getFullYear();
            }
          });
          this.tableData = data.results;
          this.total = data.total_pages;
          this.pageSize = data.count;
        });
      },
      dialogVisible: function () {
        this.dialogFormVisible = false;
      },
      getTransactions: function () {
        this.loading = true;
        http.get(TRANSACTION_URL, this.$store.getters.user).then((response) => {
          var months_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          response.data.forEach(function (e) {
            if (typeof e === "object") {
              var d = new Date(e.date * 1000);
              e["dateString"] = d.getDate() + '.' + months_arr[d.getMonth()] + '.' + d.getFullYear();
              e["date"] = d;
            }
          });
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
      changePage: function (currentPage) {
        this.currentPage = currentPage;
      },
      editItem: function (index, rows) {
        this.dialogFormVisible = true;
        this.form = this.tableData[index];
      },
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

  .success {
    color: green;
  }

  .pagination {
    margin-top: 10px;
    float: right;
  }
</style>
