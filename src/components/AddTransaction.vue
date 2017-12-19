<template>
  <div>
    <el-alert v-if="errorMessage"
              title="Error:"
              type="error"
              :closable="false">
      {{errorMessage}}
    </el-alert>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="Value">
        <el-input
          autofocus
          class="amount-input"
          suffix-icon="icon-money"
          placeholder="Type something"
          v-model="form.inputAmount"
          clearable
          @focus="$event.target.select()"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Category">
        <el-autocomplete
          v-model="form.inputCategory.name"
          :fetch-suggestions="querySearchAsync"
          placeholder="Please input"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-button round icon="el-icon-plus" size="small" @click="createCategory = true"></el-button>
      <el-form-item label="Date">
        <el-date-picker v-model="form.inputDate"
                        :picker-options="pickerOptions"
                        format="dd.MM.yy"
                        placeholder="DD.MM.YY"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Account">
        <el-select v-model="form.inputAccount" filterable placeholder="Select" clearable>
          <el-option label="Account"
                     v-for="item in accounts"
                     :key="item.id"
                     :label="item.value"
                     :value="item">
            <span style="float: left">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.amount }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="createTransaction(transaction)">Create</el-button>
    </el-form>
    <el-dialog
      title="Create category"
      :visible.sync="createCategory"
      width="30%">
      <el-form :model="newCategory" ref="newCategory" :rules="rules">
        <el-form-item prop="name">
          <el-input placeholder="New category name" v-model="newCategory.name" clearable autofocus
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="createCategory = false">Cancel</el-button>
          <el-button type="primary" @click="createNewCategory('newCategory')">Create</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import lodash from 'lodash'
  import Bus from '../eventBus'
  import http from '../utils/http'
  import {CATEGORY_NAMES_URL} from '../store/env'
  import {TRANSACTION_URL} from '../store/env'
  import {CATEGORY_URL} from '../store/env'
  import {ACCOUNT_NAMES_URL} from '../store/env'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {
    components: {
      ElFormItem,
      ElButton
    },
    name: 'db-filterinput',
    data() {
      return {
        pickerOptions: {
          firstDayOfWeek: 1
        },
        transaction: {
          amount: -1,
          accountId: -1,
          categoryId: -1,
          date: Date.now(),
          transactionType: 'COSTS'
        },
        form: {
          inputAccount: null,
          inputAmount: 0,
          inputCategory: {id: -1, value: '', name: ''},
          inputDate: Date.now(),
        },
        type_options: [],
        formInline: {
          account: '',
          category: '',
        },
        errorMessage: '',
        successMessage: '',
        formLabelWidth: '120px',
        links: [],
        accounts: [],
        createCategory: false,
        newCategory: {
          name: '',
          userName: ''
        },
        rules: {
          name: [
            {required: true, message: 'Please input Category name', trigger: 'blur'},
            {min: 5, max: 50, message: 'Length should be 5 to 50', trigger: 'blur'}
          ]
        }
      }
    },

    watch: {
      'formInline.account': 'filterResultData',
      'formInline.category': 'filterResultData'
    },

    methods: {
      createNewCategory(newCategory) {
        this.$refs[newCategory].validate((valid) => {
          if (valid) {
            this.newCategory.userName = this.$store.getters.username;
            http.post(CATEGORY_URL, this.$store.getters.user, this.newCategory).then(
              this.checkSuccessStatus("Category created")).catch((error) => this.checkErrorStatus(error));
            this.createCategory = false;
          } else {
            this.checkErrorStatus(null, "Category creation error!");
            return false;
          }
        });
      },
      createTransaction: function (transaction, form) {
        transaction.categoryId = this.form.inputCategory.id;
        transaction.amount = parseInt(this.form.inputAmount);
        transaction.accountId = this.form.inputAccount.id;
        transaction.date = (this.form.inputDate.getTime() / 1000 - this.form.inputDate.getTimezoneOffset() * 60) * 1000;
        return http.post(TRANSACTION_URL, this.$store.getters.user, transaction).then(this.checkSuccessStatus()).catch(
          (error) => this.checkErrorStatus(error));
      },
      checkSuccessStatus: function (message) {
        if (!message) {
          message = 'Transaction created';
        }
        this.errorMessage = '';
        this.$message({
                        showClose: true,
                        message: message,
                        type: 'success'
                      });
        this.successMessage = 'Transaction created';
      }
      ,
      checkErrorStatus: function (error, message) {
        if (!message) {
          message = 'Transaction creation error!';
        }
        this.$message({
                        showClose: true,
                        message: message,
                        type: 'error'
                      });
        if (error) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        }
      },
      loadAll: function () {
        return http.get(CATEGORY_NAMES_URL, this.$store.getters.user).then((response) => {
          response.data.forEach(function (e) {
            if (typeof e === "object") {
              e["value"] = e.name;
            }
          });
          this.links = response.data;
          this.setLinks(this.links);
          console.log(response.data);
        });
      },
      loadAllAccounts: function () {
        return http.get(ACCOUNT_NAMES_URL, this.$store.getters.user).then((response) => {
          response.data.forEach(function (e) {
            if (typeof e === "object") {
              e["value"] = e.accountType;
            }
          });
          this.accounts = response.data;
          this.setAccounts(this.accounts);
          console.log(response.data);
        });
      },
      querySearchAsync(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      createFilter(queryString) {
        return (entity) => {
          return (entity.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
        this.form.inputCategory = item;
        console.log(item);
      },

      selectDemo: function (params) {
        if (params) {
          this.type_options =
            [{label: "BANK CARD", value: "BANK_CARD"}, {label: "CASH", value: "CASH"},
              {label: "SAVINGS ACCOUNT", value: "SAVINGS_ACCOUNT"}];
          console.log(this.type_options);
        }

      },
      handleClickAccountList: function (item) {
        this.form.inputAccount.account = item;
        this.form.inputAccount.name = item.accountType + " " + item.amount;
        console.log(item);
      },
      setLinks(links) {
        this.$store.dispatch('setLinks', links);
      },
      setAccounts(accounts) {
        this.$store.dispatch('setAccounts', accounts);
      },
    },
    mounted() {
      this.links = this.loadAll();
      this.accounts = this.loadAllAccounts();
    }
  }
</script>

<style>
  @import url("//unpkg.com/element-ui@2.0.4/lib/theme-chalk/index.css");

  .amount-input {
    width: 60px;
  }

  .icon-money {
    content: url('../../static/money.png');
  }
</style>
