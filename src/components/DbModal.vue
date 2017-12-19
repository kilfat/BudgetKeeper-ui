<template>
  <el-dialog title="Edit" :visible.sync="dialogFormVisible" v-model="dialogFormVisible" :close-on-click-modal="false"
             :show-close="false" :before-close="cancelmodal">
    <div>
      <el-alert v-if="errorMessage"
                title="Error:"
                type="error"
                :closable="false">
        {{errorMessage}}
      </el-alert>
      <el-alert v-if="successMessage"
                title="Success:"
                type="success">
        {{successMessage}}
      </el-alert>
      <el-form :model="form" label-width="100px">
        <el-form-item label="Value">
          <el-input
            autofocus
            class="amount-input"
            suffix-icon="icon-money"
            placeholder="Type something"
            v-model="form.amount"
            clearable
            @focus="$event.target.select()"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-autocomplete
            v-model="form.categoryName"
            :fetch-suggestions="querySearchAsync"
            placeholder="Please input"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker v-model="form.date"
                          :picker-options="pickerOptions"
                          format="dd.MM.yy"
                          placeholder="DD.MM.YY"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Account">
          <el-select v-model="form.accountType" filterable placeholder="Select" clearable>
            <el-option label="Account"
                       v-for="item in this.$store.getters.accounts"
                       :key="item.id"
                       :label="item.value"
                       :value="item">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.amount }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <div id="delete">
        <el-button :plain="true" type="danger" @click="deleteTransaction(form)">Delete</el-button>
      </div>
      <el-button :plain="true" type="info" v-on:click="cancelmodal">Cancel</el-button>
      <el-button :plain="true" type="primary" @click="updateForm(form)">Save</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import http from '../utils/http'
  import {TRANSACTION_URL} from '../store/env'
  import Bus from '../eventBus'
  import {CATEGORY_NAMES_URL} from '../store/env'
  import {ACCOUNT_NAMES_URL} from '../store/env'

  export default {
    data() {
      return {
        formLabelWidth: '120px',
        pickerOptions: {
          firstDayOfWeek: 1
        },
        type_options: [],
        errorMessage: '',
        successMessage: '',
        transaction: {
          amount: -1,
          accountId: -1,
          categoryId: -1,
          date: Date.now(),
          transactionType: 'COSTS'
        }
      }
    },
    props: ['dialogFormVisible', 'form'],

    computed: {},

    methods: {
      deleteTransaction: function (formName) {
        var itemId = formName.id.valueOf();
        http.delete(TRANSACTION_URL + itemId, this.$store.getters.user)
          .then((response) => this.checkSuccessStatus(response, "Successful deleted")).catch(
          (error) => this.checkErrorStatus(error, "Unsuccessfull deletion!"))
      },
      updateForm: function (formName) {
        var itemId = formName.id.valueOf();
        //      formName.amount = Number(formName.amount);
//        formName.date = this.form.date;

        this.transaction.categoryId = formName.categoryId;
        this.transaction.amount = Number(formName.amount);
        this.transaction.accountId = formName.accountId;
        this.transaction.date =
          (formName.date.getTime() / 1000 - formName.date.getTimezoneOffset() * 60) * 1000;
        http.put(TRANSACTION_URL + itemId, this.$store.getters.user, this.transaction)
          .then((response) => this.checkSuccessStatus(response)).catch((error) => this.checkErrorStatus(error))
      },
      checkSuccessStatus(response, message) {
        if (!message) {
          message = 'Transaction edited';
        }
        this.errorMessage = '';
        this.$message({
                        showClose: true,
                        message: message,
                        type: 'success'
                      });
        this.cancelmodal();

      },
      cancelmodal() {
        this.errorMessage = '';
        this.$emit('cancelmodal');
      },
      checkErrorStatus(error, message) {
        if (!message) {
          message = 'Transaction edition error!';
        }
        if (error.response === undefined) {
          return false;
        }
        this.$message({
                        showClose: true,
                        message: message,
                        type: 'error'
                      });
        this.errorMessage = error.response.data.message;
        console.log(error);
      },
      querySearchAsync(queryString, cb) {
        var links = this.$store.getters.links;
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
      }
    }
  }

</script>
<style>
  #delete {
    float: left;
  }
</style>
