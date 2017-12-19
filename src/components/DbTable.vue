<template>
  <div>
    <el-button type="primary" @click="updateTable()">Refresh</el-button>
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
        prop="dateString"
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
    <db-modal :dialogFormVisible="dialogFormVisible" :form="form" v-on:cancelmodal="dialogVisible"></db-modal>
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
        loading: false
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
